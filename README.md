# synthdefTS

TypeScript bindings for building [SuperCollider](https://supercollider.github.io/) SynthDef binaries — no SuperCollider IDE or sclang required. Inspired by Python's [supriya](https://github.com/supriya-project/supriya) library.

Includes a visual node-graph editor (Vue 3 + [Rete.js](https://retejs.org/)) for designing SynthDefs interactively, with export to `.scsyndef` binary or TypeScript source code.

## Overview

synthdefTS lets you define SuperCollider synths in pure TypeScript, compile them to the SCgf v2 binary format, and send them directly to `scsynth` over OSC. The library covers 100+ UGens (auto-generated from SuperCollider source), arithmetic operators with constant folding, envelope helpers, and a full binary encoder.

```typescript
import { synthDef, kr, SynthDef } from "synthdefts/src/index.ts";
import { SinOsc, Out } from "synthdefts/src/ugens/generated.ts";
import { mul } from "synthdefts/src/ugens/ops.ts";

const sine = synthDef("simpleSine", { freq: kr(440), amp: kr(0.3) }, (p) => {
  const sig = SinOsc.ar({ freq: p.freq });
  Out.ar({ bus: 0, channelsArray: mul(sig, p.amp) });
});

// Compile to binary
const binary: Uint8Array = sine.encode();
```

## Project Structure

```
synthdefTS/
├── src/                  Core library
│   ├── graph/            SynthDef builder, compiler, types
│   ├── binary/           SCgf v2 binary encoder
│   ├── ugens/            UGen definitions (generated + manual)
│   ├── osc/              OSC communication utilities
│   ├── tools/            Timing/scheduling system
│   └── index.ts          Public API
├── ui/                   Visual node-graph editor (Vue 3 + Rete.js)
│   ├── src/nodeEditor/   Rete.js graph editor
│   ├── src/bridge/       Graph → SynthDef compiler & code generator
│   └── src/composables/  Vue composables
├── tests/                Binary comparison tests & live playback demos
│   ├── compare.test.ts   15 fixture-based binary comparison tests
│   ├── play.ts           Live synth playback examples
│   ├── grainChordLerp.ts Granular synth demo with timing system
│   └── fixtures/         Reference .scsyndef binaries from SuperCollider
├── codegen/              Auto-generates UGen wrappers from SC source
└── scripts/              Helper scripts (fixture generation)
```

## Prerequisites

- [Deno](https://deno.land/) (runtime for the core library, tests, and examples)
- [scsynth](https://supercollider.github.io/) running on UDP port 57110 (for live playback examples)
- [Node.js](https://nodejs.org/) (optional, for the UI — can also run via Deno)

## Running Server-Side Examples

All server-side code runs via Deno tasks defined in `deno.json`.

### Tests

Run the binary comparison test suite (no scsynth required):

```bash
deno task test
```

This compares generated binaries byte-for-byte against 15 reference `.scsyndef` files produced by SuperCollider.

### Live Playback

These examples require `scsynth` running on port 57110. Start it with:

```bash
scsynth -u 57110
```

Then run any of the playback examples:

```bash
# Basic synth playback demos (SinOsc, noise, filters, reverb, envelopes)
deno task play

# Granular chord interpolation — fires notes every 80ms for 10 seconds,
# transitioning between two chords with sigmoid probability shaping
deno task grainChordLerp
```

The `grainChordLerp` example demonstrates:
- Defining a complex SynthDef with 14 parameters (oscillator, filter, LFO, envelopes)
- Sending the compiled binary to scsynth via OSC `/d_recv`
- Real-time note triggering with the timing/scheduling system
- Pitch ramps using `/n_set` messages with sigmoid interpolation

## Running the Visual Node-Graph Editor

The UI is a Vue 3 app using Rete.js for the node graph. It lives in the `ui/` directory.

### With npm

```bash
cd ui
npm install
npm run dev
```

### With Deno

From the project root:

```bash
deno task ui
```

Or from the `ui/` directory:

```bash
cd ui
deno task dev
```

The dev server starts at **http://localhost:5173** or similar (if that port is taken). The editor lets you visually connect UGen nodes to build SynthDefs, then export as `.scsyndef` binary or TypeScript source code.

## Core API

```typescript
// Define a SynthDef with named parameters
const def = synthDef("name", { freq: kr(440), amp: kr(0.5) }, (p) => {
  // p.freq and p.amp are UGen inputs tied to control-rate parameters
  Out.ar({ bus: 0, channelsArray: mul(SinOsc.ar({ freq: p.freq }), p.amp) });
});

// Parameter rate helpers
kr(default)  // control rate (updates every control block)
ar(default)  // audio rate
ir(default)  // initialization rate (set once)
tr(default)  // trigger rate

// Compile and encode
const compiled = def.compile();  // topological sort, constant dedup, indexing
const binary = def.encode();     // SCgf v2 binary (Uint8Array)

// Envelope helpers
import { adsr, asr, perc, linen } from "synthdefts/src/ugens/envelope.ts";
```

## Codegen

UGen wrappers in `src/ugens/generated.ts` are auto-generated from SuperCollider's class library source:

```bash
deno task codegen
```

This parses SC class files from a local SuperCollider checkout and writes typed wrapper functions for 100+ UGens.

## Acknowledgments

Inspired by [supriya](https://github.com/supriya-project/supriya) (Python) and [Overtone](https://overtone.github.io/) (Clojure) — projects that bring SuperCollider's synthesis engine to other languages.
