import {
  defineNode,
  NodeInterface,
  NumberInterface,
  SelectInterface,
} from "baklavajs";
import { TextInputInterface } from "@baklavajs/renderer-vue";

// ─── Interface type marker for signal connections ─────────────────────────────
// We use a simple string tag so the bridge can distinguish signal vs number.

/** A UGen signal port (audio or control rate output). */
function signalOutput(name: string) {
  return () => new NodeInterface<number>(name, 0);
}

/** A UGen signal input port (connectable from another UGen output). */
function signalInput(name: string, defaultValue = 0) {
  return () => new NumberInterface(name, defaultValue);
}

/** Rate selector (audio / control). */
function rateSelect(defaultRate = "audio") {
  return () =>
    new SelectInterface("Rate", defaultRate, ["audio", "control"]).setPort(
      false
    );
}

// ─── Oscillators ──────────────────────────────────────────────────────────────

export const SinOscNode = defineNode({
  type: "SinOsc",
  title: "SinOsc",
  inputs: {
    rate: rateSelect(),
    freq: signalInput("freq", 440),
    phase: signalInput("phase", 0),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const SawNode = defineNode({
  type: "Saw",
  title: "Saw",
  inputs: {
    rate: rateSelect(),
    freq: signalInput("freq", 440),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const PulseNode = defineNode({
  type: "Pulse",
  title: "Pulse",
  inputs: {
    rate: rateSelect(),
    freq: signalInput("freq", 440),
    width: signalInput("width", 0.5),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const WhiteNoiseNode = defineNode({
  type: "WhiteNoise",
  title: "WhiteNoise",
  inputs: {
    rate: rateSelect(),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const PinkNoiseNode = defineNode({
  type: "PinkNoise",
  title: "PinkNoise",
  inputs: {
    rate: rateSelect(),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const LFNoise0Node = defineNode({
  type: "LFNoise0",
  title: "LFNoise0",
  inputs: {
    rate: rateSelect(),
    freq: signalInput("freq", 500),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const LFNoise1Node = defineNode({
  type: "LFNoise1",
  title: "LFNoise1",
  inputs: {
    rate: rateSelect(),
    freq: signalInput("freq", 500),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const LFNoise2Node = defineNode({
  type: "LFNoise2",
  title: "LFNoise2",
  inputs: {
    rate: rateSelect(),
    freq: signalInput("freq", 500),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const DustNode = defineNode({
  type: "Dust",
  title: "Dust",
  inputs: {
    rate: rateSelect(),
    density: signalInput("density", 1),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const ImpulseNode = defineNode({
  type: "Impulse",
  title: "Impulse",
  inputs: {
    rate: rateSelect(),
    freq: signalInput("freq", 1),
    phase: signalInput("phase", 0),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

// ─── Filters ──────────────────────────────────────────────────────────────────

export const LPFNode = defineNode({
  type: "LPF",
  title: "LPF",
  inputs: {
    rate: rateSelect(),
    in: signalInput("in", 0),
    freq: signalInput("freq", 1000),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const HPFNode = defineNode({
  type: "HPF",
  title: "HPF",
  inputs: {
    rate: rateSelect(),
    in: signalInput("in", 0),
    freq: signalInput("freq", 1000),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const BPFNode = defineNode({
  type: "BPF",
  title: "BPF",
  inputs: {
    rate: rateSelect(),
    in: signalInput("in", 0),
    freq: signalInput("freq", 1000),
    rq: signalInput("rq", 1),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const RLPFNode = defineNode({
  type: "RLPF",
  title: "RLPF",
  inputs: {
    rate: rateSelect(),
    in: signalInput("in", 0),
    freq: signalInput("freq", 1000),
    rq: signalInput("rq", 1),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

// ─── Envelopes ────────────────────────────────────────────────────────────────

export const EnvGenNode = defineNode({
  type: "EnvGen",
  title: "EnvGen",
  inputs: {
    rate: rateSelect(),
    envShape: () =>
      new SelectInterface("Envelope", "perc", [
        "perc",
        "adsr",
        "asr",
        "linen",
        "triangle",
      ]).setPort(false),
    gate: signalInput("gate", 1),
    attack: signalInput("attack", 0.01),
    decay: signalInput("decay", 0.3),
    sustain: signalInput("sustain", 0.5),
    release: signalInput("release", 1),
    level: signalInput("level", 1),
    doneAction: () =>
      new SelectInterface("doneAction", "2 (free)", [
        "0 (none)",
        "2 (free)",
      ]).setPort(false),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

// ─── Effects ──────────────────────────────────────────────────────────────────

export const FreeVerbNode = defineNode({
  type: "FreeVerb",
  title: "FreeVerb",
  inputs: {
    in: signalInput("in", 0),
    mix: signalInput("mix", 0.33),
    room: signalInput("room", 0.5),
    damp: signalInput("damp", 0.5),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const CombCNode = defineNode({
  type: "CombC",
  title: "CombC",
  inputs: {
    rate: rateSelect(),
    in: signalInput("in", 0),
    maxdelaytime: signalInput("maxdelaytime", 0.2),
    delaytime: signalInput("delaytime", 0.2),
    decaytime: signalInput("decaytime", 1),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const AllpassCNode = defineNode({
  type: "AllpassC",
  title: "AllpassC",
  inputs: {
    rate: rateSelect(),
    in: signalInput("in", 0),
    maxdelaytime: signalInput("maxdelaytime", 0.2),
    delaytime: signalInput("delaytime", 0.2),
    decaytime: signalInput("decaytime", 1),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

// ─── I/O ──────────────────────────────────────────────────────────────────────

export const OutNode = defineNode({
  type: "Out",
  title: "Out",
  inputs: {
    bus: signalInput("bus", 0),
    in: signalInput("in", 0),
  },
  outputs: {},
});

// ─── Math ─────────────────────────────────────────────────────────────────────

export const MulNode = defineNode({
  type: "BinaryOpUGen_Mul",
  title: "Mul (×)",
  inputs: {
    a: signalInput("a", 0),
    b: signalInput("b", 1),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const AddNode = defineNode({
  type: "BinaryOpUGen_Add",
  title: "Add (+)",
  inputs: {
    a: signalInput("a", 0),
    b: signalInput("b", 0),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const SubNode = defineNode({
  type: "BinaryOpUGen_Sub",
  title: "Sub (−)",
  inputs: {
    a: signalInput("a", 0),
    b: signalInput("b", 0),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const DivNode = defineNode({
  type: "BinaryOpUGen_Div",
  title: "Div (÷)",
  inputs: {
    a: signalInput("a", 0),
    b: signalInput("b", 1),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const MulAddNode = defineNode({
  type: "MulAdd",
  title: "MulAdd",
  inputs: {
    in: signalInput("in", 0),
    mul: signalInput("mul", 1),
    add: signalInput("add", 0),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const AbsNode = defineNode({
  type: "UnaryOpUGen_Abs",
  title: "Abs",
  inputs: {
    in: signalInput("in", 0),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const NegNode = defineNode({
  type: "UnaryOpUGen_Neg",
  title: "Neg",
  inputs: {
    in: signalInput("in", 0),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const MidiCpsNode = defineNode({
  type: "UnaryOpUGen_MidiCps",
  title: "MidiCps",
  inputs: {
    in: signalInput("in", 60),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const CpsMidiNode = defineNode({
  type: "UnaryOpUGen_CpsMidi",
  title: "CpsMidi",
  inputs: {
    in: signalInput("in", 440),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

// ─── Control / Utility ────────────────────────────────────────────────────────

export const LineNode = defineNode({
  type: "Line",
  title: "Line",
  inputs: {
    rate: rateSelect("control"),
    start: signalInput("start", 0),
    end: signalInput("end", 1),
    dur: signalInput("dur", 1),
    doneAction: () =>
      new SelectInterface("doneAction", "0 (none)", [
        "0 (none)",
        "2 (free)",
      ]).setPort(false),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const XLineNode = defineNode({
  type: "XLine",
  title: "XLine",
  inputs: {
    rate: rateSelect("control"),
    start: signalInput("start", 1),
    end: signalInput("end", 0.001),
    dur: signalInput("dur", 1),
    doneAction: () =>
      new SelectInterface("doneAction", "0 (none)", [
        "0 (none)",
        "2 (free)",
      ]).setPort(false),
  },
  outputs: {
    out: signalOutput("out"),
  },
});

export const Pan2Node = defineNode({
  type: "Pan2",
  title: "Pan2",
  inputs: {
    rate: rateSelect(),
    in: signalInput("in", 0),
    pos: signalInput("pos", 0),
    level: signalInput("level", 1),
  },
  outputs: {
    left: signalOutput("left"),
    right: signalOutput("right"),
  },
});

// ─── Parameters (SynthDef controls) ──────────────────────────────────────────

export const ParamNode = defineNode({
  type: "Param",
  title: "Param",
  inputs: {
    name: () => new TextInputInterface("name", "freq").setPort(false),
    defaultValue: signalInput("default", 440),
    rate: () =>
      new SelectInterface("Rate", "control", [
        "scalar",
        "control",
        "trigger",
        "audio",
      ]).setPort(false),
  },
  outputs: {
    out: signalOutput("out"),
  },
  onCreate() {
    // Update title to show param name
    const nameIntf = this.inputs.name;
    if (nameIntf) {
      this.title = `Param: ${nameIntf.value}`;
      nameIntf.events.setValue.subscribe(this, (v) => {
        this.title = `Param: ${v}`;
      });
    }
  },
});

// ─── Registry ─────────────────────────────────────────────────────────────────

export const allNodeTypes = [
  // Oscillators
  SinOscNode,
  SawNode,
  PulseNode,
  WhiteNoiseNode,
  PinkNoiseNode,
  LFNoise0Node,
  LFNoise1Node,
  LFNoise2Node,
  DustNode,
  ImpulseNode,
  // Filters
  LPFNode,
  HPFNode,
  BPFNode,
  RLPFNode,
  // Envelopes
  EnvGenNode,
  // Effects
  FreeVerbNode,
  CombCNode,
  AllpassCNode,
  // I/O
  OutNode,
  // Math
  MulNode,
  AddNode,
  SubNode,
  DivNode,
  MulAddNode,
  AbsNode,
  NegNode,
  MidiCpsNode,
  CpsMidiNode,
  // Control
  LineNode,
  XLineNode,
  Pan2Node,
  // Parameters
  ParamNode,
];
