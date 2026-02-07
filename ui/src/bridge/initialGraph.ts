/**
 * Initial graph state matching the filteredSaw synthdef.
 */

import type { NodeEditorGraphState } from "../nodeEditor/graphTypes";

interface NodePlacement {
  type: string;
  x: number;
  y: number;
  inputs?: Record<string, unknown>;
}

interface ConnectionDef {
  fromNode: string;
  fromPort: string;
  toNode: string;
  toPort: string;
}

export function createFilteredSawGraphState(): NodeEditorGraphState {
  const nodeDefs: Record<string, NodePlacement> = {
    // Parameters (column 0)
    p_note: { type: "Param", x: 50, y: 50, inputs: { name: "note", defaultValue: 60, rate: "control" } },
    p_detune: { type: "Param", x: 50, y: 170, inputs: { name: "detune", defaultValue: 0, rate: "control" } },
    p_amp: { type: "Param", x: 50, y: 290, inputs: { name: "amp", defaultValue: 0.3, rate: "control" } },
    p_pan: { type: "Param", x: 50, y: 410, inputs: { name: "pan", defaultValue: 0, rate: "control" } },
    p_lfoSpeed: { type: "Param", x: 50, y: 530, inputs: { name: "lfoSpeed", defaultValue: 0, rate: "control" } },
    p_lfoDepth: { type: "Param", x: 50, y: 650, inputs: { name: "lfoDepth", defaultValue: 0, rate: "control" } },
    p_attack: { type: "Param", x: 50, y: 770, inputs: { name: "attack", defaultValue: 0.005, rate: "control" } },
    p_release: { type: "Param", x: 50, y: 890, inputs: { name: "release", defaultValue: 0.1, rate: "control" } },
    p_filterFreq: { type: "Param", x: 50, y: 1010, inputs: { name: "filterFreq", defaultValue: 2000, rate: "control" } },
    p_filterRes: { type: "Param", x: 50, y: 1130, inputs: { name: "filterRes", defaultValue: 0.3, rate: "control" } },
    p_filterAttack: { type: "Param", x: 50, y: 1250, inputs: { name: "filterAttack", defaultValue: 0.005, rate: "control" } },
    p_filterRelease: { type: "Param", x: 50, y: 1370, inputs: { name: "filterRelease", defaultValue: 0.15, rate: "control" } },
    p_filterEnvAmt: { type: "Param", x: 50, y: 1490, inputs: { name: "filterEnvAmt", defaultValue: 2000, rate: "control" } },

    // LFO (column 1)
    lfo: { type: "SinOsc", x: 400, y: 530, inputs: { rate: "control", freq: 0 } },

    // Amp envelope (column 1)
    ampEnv: {
      type: "EnvGen",
      x: 400,
      y: 770,
      inputs: { rate: "control", envShape: "perc", attack: 0.005, release: 0.1, doneAction: "2 (free)" },
    },

    // Filter envelope (column 1)
    filterEnv: {
      type: "EnvGen",
      x: 400,
      y: 1150,
      inputs: { rate: "control", envShape: "perc", attack: 0.005, release: 0.15, doneAction: "0 (none)" },
    },

    // Math ops (column 2)
    lfoMul: { type: "BinaryOpUGen_Mul", x: 700, y: 580 },
    noteDetune: { type: "BinaryOpUGen_Add", x: 700, y: 80 },
    filterEnvMul: { type: "BinaryOpUGen_Mul", x: 700, y: 1300 },

    // Math ops (column 3)
    modNote: { type: "BinaryOpUGen_Add", x: 950, y: 250 },
    modFilterFreq: { type: "BinaryOpUGen_Add", x: 950, y: 1150 },

    // MidiCps (column 3)
    freq: { type: "UnaryOpUGen_MidiCps", x: 950, y: 80 },

    // Oscillator (column 4)
    saw: { type: "Saw", x: 1200, y: 80, inputs: { rate: "audio" } },

    // Filter (column 4)
    rlpf: { type: "RLPF", x: 1200, y: 350, inputs: { rate: "audio" } },

    // Output chain (column 5)
    sigEnv: { type: "BinaryOpUGen_Mul", x: 1450, y: 400 },
    sigAmp: { type: "BinaryOpUGen_Mul", x: 1700, y: 400 },
    pan: { type: "Pan2", x: 1700, y: 600, inputs: { rate: "audio" } },
    out: { type: "Out", x: 1950, y: 500 },
  };

  const connectionDefs: ConnectionDef[] = [
    // LFO chain
    { fromNode: "p_lfoSpeed", fromPort: "out", toNode: "lfo", toPort: "freq" },
    { fromNode: "lfo", fromPort: "out", toNode: "lfoMul", toPort: "a" },
    { fromNode: "p_lfoDepth", fromPort: "out", toNode: "lfoMul", toPort: "b" },

    // Pitch chain: note + detune + lfo -> midicps -> saw
    { fromNode: "p_note", fromPort: "out", toNode: "noteDetune", toPort: "a" },
    { fromNode: "p_detune", fromPort: "out", toNode: "noteDetune", toPort: "b" },
    { fromNode: "noteDetune", fromPort: "out", toNode: "modNote", toPort: "a" },
    { fromNode: "lfoMul", fromPort: "out", toNode: "modNote", toPort: "b" },
    { fromNode: "modNote", fromPort: "out", toNode: "freq", toPort: "in" },
    { fromNode: "freq", fromPort: "out", toNode: "saw", toPort: "freq" },

    // Amp envelope
    { fromNode: "p_attack", fromPort: "out", toNode: "ampEnv", toPort: "attack" },
    { fromNode: "p_release", fromPort: "out", toNode: "ampEnv", toPort: "release" },

    // Filter envelope chain
    { fromNode: "p_filterAttack", fromPort: "out", toNode: "filterEnv", toPort: "attack" },
    { fromNode: "p_filterRelease", fromPort: "out", toNode: "filterEnv", toPort: "release" },
    { fromNode: "filterEnv", fromPort: "out", toNode: "filterEnvMul", toPort: "a" },
    { fromNode: "p_filterEnvAmt", fromPort: "out", toNode: "filterEnvMul", toPort: "b" },
    { fromNode: "p_filterFreq", fromPort: "out", toNode: "modFilterFreq", toPort: "a" },
    { fromNode: "filterEnvMul", fromPort: "out", toNode: "modFilterFreq", toPort: "b" },

    // Filter: saw -> RLPF
    { fromNode: "saw", fromPort: "out", toNode: "rlpf", toPort: "in" },
    { fromNode: "modFilterFreq", fromPort: "out", toNode: "rlpf", toPort: "freq" },
    { fromNode: "p_filterRes", fromPort: "out", toNode: "rlpf", toPort: "rq" },

    // Output: filtered * ampEnv * amp -> Pan2 -> Out
    { fromNode: "rlpf", fromPort: "out", toNode: "sigEnv", toPort: "a" },
    { fromNode: "ampEnv", fromPort: "out", toNode: "sigEnv", toPort: "b" },
    { fromNode: "sigEnv", fromPort: "out", toNode: "sigAmp", toPort: "a" },
    { fromNode: "p_amp", fromPort: "out", toNode: "sigAmp", toPort: "b" },
    { fromNode: "sigAmp", fromPort: "out", toNode: "pan", toPort: "in" },
    { fromNode: "p_pan", fromPort: "out", toNode: "pan", toPort: "pos" },
    { fromNode: "pan", fromPort: "left", toNode: "out", toPort: "in" },
  ];

  return {
    nodes: Object.entries(nodeDefs).map(([id, def]) => ({
      id,
      type: def.type,
      position: { x: def.x, y: def.y },
      inputs: def.inputs ?? {},
    })),
    connections: connectionDefs.map((def, index) => ({
      id: `c${index}`,
      from: { nodeId: def.fromNode, port: def.fromPort },
      to: { nodeId: def.toNode, port: def.toPort },
    })),
  };
}
