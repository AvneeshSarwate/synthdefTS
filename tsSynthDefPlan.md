# TypeScript SynthDef Builder — Implementation Plan

## Overview

A fully typed TypeScript library for programmatically building SuperCollider synth definitions and controlling scsynth. The library compiles UGen graphs into the SCgf binary format and communicates with scsynth over OSC.

---

## Architecture

```
┌──────────────────────────────────────────────────────┐
│  User Code                                           │
│  const def = synthDef("mySynth", (p) => {            │
│    const sig = SinOsc.ar({ freq: p.freq });          │
│    return Out.ar({ bus: 0, source: mul(sig, 0.5) }); │
│  });                                                 │
│  def.send(server);                                   │
└────────────────────┬─────────────────────────────────┘
                     │
      ┌──────────────┼──────────────┐
      ▼              ▼              ▼
┌───────────┐ ┌────────────┐ ┌────────────────┐
│ UGen Graph │ │ Graph      │ │ Binary         │
│ Builder    │ │ Compiler   │ │ Serializer     │
│            │ │            │ │                │
│ - collect  │ │ - topo sort│ │ - SCgf v2      │
│ - controls │ │ - index    │ │ - big-endian   │
│ - consts   │ │ - resolve  │ │ - encode UGens │
└───────────┘ └────────────┘ └────────┬───────┘
                                      │
                                      ▼
                              ┌───────────────┐
                              │ OSC Transport  │
                              │ /d_recv, /s_new│
                              │ /n_set, etc.   │
                              └───────────────┘
```

---

## Module Breakdown

### Module 1: `graph/types.ts` — Core Type System

The foundation types that all other modules depend on.

```typescript
// Calculation rates
enum Rate { Scalar = 0, Control = 1, Audio = 2, Demand = 3 }

// A reference to a UGen output wire
interface UGenOutput {
  ugen: UGenNode;
  outputIndex: number;
  rate: Rate;
}

// A node in the UGen graph
interface UGenNode {
  id: number;           // unique within the synthdef build
  name: string;         // e.g. "SinOsc", "BinaryOpUGen"
  rate: Rate;
  specialIndex: number; // 0 for most UGens, operator index for BinaryOp/UnaryOp
  inputs: UGenInput[];  // each input is a UGenOutput or a number (constant)
  outputs: UGenOutput[];
}

// An input can be a wire from another UGen or a constant
type UGenInput = UGenOutput | number;

// Parameter metadata
interface ControlName {
  name: string;
  index: number;       // offset in the flat controls array
  rate: ParameterRate;
  defaultValue: number | number[];
}

enum ParameterRate { Scalar, Control, Trigger, Audio }
```

**Key reference:** The distinction between `UGenInput = UGenOutput | number` mirrors how SuperCollider resolves inputs at write time — numbers become constant references (`src=-1, index=constIdx`), while `UGenOutput` references become `(src=ugenIdx, index=outputIdx)`.
- SC source: `UGen.sc:479-482` (writeInputSpec for UGen outputs)
- SC source: `SimpleNumber.writeInputSpec` writes `-1` + constant index
- Supriya: `core.py:6288-6296` (`_compile_ugen_input_spec`)

### Module 2: `graph/builder.ts` — SynthDef Graph Builder

The `synthDef()` function and the builder context that collects UGens during graph function evaluation.

```typescript
function synthDef(
  name: string,
  graphFn: (params: ParamProxy) => void,
  paramDefs?: Record<string, ParamDef>
): SynthDefData;
```

**How it works:**

1. **Builder context** — A global/module-scoped mutable reference (like SC's `UGen.buildSynthDef` or supriya's `_active_builders` thread-local). Every UGen constructor checks this context and registers itself.

2. **Parameter creation** — Parameters are grouped by rate. For each rate group, a single Control UGen is created (matching SC behavior). The `specialIndex` on each Control UGen encodes the starting offset into the flat controls array.
   - SC source: `SynthDef.sc:184-267` (`buildControls`) — groups params by rate, creates one Control per group
   - SC source: `InOut.sc:61-66` — Control.init sets `specialIndex = synthDef.controls.size`
   - Overtone: `synth.clj` `synthdef` function — groups by rate, prepends Control UGens

3. **Graph function evaluation** — The function is called with a proxy object that provides typed access to parameters. Every UGen created during evaluation auto-registers with the builder.

4. **Post-build** — After evaluation, run optimization and compilation (Modules 3-4).

**Design decision — parameter definition syntax:**

```typescript
// Option A: Explicit param definitions (recommended for v1)
const def = synthDef("sine", { freq: kr(440), amp: kr(0.5), gate: tr(1) }, (p) => {
  const env = EnvGen.kr({ envelope: adsr(), gate: p.gate, doneAction: 2 });
  const sig = SinOsc.ar({ freq: p.freq });
  Out.ar({ bus: 0, source: mul(sig, mul(p.amp, env)) });
});
```

The param proxy `p` returns `UGenOutput` references (output wires from the appropriate Control UGen). This is type-safe: `p.freq` is typed as `UGenOutput` with rate `Control`.

**Key references:**
- SC: `SynthDef.sc:75-92` (initBuild, buildUgenGraph) — sets global context, evaluates function
- SC: `UGen.sc:313-316` (addToSynth) — every UGen registers via global context
- Overtone: `synth.clj` `pre-synth` macro — captures UGen graph from Clojure code
- Supriya: `core.py:5743+` SynthDefBuilder context manager

### Module 3: `graph/compiler.ts` — Graph Compilation

Transforms the raw collected UGen list into an ordered, indexed, resolved graph ready for serialization.

**Steps (mirroring SC's `finishBuild`):**

1. **Collect constants** — Walk all UGen inputs, deduplicate numeric values, assign sequential indices.
   - SC: `SynthDef.sc:466-471` (`addConstant`), `UGen.sc:318-322` (`collectConstants`)
   - Overtone: `synth.clj` `gather-ugens-and-constants`

2. **Topological sort** — Kahn's algorithm. Build antecedent/descendant sets from UGen input references. Pop from "available" set (UGens with no remaining antecedents), schedule, repeat.
   - SC: `SynthDef.sc:501-534` (`initTopoSort`, `topologicalSort`)
   - SC: `UGen.sc:513-543` (`initTopoSort`, `schedule`, `makeAvailable`)
   - Overtone: `synth.clj` `topological-sort-ugens` (depth-first variant)
   - Supriya: `core.py` `_sort_ugens`

3. **Index UGens** — After sorting, assign sequential `synthIndex` to each UGen.
   - SC: `SynthDef.sc:535-539` (`indexUGens`)

4. **Resolve inputs** — For each UGen input:
   - If `number`: map to `{ src: -1, index: constantIndex }`
   - If `UGenOutput`: map to `{ src: ugen.synthIndex, index: outputIndex }`
   - SC: `UGen.sc:479-482`, `OutputProxy` at line 614-626
   - SC_GraphDef.cpp confirms: `mFromUnitIndex = -1` means constant (line 838)

5. **Build output** — Produce a `CompiledSynthDef` object:
   ```typescript
   interface CompiledSynthDef {
     name: string;
     constants: number[];
     paramValues: number[];     // flat array of default values
     paramNames: { name: string; index: number }[];
     ugens: CompiledUGen[];
     variants: Map<string, number[]>;
   }
   ```

### Module 4: `binary/encoder.ts` — SCgf Binary Serializer

Encodes a `CompiledSynthDef` into the SCgf version 2 binary format.

**Binary format (version 2, big-endian throughout):**

```
FILE HEADER:
  4 bytes   "SCgf" (0x53436766)
  int32     version = 2
  int16     number of synthdefs

PER SYNTHDEF:
  pstring   name (uint8 length + bytes)
  int32     num constants
  float32[] constants
  int32     num params (controls)
  float32[] param default values
  int32     num param names
  [pstring + int32][]  param name + index pairs
  int32     num UGens
  PER UGEN:
    pstring   class name (e.g. "SinOsc")
    int8      calc rate (0=scalar, 1=control, 2=audio, 3=demand)
    int32     num inputs
    int32     num outputs
    int16     special index
    PER INPUT:
      int32   source UGen index (-1 for constant)
      int32   source output index (or constant index if src=-1)
    PER OUTPUT:
      int8    calc rate
  int16     num variants (0 for now)
```

**Key references for exact format:**
- SC: `Synth-Definition-File-Format.schelp`
- SC: `SC_GraphDef.cpp:361-437` (`GraphDef_Read`) — the authoritative parser
- SC: `SynthDef.sc:326-401` (`writeDef`)
- Overtone: `machinery/synthdef.clj` — `synthdef-file-spec-v2`
- Supriya: `core.py:6219-6340` (`compile_synthdefs`)

**Implementation notes:**
- Use `DataView` with big-endian setters, or a `Buffer` + manual packing
- pstring = 1 byte length (uint8) + N ASCII bytes (no null terminator)
- Float32 is IEEE 754 single-precision, big-endian

### Module 5: `ugens/core.ts` — UGen Base Infrastructure

The internal machinery that all generated UGen functions use.

```typescript
// Internal: create a single UGen node and register it
function newUGen(
  name: string,
  rate: Rate,
  inputs: UGenInput[],
  numOutputs: number,
  specialIndex?: number
): UGenOutput | UGenOutput[];

// Internal: handle multichannel expansion
function multiNew(
  name: string,
  rate: Rate,
  args: (UGenInput | UGenInput[])[],
  numOutputs: number,
  expandableIndices: number[],
  specialIndex?: number
): UGenOutput | UGenOutput[] | (UGenOutput | UGenOutput[])[];
```

**Multichannel expansion logic:**
- Scan all `expandableIndices` args. If any is an array, expand.
- Max array length determines expansion count.
- Shorter arrays wrap via modulo (SC's `wrapAt`).
- Scalar args broadcast to all channels.
- Recursive to handle nested arrays.
- Reference: `UGen.sc:23-39` (`multiNewList`)

**mul/add handling:**
- SC UGens accept `mul` and `add` trailing args that are NOT sent to the server.
- They create a `MulAdd` or `BinaryOpUGen` wrapping the original UGen.
- In our TS API, `mul` and `add` can be optional params on UGen functions that produce a wrapped graph.
- Reference: `UGen.sc:175-191` (`madd` method)

### Module 6: `ugens/ops.ts` — Arithmetic Operators

Since TypeScript has no operator overloading, arithmetic is expressed as functions:

```typescript
// Binary operators → BinaryOpUGen
function add(a: UGenInput, b: UGenInput): UGenOutput;
function sub(a: UGenInput, b: UGenInput): UGenOutput;
function mul(a: UGenInput, b: UGenInput): UGenOutput;
function div(a: UGenInput, b: UGenInput): UGenOutput;
function mod(a: UGenInput, b: UGenInput): UGenOutput;
function pow(a: UGenInput, b: UGenInput): UGenOutput;
function min(a: UGenInput, b: UGenInput): UGenOutput;
function max(a: UGenInput, b: UGenInput): UGenOutput;
function lt(a: UGenInput, b: UGenInput): UGenOutput;
function gt(a: UGenInput, b: UGenInput): UGenOutput;
function eq(a: UGenInput, b: UGenInput): UGenOutput;
// ... etc for all 49 binary operators

// Unary operators → UnaryOpUGen
function neg(a: UGenInput): UGenOutput;
function abs(a: UGenInput): UGenOutput;
function sqrt(a: UGenInput): UGenOutput;
function midicps(a: UGenInput): UGenOutput;
function dbamp(a: UGenInput): UGenOutput;
// ... etc for all 54 unary operators
```

Each function creates a `BinaryOpUGen` / `UnaryOpUGen` with the appropriate `specialIndex`.

**Constant folding optimizations** (optional, but recommended):
- `mul(x, 1)` → `x`
- `mul(x, 0)` → `0`
- `add(x, 0)` → `x`
- `sub(x, 0)` → `x`
- `div(x, 1)` → `x`
- Reference: `BasicOpsUGen.sc:73-98` (`BinaryOpUGen.new1`)

**Rate determination for BinaryOpUGen:**
- Output rate = max(inputA.rate, inputB.rate) where demand > audio > control > scalar
- Reference: `BasicOpsUGen.sc:64-72`

**Complete operator tables:**
- Binary: see `supriya/enums.py` BinaryOperator (indices 0-48)
- Unary: see `supriya/enums.py` UnaryOperator (indices 0-53)
- SC: `BasicOpsUGen.sc` + `_Symbol_SpecialIndex` C++ primitive

### Module 7: `ugens/generated.ts` — All Built-in UGen Definitions

Auto-generated (or hand-written with codegen tooling) typed UGen functions for every built-in SC UGen.

**Pattern for a typical UGen:**

```typescript
// SinOsc: pure oscillator, supports ar/kr, single output
export const SinOsc = {
  ar(params: { freq?: UGenInput; phase?: UGenInput } = {}): UGenOutput {
    const { freq = 440, phase = 0 } = params;
    return newUGen("SinOsc", Rate.Audio, [freq, phase], 1);
  },
  kr(params: { freq?: UGenInput; phase?: UGenInput } = {}): UGenOutput {
    const { freq = 440, phase = 0 } = params;
    return newUGen("SinOsc", Rate.Control, [freq, phase], 1);
  },
};
```

**Pattern for multi-output UGen:**

```typescript
// Pan2: 2-channel panner, returns [left, right]
export const Pan2 = {
  ar(params: { source: UGenInput; pos?: UGenInput; level?: UGenInput }): [UGenOutput, UGenOutput] {
    const { source, pos = 0, level = 1 } = params;
    const outputs = newUGen("Pan2", Rate.Audio, [source, pos, level], 2);
    return outputs as [UGenOutput, UGenOutput];
  },
};
```

**Pattern for variable-output UGen:**

```typescript
// In: bus input, variable channel count
export const In = {
  ar(params: { bus?: UGenInput; numChannels?: number }): UGenOutput[] {
    const { bus = 0, numChannels = 1 } = params;
    return newUGen("In", Rate.Audio, [bus], numChannels) as UGenOutput[];
  },
};
```

**Pattern for output UGen (0 outputs):**

```typescript
export const Out = {
  ar(params: { bus: UGenInput; source: UGenInput | UGenInput[] }): void {
    const { bus, source } = params;
    const channels = Array.isArray(source) ? source : [source];
    newUGen("Out", Rate.Audio, [bus, ...channels], 0);
  },
};
```

**UGen categories to implement (from SC source):**

| Category | Source File | Key UGens |
|----------|-----------|-----------|
| Oscillators | `Osc.sc` | SinOsc, Osc, LFSaw, LFPulse, LFTri, Impulse, VarSaw, SyncSaw, Formant, VOsc, COsc |
| Filters | `Filter.sc` | LPF, HPF, BPF, BRF, RLPF, RHPF, Resonz, OnePole, TwoPole, Lag, Decay, Decay2, LeakDC, MidEQ, Ringz, Formlet, Median, Slew |
| Noise | `Noise.sc` | WhiteNoise, PinkNoise, BrownNoise, Dust, Dust2, LFNoise0/1/2, Crackle, Rand, TRand, ExpRand |
| Delays | `Delays.sc` | DelayN/L/C, CombN/L/C, AllpassN/L/C, BufDelayN/L/C |
| Envelopes | `EnvGen.sc` | EnvGen, Linen, Done, FreeSelf, FreeSelfWhenDone |
| I/O | `InOut.sc` | In, Out, ReplaceOut, OffsetOut, LocalIn, LocalOut, InFeedback, XOut |
| Buffer I/O | `BufIO.sc` | PlayBuf, BufRd, BufWr, RecordBuf, LocalBuf |
| Lines | `Line.sc` | Line, XLine, LinExp, DC, K2A, A2K |
| Panning | `Pan.sc` | Pan2, LinPan2, Balance2, Pan4, PanAz, XFade2 |
| Triggers | `Trig.sc` | Trig, Trig1, Latch, Gate, PulseCount, Stepper, Phasor, Sweep, Pitch, SendTrig, SendReply |
| Info | `InfoUGens.sc` | SampleRate, ControlRate, BufFrames, BufDur, BufSampleRate, BufChannels |
| Math Ops | `BasicOpsUGen.sc` | UnaryOpUGen, BinaryOpUGen, MulAdd, Sum3, Sum4 |

### Module 8: `ugens/envelope.ts` — Envelope Helpers

SC's `EnvGen` takes a flattened envelope specification as its inputs. We need helper functions to build these.

```typescript
interface EnvSpec {
  levels: number[];
  times: number[];
  curves: (number | string)[];  // "lin", "exp", "sin", "cos", or a float curvature
  releaseNode?: number;
  loopNode?: number;
}

function env(spec: EnvSpec): number[];  // flatten to SC format
function adsr(params?: { attack?: number; decay?: number; sustain?: number; release?: number; curve?: number }): number[];
function perc(params?: { attack?: number; release?: number; level?: number; curve?: number }): number[];
function linen(params?: { attack?: number; sustain?: number; release?: number; level?: number; curve?: number }): number[];
```

**SC envelope array format** (from `Env.sc`):
```
[level0, numSegments, releaseNode, loopNode,
 level1, time0, curveType0, curveValue0,
 level2, time1, curveType1, curveValue1,
 ...]
```

Curve types: 0=step, 1=linear, 2=exponential, 3=sine, 4=welch, 5=custom(float), 6=squared, 7=cubed

**References:**
- SC: `Env.sc` (`asArray`, `asMultichannelArray`)
- Supriya: `envelopes.py`
- Overtone: `sc/machinery/ugen/metadata/envelopes.clj`

### Module 9: `osc/transport.ts` — OSC Communication

Handle UDP communication with scsynth.

```typescript
class Server {
  constructor(host: string, port: number);

  // SynthDef management
  sendDef(def: SynthDefData): Promise<void>;        // /d_recv

  // Synth lifecycle
  newSynth(defName: string, id: number, params?: Record<string, number>): void;  // /s_new
  freeSynth(id: number): void;                      // /n_free
  setSynth(id: number, params: Record<string, number>): void;  // /n_set

  // Group management
  newGroup(id: number, addAction?: number, target?: number): void;  // /g_new
  freeAll(groupId: number): void;                   // /g_freeAll

  // Buffer management
  allocBuffer(bufNum: number, frames: number, channels?: number): Promise<void>;
  readBuffer(bufNum: number, path: string): Promise<void>;
  freeBuffer(bufNum: number): Promise<void>;

  // Server control
  boot(): Promise<void>;      // spawn scsynth process
  quit(): Promise<void>;      // /quit
  status(): Promise<ServerStatus>;  // /status
  dumpOSC(mode: 0 | 1 | 2 | 3): void;
  sync(): Promise<void>;      // /sync
}
```

**OSC library:** Use `osc-js` or `node-osc` for UDP transport. Messages are simple: address string + typed args.

**Key commands reference:** `Server-Command-Reference.schelp`

### Module 10: `index.ts` — Public API

Re-export the user-facing API:

```typescript
export { synthDef } from './graph/builder';
export { Rate } from './graph/types';
export { Server } from './osc/transport';
export { add, sub, mul, div, neg, abs, midicps, ... } from './ugens/ops';
export { SinOsc, LPF, Out, In, Pan2, EnvGen, ... } from './ugens/generated';
export { env, adsr, perc, linen } from './ugens/envelope';
```

---

## Implementation Order

### Phase 1: Core Graph Engine
1. **`graph/types.ts`** — Define all core types
2. **`graph/builder.ts`** — Builder context, parameter handling, UGen registration
3. **`ugens/core.ts`** — `newUGen`, multichannel expansion
4. **`ugens/ops.ts`** — BinaryOpUGen/UnaryOpUGen with all operator indices
5. **`graph/compiler.ts`** — Constant collection, topo sort, input resolution
6. **`binary/encoder.ts`** — SCgf v2 binary encoding

**Validation strategy:** Compile a known simple SynthDef (e.g. `{ SinOsc.ar * 0.5 |> Out.ar(0) }`) and compare the binary output byte-for-byte against SC's own output. SC can dump `.scsyndef` files via `SynthDef.writeDefFile`.

### Phase 2: UGen Library
7. **`ugens/envelope.ts`** — Envelope array format helpers
8. **`ugens/generated.ts`** — Implement all built-in UGens, category by category:
   - Start with I/O (Out, In) + basic oscillators (SinOsc, LFSaw, Impulse)
   - Then filters (LPF, HPF, RLPF, Resonz)
   - Then noise (WhiteNoise, PinkNoise, Dust)
   - Then envelopes (EnvGen, Line, XLine)
   - Then delays, panning, triggers, buffer I/O, info UGens

### Phase 3: Server Communication
9. **`osc/transport.ts`** — UDP OSC transport + Server class
10. **`index.ts`** — Public API surface

### Phase 4: Polish
11. Constant folding optimizations in `ops.ts`
12. `MulAdd` / `Sum3` / `Sum4` optimization passes (optional)
13. SynthDef decompilation / pretty-printing (read `.scsyndef` back)

---

## Key Source Code References

### SuperCollider (authoritative)

| File | What it tells you |
|------|-------------------|
| `supercollider/HelpSource/Reference/Synth-Definition-File-Format.schelp` | Binary format spec (human-readable) |
| `supercollider/server/scsynth/SC_GraphDef.cpp:361-437` | Binary format parser — the ground truth for what scsynth actually accepts |
| `supercollider/server/scsynth/SC_GraphDef.cpp:187-218` | File header parsing, version dispatch |
| `supercollider/server/scsynth/SC_GraphDef.cpp:873-928` | Wire/buffer coloring — how scsynth wires UGens together |
| `supercollider/SCClassLibrary/Common/Audio/SynthDef.sc:47-57` | `build` — the compilation entry point |
| `supercollider/SCClassLibrary/Common/Audio/SynthDef.sc:75-92` | `initBuild`, `buildUgenGraph` — global context setup, function eval |
| `supercollider/SCClassLibrary/Common/Audio/SynthDef.sc:184-267` | `buildControls` — parameter grouping by rate, Control UGen creation |
| `supercollider/SCClassLibrary/Common/Audio/SynthDef.sc:326-401` | `writeDef` — binary serialization per-synthdef |
| `supercollider/SCClassLibrary/Common/Audio/SynthDef.sc:501-534` | Topological sort (Kahn's algorithm) |
| `supercollider/SCClassLibrary/Common/Audio/SynthDef.sc:466-471` | `addConstant` — constant deduplication |
| `supercollider/SCClassLibrary/Common/Audio/UGen.sc:14` | `new1` — canonical UGen constructor chain |
| `supercollider/SCClassLibrary/Common/Audio/UGen.sc:23-39` | `multiNewList` — multichannel expansion algorithm |
| `supercollider/SCClassLibrary/Common/Audio/UGen.sc:313-316` | `addToSynth` — auto-registration with builder |
| `supercollider/SCClassLibrary/Common/Audio/UGen.sc:479-511` | `writeInputSpec`, `writeDef` — per-UGen binary serialization |
| `supercollider/SCClassLibrary/Common/Audio/UGen.sc:513-543` | `initTopoSort`, `schedule` — dependency graph building |
| `supercollider/SCClassLibrary/Common/Audio/UGen.sc:575-656` | `MultiOutUGen`, `OutputProxy` — multi-output handling |
| `supercollider/SCClassLibrary/Common/Audio/BasicOpsUGen.sc:15-21` | `operator_` — specialIndex from operator symbol |
| `supercollider/SCClassLibrary/Common/Audio/BasicOpsUGen.sc:59-122` | `BinaryOpUGen` — creation, constant folding, optimizations |
| `supercollider/SCClassLibrary/Common/Audio/BasicOpsUGen.sc:42-57` | `UnaryOpUGen` — creation, rate inheritance |
| `supercollider/SCClassLibrary/Common/Audio/BasicOpsUGen.sc:198-309` | MulAdd/Sum3/Sum4 optimizations |
| `supercollider/SCClassLibrary/Common/Audio/InOut.sc:61-82` | `Control.init` — specialIndex = controls offset |
| `supercollider/SCClassLibrary/Common/Audio/Osc.sc` | Oscillator UGen definitions (SinOsc, LFSaw, etc.) |
| `supercollider/SCClassLibrary/Common/Audio/Filter.sc` | Filter UGen definitions (LPF, HPF, Resonz, etc.) |
| `supercollider/SCClassLibrary/Common/Audio/Noise.sc` | Noise UGen definitions |
| `supercollider/SCClassLibrary/Common/Audio/Delays.sc` | Delay UGen definitions |
| `supercollider/SCClassLibrary/Common/Audio/EnvGen.sc` | EnvGen definition |
| `supercollider/SCClassLibrary/Common/Audio/InOut.sc` | I/O UGen definitions |
| `supercollider/SCClassLibrary/Common/Audio/Pan.sc` | Panning UGen definitions |
| `supercollider/SCClassLibrary/Common/Audio/Env.sc` | Envelope spec array format |

### Overtone (Clojure reference implementation)

| File | What it tells you |
|------|-------------------|
| `overtone/src/overtone/sc/synth.clj` | Full compilation pipeline: graph building → topo sort → detailing → synthdef record |
| `overtone/src/overtone/sc/machinery/synthdef.clj` | Binary serialization (v1 and v2 format specs via byte_spec DSL) |
| `overtone/src/overtone/sc/machinery/ugen/fn_gen.clj` | UGen function generation, multichannel expansion implementation |
| `overtone/src/overtone/sc/machinery/ugen/sc_ugen.clj` | SCUGen record: id, name, rate, special, args, n-outputs |
| `overtone/src/overtone/sc/machinery/ugen/defaults.clj` | Rate constants and mappings |
| `overtone/src/overtone/sc/machinery/ugen/metadata/*.clj` | Per-UGen metadata specs (args, rates, docs) — good codegen source |

### Supriya (Python reference implementation)

| File | What it tells you |
|------|-------------------|
| `supriya/supriya/ugens/core.py:313-359` | `@ugen` decorator — declarative UGen definition pattern |
| `supriya/supriya/ugens/core.py:299-310` | `param()` — parameter definition with defaults and rate checks |
| `supriya/supriya/ugens/core.py:455+` | `UGenOperable` — operator overloading producing BinaryOpUGen/UnaryOpUGen |
| `supriya/supriya/ugens/core.py:4870+` | `UGen.__init__` — input validation, scope checking |
| `supriya/supriya/ugens/core.py:4987-5042` | Multichannel expansion (`_expand_params`) |
| `supriya/supriya/ugens/core.py:5325-5374` | Control/AudioControl/TrigControl/LagControl definitions |
| `supriya/supriya/ugens/core.py:5743+` | `SynthDefBuilder` — context manager for graph building |
| `supriya/supriya/ugens/core.py:6219-6340` | Binary compilation pipeline (`compile_synthdefs`) |
| `supriya/supriya/enums.py:30-90` | `BinaryOperator` enum — all 49 binary op indices |
| `supriya/supriya/enums.py:539-600` | `UnaryOperator` enum — all 54 unary op indices |
| `supriya/supriya/ugens/osc.py` | Example UGen definitions (SinOsc, Impulse, etc.) using @ugen |
| `supriya/supriya/ugens/filters.py` | Filter UGen definitions |
| `supriya/supriya/ugens/basic.py` | Basic UGens (Out, In, DC, Mix) |

---

## Critical Implementation Details

### 1. Input Wire Format

When serializing, each UGen input is written as two int32 values:
- **From a UGen output:** `(ugenIndex, outputIndex)` where `ugenIndex` is the topologically-sorted position
- **From a constant:** `(-1, constantIndex)` where `constantIndex` is the position in the constants array

The `ugenIndex = -1` sentinel is how scsynth distinguishes constants from UGen wires. SC_GraphDef.cpp confirms this at line 838.

### 2. Control UGen Special Index

For `Control`, `TrigControl`, `AudioControl`, `LagControl` UGens, `specialIndex` encodes the starting offset into the flat controls (parameter defaults) array. This is how scsynth knows which parameter values to associate with which Control UGen outputs.

### 3. mul/add Are Not UGen Inputs

SC UGens like `SinOsc.ar(440, 0, mul: 0.5, add: 0)` do NOT send `mul` and `add` as inputs to the `SinOsc` UGen on the server. Instead, they create additional graph nodes: `MulAdd(sinOsc, 0.5, 0)` or equivalent `BinaryOpUGen` nodes. Our TypeScript wrappers should match this behavior.

### 4. OutputProxy vs UGen

A `MultiOutUGen` (e.g. `Pan2`) produces multiple `OutputProxy` objects. An `OutputProxy` is not itself a UGen in the graph — it's a reference to a specific output channel of its parent UGen. Only the parent is serialized. When an `OutputProxy` is used as an input to another UGen, the serialized input spec references `(parentUGen.synthIndex, outputProxy.outputIndex)`.

### 5. EnvGen Envelope Flattening

`EnvGen`'s envelope parameter is not a single input — it's a variable-length array of floats that gets flattened into the UGen's input list. The format is:
```
[startLevel, numSegments, releaseNode, loopNode,
 targetLevel1, dur1, curveShape1, curveValue1,
 targetLevel2, dur2, curveShape2, curveValue2, ...]
```

### 6. WidthFirst UGens

Some UGens (`LocalBuf`, `MaxLocalBufs`, `SetBuf`, `ClearBuf`, `RandSeed`, `RandID`) need to be placed early in the graph regardless of their apparent dependencies. In SC, these use `widthFirstAntecedents` to constrain ordering. Our topo sort should handle this.

---

## Operator Index Tables

### BinaryOpUGen Special Indices

| Index | Name | TS Function |
|-------|------|-------------|
| 0 | + | `add` |
| 1 | - | `sub` |
| 2 | * | `mul` |
| 3 | div (integer) | `idiv` |
| 4 | / | `div` |
| 5 | mod | `mod` |
| 6 | == | `eq` |
| 7 | != | `neq` |
| 8 | < | `lt` |
| 9 | > | `gt` |
| 10 | <= | `lte` |
| 11 | >= | `gte` |
| 12 | min | `min` |
| 13 | max | `max` |
| 14 | bitAnd | `bitAnd` |
| 15 | bitOr | `bitOr` |
| 16 | bitXor | `bitXor` |
| 17 | lcm | `lcm` |
| 18 | gcd | `gcd` |
| 19 | round | `round` |
| 20 | roundUp | `roundUp` |
| 21 | trunc | `trunc` |
| 22 | atan2 | `atan2` |
| 23 | hypot | `hypot` |
| 24 | hypotApx | `hypotApx` |
| 25 | pow | `pow` |
| 26 | leftShift | `leftShift` |
| 27 | rightShift | `rightShift` |
| 28 | unsignedRightShift | `unsignedRightShift` |
| 29 | fill | `fill` |
| 30 | ring1 | `ring1` |
| 31 | ring2 | `ring2` |
| 32 | ring3 | `ring3` |
| 33 | ring4 | `ring4` |
| 34 | difsqr | `difsqr` |
| 35 | sumsqr | `sumsqr` |
| 36 | sqrsum | `sqrsum` |
| 37 | sqrdif | `sqrdif` |
| 38 | absdif | `absdif` |
| 39 | thresh | `thresh` |
| 40 | amclip | `amclip` |
| 41 | scaleneg | `scaleneg` |
| 42 | clip2 | `clip2` |
| 43 | excess | `excess` |
| 44 | fold2 | `fold2` |
| 45 | wrap2 | `wrap2` |
| 46 | firstArg | `firstArg` |
| 47 | rrand | `rrand` |
| 48 | exprand | `exprand` |

### UnaryOpUGen Special Indices

| Index | Name | TS Function |
|-------|------|-------------|
| 0 | neg | `neg` |
| 5 | abs | `abs` |
| 8 | ceil | `ceil` |
| 9 | floor | `floor` |
| 10 | frac | `frac` |
| 11 | sign | `sign` |
| 12 | squared | `squared` |
| 13 | cubed | `cubed` |
| 14 | sqrt | `sqrt` |
| 15 | exp | `exp` |
| 16 | reciprocal | `reciprocal` |
| 17 | midicps | `midicps` |
| 18 | cpsmidi | `cpsmidi` |
| 19 | midiratio | `midiratio` |
| 20 | ratiomidi | `ratiomidi` |
| 21 | dbamp | `dbamp` |
| 22 | ampdb | `ampdb` |
| 25 | log | `log` |
| 26 | log2 | `log2` |
| 27 | log10 | `log10` |
| 28 | sin | `sin` |
| 29 | cos | `cos` |
| 30 | tan | `tan` |
| 31 | asin | `asin` |
| 32 | acos | `acos` |
| 33 | atan | `atan` |
| 34 | sinh | `sinh` |
| 35 | cosh | `cosh` |
| 36 | tanh | `tanh` |
| 42 | distort | `distort` |
| 43 | softclip | `softclip` |

(Full list: indices 0-53, see supriya `enums.py:539-600`)

---

## Testing Strategy

1. **Binary round-trip tests:** Build a SynthDef in SC, write to `.scsyndef`, then build the same graph in TS and compare bytes.
2. **Smoke tests with scsynth:** Send compiled defs via `/d_recv`, create synths with `/s_new`, verify audio output.
3. **Unit tests for topo sort:** Known dependency graphs with expected orderings.
4. **Multichannel expansion tests:** Verify array inputs produce correct number of UGen copies.
5. **Constant deduplication tests:** Same float value used in multiple places maps to one constant index.

**Test SynthDefs to verify against SC output:**
```supercollider
// Minimal
SynthDef(\test1, { Out.ar(0, SinOsc.ar(440) * 0.5) }).writeDefFile;

// With params
SynthDef(\test2, { |freq=440, amp=0.5| Out.ar(0, SinOsc.ar(freq) * amp) }).writeDefFile;

// Multi-output
SynthDef(\test3, { |freq=440| Out.ar(0, Pan2.ar(SinOsc.ar(freq), 0)) }).writeDefFile;

// Envelope
SynthDef(\test4, { |gate=1| Out.ar(0, SinOsc.ar(440) * EnvGen.kr(Env.asr, gate, doneAction: 2)) }).writeDefFile;

// Multiple rates
SynthDef(\test5, { |freq=440, amp=0.5, gate=1|
    var env = EnvGen.kr(Env.asr, gate, doneAction: 2);
    Out.ar(0, SinOsc.ar(freq) * amp * env);
}).writeDefFile;
```

---

## Module 11: `codegen/` — UGen Definition Parser & Code Generator

A standalone TypeScript script that parses SuperCollider `.sc` source files and emits typed UGen definitions for `ugens/generated.ts`. This enables mechanical updates when a new SC version is released.

### Strategy: Dual-Source Approach

**Primary source:** SuperCollider `.sc` class files (authoritative, always up-to-date)
**Supplementary source:** Overtone metadata `.clj` files (more structured, easier to parse, contains docs)

The SC `.sc` files are the ground truth since they ship with every SC release. Overtone metadata can fill in documentation and validate results but may lag behind SC versions.

### What the Parser Extracts Per UGen

```typescript
interface UGenSpec {
  name: string;              // "SinOsc"
  parentClass: string;       // "PureUGen"
  rates: {                   // per-rate param signatures (defaults can differ per rate)
    ar?: ParamSpec[];
    kr?: ParamSpec[];
    ir?: ParamSpec[];
    new?: ParamSpec[];       // scalar-only UGens use *new
  };
  numOutputs: number | "variable";  // 1, 2, 4, or "variable" (driven by numChannels param)
  numOutputsParam?: string;  // which param controls output count (e.g. "numChannels")
  isOutputUGen: boolean;     // Out, LocalOut, XOut → 0 outputs
  isVariadic: boolean;       // uses multiNewList with ++ (variable input count)
  variadicParam?: string;    // name of the array/variadic param
  signalRange?: "unipolar" | "bipolar";
  isPseudoUGen: boolean;     // SelectX, TChoose, etc. — exclude from server UGen list
}

interface ParamSpec {
  name: string;
  default: number | null;    // null = required (no default)
  isServerInput: boolean;    // false for mul/add
}
```

### SC `.sc` File Parsing Strategy

The SC class library uses a small number of syntactic patterns consistently. A regex-based parser (not a full SC language parser) handles ~95% of cases. The remaining edge cases can be cataloged in a manual overrides file.

#### Pattern Catalog (all patterns observed across 48 `.sc` files)

**1. Class declarations:**
```regex
^\s*(\w+)\s*:\s*(\w+)\s*\{
```
Captures `className` and `parentClass`. Empty subclasses (`LFPar : LFSaw {}`) inherit all methods from parent.

**2. Rate methods:**
```regex
^\s*\*(ar|kr|ir|new)\s*\{
```
Then parse the `arg` declaration up to `;`:
```regex
arg\s+([\s\S]*?);
```
Split on commas, for each arg parse `name` and optional `= default`.

**3. Default values:**
All observed defaults in the `.sc` source are plain numeric literals: `440.0`, `0`, `1.0`, `0.5`, `0.995`, `56789`. No method-call expressions (`60.midicps`) appear in the built-in UGen `*ar`/`*kr` method signatures. The parser only needs to handle `float`, `int`, and absent (no `=`).

**4. `mul`/`add` stripping:**
Remove params named exactly `mul` and `add`. These always appear as the final two params and are never passed to `this.multiNew`. They are client-side-only via `.madd()`.

**5. Distinguishing real UGens from pseudo-UGens:**
A class is a real server-side UGen if its `*ar`/`*kr`/`*ir`/`*new` method (or an ancestor's) calls `this.multiNew` or `this.multiNewList`. Classes like `SelectX`, `TChoose`, `Changed` that only compose other UGens are pseudo-UGens and should be flagged.
```regex
this\.multiNew\(|this\.multiNewList\(
```

**6. Multi-output detection (parent = `MultiOutUGen`):**
- Fixed count: count `OutputProxy(` literals in the `init` method → 2, 3, or 4
- Variable count: presence of `initOutputs(` or `Array.fill(numCh` in `init`
- The param driving the count is typically named `numChannels` or `numChans`

**7. Zero-output detection (parent = `AbstractOut` or returns `^0.0`):**
```regex
numOutputs\s*\{\s*\^0\s*\}|^\s*\^0\.0
```

**8. Variadic input detection:**
```regex
this\.multiNewList\(\[.*?\]\s*\+\+\s*(\w+)\)
```
The captured group is the variadic param name (e.g. `channelsArray`, `array`).

**9. Empty subclasses (inherit everything from parent):**
```regex
^\s*(\w+)\s*:\s*(\w+)\s*\{\s*\}
```
These are distinct server-side UGens (scsynth resolves by name) but share the parent's API. The parser must emit a separate entry for each, copying the parent's rate methods and params. Examples: `LFPar : LFSaw {}`, `AllpassC : CombN {}`, `HPF : LPF {}`, `BrownNoise : WhiteNoise {}`.

**10. Different defaults per rate:**
`LeakDC` has `coef=0.995` for `*ar` and `coef=0.9` for `*kr`. The parser must extract defaults per-rate-method, not per-class.

#### Edge Cases Requiring Manual Overrides

A small `overrides.json` file handles UGens with non-standard constructors:

| UGen | Issue | Override |
|------|-------|---------|
| `EnvGen` | Envelope arg is flattened into inputs, not a single param | Custom input layout |
| `Control`, `AudioControl`, `TrigControl` | Internal UGens, not user-facing | Exclude from generated API |
| `VarLag` | `*new1` override rewrites to `EnvGen` for some curves | Mark as complex |
| `WhiteNoise` (and subclasses) | Zero UGen inputs (only mul/add) | Empty param list |
| `SendReply` | Custom `*new1` that converts cmdName string to char codes | Custom handler |
| `LocalIn` | Default arg is an array, splatted with `*default` | Special array default |
| `DecodeB2`, `PanAz` | `numChans` passed as first arg to `multiNew` but is not a server input | `numOutputsParam` |

### Overtone Metadata as Supplementary Source

Overtone's metadata files (`overtone/src/overtone/sc/machinery/ugen/metadata/*.clj`) are Clojure EDN data — vectors of maps. They're significantly easier to parse than `.sc` files and contain:

- `:name` — UGen name
- `:args` — ordered list of `{:name, :default, :doc, :mode}` maps
- `:rates` — set of supported rates (e.g. `#{:ar :kr}`)
- `:num-outs` — output count (fixed integer or absent = 1)
- `:extends` — parent UGen name for inheritance
- `:doc`, `:summary` — documentation strings

**Arg `:mode` values critical for codegen:**
| Mode | Meaning for TS codegen |
|------|----------------------|
| `:num-outs` | This param controls output count, not a server input |
| `:append-sequence` | Variadic array param, flattened into inputs |
| `:append-sequence-set-num-outs` | Variadic + sets output count |
| `:not-expanded` | Exclude from multichannel expansion |

**Registry of all metadata files** (from `overtone/src/overtone/sc/machinery/ugen/specs.clj`):
```
basicops, buf_io, compander, delay, envgen, fft2, fft_unpacking, grain,
io, machine_listening, misc, osc, beq_suite, chaos, control, demand,
ff_osc, fft, info, noise, pan, trig, line, input, filter, random
```

**Parsing approach:** Use a simple Clojure EDN reader (several npm packages exist, e.g. `jsedn`) to parse the metadata maps. Skip the `:check` and `:init` fields (these contain live Clojure functions). Everything else is pure data.

### Parser Implementation

**File: `codegen/parse-sc.ts`**

```typescript
// Main entry point
function parseScDirectory(scAudioDir: string): UGenSpec[];

// Parse a single .sc file
function parseScFile(filePath: string): UGenSpec[];

// Resolve inheritance (empty subclasses copy parent's methods)
function resolveInheritance(specs: UGenSpec[]): UGenSpec[];
```

**Algorithm:**
1. Glob all `.sc` files in `SCClassLibrary/Common/Audio/`
2. For each file, extract class declarations and their method bodies using regex
3. For each class, extract `*ar`/`*kr`/`*ir`/`*new` methods
4. For each method, parse the `arg` list (split on commas, extract name + default)
5. Strip `mul` and `add` params
6. Detect multi-output / zero-output / variadic patterns
7. Detect pseudo-UGens (no `this.multiNew` call in the class or ancestors)
8. Resolve empty subclass inheritance
9. Apply manual overrides from `overrides.json`
10. Output: JSON array of `UGenSpec` objects

**File: `codegen/parse-overtone.ts`** (optional supplementary)

```typescript
function parseOvertoneMetadata(metadataDir: string): UGenSpec[];
```

Parses the Clojure EDN files and converts to the same `UGenSpec` format. Used to cross-validate against SC parsing results and to pull in documentation strings.

**File: `codegen/generate.ts`**

```typescript
function generateUGenModule(specs: UGenSpec[]): string;
```

Takes the parsed specs and emits TypeScript source code for `ugens/generated.ts`. Uses string templating to produce one object per UGen with rate methods.

**Template for code generation:**

```typescript
// For a standard single-output UGen with ar+kr:
`export const ${name} = {
  ar(params: { ${arParams.map(p => `${p.name}${p.default !== null ? '?' : ''}: UGenInput`).join('; ')} } = {}): UGenOutput {
    const { ${arParams.map(p => p.default !== null ? `${p.name} = ${p.default}` : p.name).join(', ')} } = params;
    return newUGen("${name}", Rate.Audio, [${arParams.map(p => p.name).join(', ')}], ${numOutputs});
  },
  kr(params: { ... } = {}): UGenOutput { ... },
};`
```

### Files in `codegen/`

| File | Purpose |
|------|---------|
| `codegen/parse-sc.ts` | Parse `.sc` files from SC source tree |
| `codegen/parse-overtone.ts` | Parse Overtone `.clj` metadata (optional) |
| `codegen/generate.ts` | Emit `ugens/generated.ts` from parsed specs |
| `codegen/overrides.json` | Manual corrections for edge-case UGens |
| `codegen/run.ts` | CLI entry point: `ts-node codegen/run.ts --sc-path ./supercollider` |

### SC Source Files to Parse

All `.sc` files in `supercollider/SCClassLibrary/Common/Audio/`:

| File | UGen Count (approx) | Categories |
|------|---------------------|------------|
| `Osc.sc` | ~25 | Oscillators, wavetable, index lookup |
| `Filter.sc` | ~35 | Filters, lag, decay, EQ |
| `Noise.sc` | ~25 | Noise generators, random |
| `Delays.sc` | ~20 | Delay lines, comb, allpass |
| `InOut.sc` | ~15 | I/O, controls |
| `BufIO.sc` | ~10 | Buffer playback, recording |
| `EnvGen.sc` | ~8 | Envelope generators, done actions |
| `Line.sc` | ~10 | Line, XLine, converters |
| `Pan.sc` | ~12 | Panning, crossfade |
| `Trig.sc` | ~25 | Triggers, measurement, pitch |
| `BasicOpsUGen.sc` | 5 | UnaryOp, BinaryOp, MulAdd, Sum3, Sum4 |
| `InfoUGens.sc` | ~18 | SampleRate, BufFrames, etc. |
| `Chaos.sc` | ~10 | Chaotic oscillators |
| `Compander.sc` | ~3 | Compander, Limiter, Normalizer |
| `Demand.sc` | ~15 | Demand-rate UGens |
| `DiskIO.sc` | ~3 | DiskIn, DiskOut, VDiskIn |
| `FFT.sc` | ~3 | FFT, IFFT, PV_* |
| `FFT2.sc` | ~20 | PV_ chain UGens |
| `GrainUGens.sc` | ~5 | GrainSin, GrainFM, etc. |
| `FreeVerb.sc` | 2 | FreeVerb, FreeVerb2 |
| `MoogFF.sc` | 1 | MoogFF |
| `Hilbert.sc` | 2 | Hilbert, FreqShift |
| `BEQSuite.sc` | ~10 | BLowPass, BHiPass, etc. |
| `MachineListening.sc` | ~5 | BeatTrack, Loudness, etc. |
| `PhysicalModel.sc` | ~3 | Ball, TBall, Spring |
| `PitchShift.sc` | 1 | PitchShift |
| `Pluck.sc` | 1 | Pluck |
| `FSinOsc.sc` | 2 | FSinOsc, PSinGrain |
| `Gendyn.sc` | 2 | Gendy1, Gendy2, Gendy3 |
| `GVerb.sc` | 1 | GVerb |
| `IEnvGen.sc` | 1 | IEnvGen |

**Total: ~300+ real UGen classes** (many are empty subclasses inheriting from a parent)

### Workflow for SC Version Updates

```bash
# 1. Pull new SC source
cd supercollider && git pull

# 2. Re-run the parser
npx ts-node codegen/run.ts \
  --sc-path ./supercollider/SCClassLibrary/Common/Audio \
  --overrides ./codegen/overrides.json \
  --output ./src/ugens/generated.ts

# 3. Diff the output to see what changed
git diff src/ugens/generated.ts

# 4. Review and commit
```

### Validation

The parser's output should be validated by:
1. **Count check:** Total UGen count should match `UGen.allSubclasses.size` from a running SC instance
2. **Cross-reference with supriya's `ugens.py`:** Compare extracted param names and defaults against the ~400 entries in `supriya/dev/etc/ugens.py`
3. **Cross-reference with overtone metadata:** Compare against the 28 metadata `.clj` files
4. **Binary round-trip:** For a subset of UGens, build a SynthDef using the generated definitions and compare the binary output against SC's own `.scsyndef` output

use the command /Applications/SuperCollider.app/Contents/MacOS/sclang to run sclang to generate synthdef files

search the web as necessary
