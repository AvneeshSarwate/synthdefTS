/**
 * Converts a BaklavaJS graph into a SuperCollider SynthDef binary.
 *
 * Strategy: walk the Baklava graph, build UGenNode objects directly,
 * then feed the resulting SynthDefData to compileSynthDef → encodeSynthDef.
 */

import type { AbstractNode, IConnection, Graph } from "@baklavajs/core";
import { Rate, ParameterRate } from "@synthdef/graph/types.ts";
import type {
  UGenOutput,
  UGenInput,
  UGenNode,
  ControlName,
} from "@synthdef/graph/types.ts";
import type { SynthDefData } from "@synthdef/graph/builder.ts";
import { compileSynthDef } from "@synthdef/graph/compiler.ts";
import type { CompiledSynthDef } from "@synthdef/graph/compiler.ts";
import { encodeSynthDef } from "@synthdef/binary/encoder.ts";
import { perc, adsr, asr, linen, env } from "@synthdef/ugens/envelope.ts";

// ─── Binary operator special indices (matching SuperCollider) ─────────────────

const BINOP_INDEX: Record<string, number> = {
  Add: 0,
  Sub: 1,
  Mul: 2,
  Div: 4,
};

const UNARYOP_INDEX: Record<string, number> = {
  Neg: 0,
  Abs: 5,
  MidiCps: 17,
  CpsMidi: 18,
};

// ─── Rate resolution ──────────────────────────────────────────────────────────

function rateFromString(s: string): Rate {
  switch (s) {
    case "audio":
      return Rate.Audio;
    case "control":
      return Rate.Control;
    case "scalar":
      return Rate.Scalar;
    case "demand":
      return Rate.Demand;
    default:
      return Rate.Audio;
  }
}

function paramRateFromString(s: string): ParameterRate {
  switch (s) {
    case "scalar":
      return ParameterRate.Scalar;
    case "control":
      return ParameterRate.Control;
    case "trigger":
      return ParameterRate.Trigger;
    case "audio":
      return ParameterRate.Audio;
    default:
      return ParameterRate.Control;
  }
}

// ─── Topological sort ─────────────────────────────────────────────────────────

function topoSort(
  nodes: AbstractNode[],
  connections: IConnection[]
): AbstractNode[] {
  const inDegree = new Map<string, number>();
  const adj = new Map<string, Set<string>>();
  const nodeById = new Map<string, AbstractNode>();

  for (const node of nodes) {
    inDegree.set(node.id, 0);
    adj.set(node.id, new Set());
    nodeById.set(node.id, node);
  }

  for (const conn of connections) {
    const fromNodeId = conn.from.nodeId;
    const toNodeId = conn.to.nodeId;
    if (fromNodeId !== toNodeId) {
      const s = adj.get(fromNodeId);
      if (s && !s.has(toNodeId)) {
        s.add(toNodeId);
        inDegree.set(toNodeId, (inDegree.get(toNodeId) ?? 0) + 1);
      }
    }
  }

  const queue: string[] = [];
  for (const [id, deg] of inDegree) {
    if (deg === 0) queue.push(id);
  }

  const sorted: AbstractNode[] = [];
  while (queue.length > 0) {
    const id = queue.shift()!;
    const node = nodeById.get(id);
    if (node) sorted.push(node);

    for (const neighbor of adj.get(id) ?? []) {
      const d = (inDegree.get(neighbor) ?? 1) - 1;
      inDegree.set(neighbor, d);
      if (d === 0) queue.push(neighbor);
    }
  }

  return sorted;
}

// ─── Main compiler ────────────────────────────────────────────────────────────

/**
 * Input interface key names that are NOT UGen signal inputs
 * (they are config selectors).
 */
const NON_SIGNAL_INPUTS = new Set([
  "rate",
  "envShape",
  "doneAction",
  "name",
]);

/**
 * For a given Baklava node, return the list of UGen input parameter keys
 * in the order SuperCollider expects them.
 */
function getUGenInputKeys(nodeType: string): string[] {
  switch (nodeType) {
    // Oscillators
    case "SinOsc":
      return ["freq", "phase"];
    case "Saw":
      return ["freq"];
    case "Pulse":
      return ["freq", "width"];
    case "WhiteNoise":
    case "PinkNoise":
      return [];
    case "LFNoise0":
    case "LFNoise1":
    case "LFNoise2":
      return ["freq"];
    case "Dust":
      return ["density"];
    case "Impulse":
      return ["freq", "phase"];
    // Filters
    case "LPF":
    case "HPF":
      return ["in", "freq"];
    case "BPF":
    case "RLPF":
      return ["in", "freq", "rq"];
    // Effects
    case "FreeVerb":
      return ["in", "mix", "room", "damp"];
    case "CombC":
    case "AllpassC":
      return ["in", "maxdelaytime", "delaytime", "decaytime"];
    // I/O
    case "Out":
      return ["bus", "in"];
    // Math (binary ops)
    case "BinaryOpUGen_Mul":
    case "BinaryOpUGen_Add":
    case "BinaryOpUGen_Sub":
    case "BinaryOpUGen_Div":
      return ["a", "b"];
    case "MulAdd":
      return ["in", "mul", "add"];
    // Math (unary ops)
    case "UnaryOpUGen_Abs":
    case "UnaryOpUGen_Neg":
    case "UnaryOpUGen_MidiCps":
    case "UnaryOpUGen_CpsMidi":
      return ["in"];
    // Control
    case "Line":
    case "XLine":
      return ["start", "end", "dur"];
    case "Pan2":
      return ["in", "pos", "level"];
    default:
      return [];
  }
}

function getNumOutputs(nodeType: string): number {
  if (nodeType === "Out") return 0;
  if (nodeType === "Pan2") return 2;
  return 1;
}

function getScUGenName(nodeType: string): string {
  if (nodeType.startsWith("BinaryOpUGen_")) return "BinaryOpUGen";
  if (nodeType.startsWith("UnaryOpUGen_")) return "UnaryOpUGen";
  return nodeType;
}

function getSpecialIndex(nodeType: string): number {
  if (nodeType.startsWith("BinaryOpUGen_")) {
    const op = nodeType.replace("BinaryOpUGen_", "");
    return BINOP_INDEX[op] ?? 0;
  }
  if (nodeType.startsWith("UnaryOpUGen_")) {
    const op = nodeType.replace("UnaryOpUGen_", "");
    return UNARYOP_INDEX[op] ?? 0;
  }
  return 0;
}

function resolveRate(
  node: AbstractNode,
  nodeType: string,
  inputs: UGenInput[]
): Rate {
  // FreeVerb is always audio-rate
  if (nodeType === "FreeVerb") return Rate.Audio;
  // Out inherits from its signal input
  if (nodeType === "Out") return Rate.Audio;

  // If the node has a rate selector, use it
  const rateIntf = node.inputs.rate;
  if (rateIntf) {
    return rateFromString(rateIntf.value as string);
  }

  // For binary/unary ops and MulAdd: use the max rate of inputs
  let maxRate = Rate.Scalar;
  for (const inp of inputs) {
    if (typeof inp !== "number") {
      if (inp.rate > maxRate) maxRate = inp.rate;
    }
  }
  return maxRate === Rate.Scalar ? Rate.Control : maxRate;
}

function parseDoneAction(value: string): number {
  const match = value.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export interface CompileResult {
  binary: Uint8Array;
  compiled: CompiledSynthDef;
}

export function compileGraph(
  graph: Graph,
  synthDefName: string
): CompileResult {
  const nodes = Array.from(graph.nodes);
  const connections = Array.from(graph.connections);

  // Separate Param nodes from UGen nodes
  const paramNodes = nodes.filter((n) => n.type === "Param");
  const ugenNodes = nodes.filter((n) => n.type !== "Param");

  // Build connection lookup: target interface ID → source interface
  const connByTarget = new Map<
    string,
    { fromNode: AbstractNode; fromInterfaceKey: string }
  >();
  for (const conn of connections) {
    connByTarget.set(conn.to.id, {
      fromNode: nodes.find((n) => n.id === conn.from.nodeId)!,
      fromInterfaceKey: findInterfaceKey(
        nodes.find((n) => n.id === conn.from.nodeId)!,
        conn.from.id,
        "output"
      ),
    });
  }

  // ── Build Param controls ────────────────────────────────────────────────
  const controlNames: ControlName[] = [];
  const paramValues: number[] = [];
  const allUGenNodes: UGenNode[] = [];
  let nextId = 0;

  // Group params by rate (matching SC order: scalar, trigger, audio, control)
  const paramGroups: [ParameterRate, string, Rate][] = [
    [ParameterRate.Scalar, "Control", Rate.Scalar],
    [ParameterRate.Trigger, "TrigControl", Rate.Control],
    [ParameterRate.Audio, "AudioControl", Rate.Audio],
    [ParameterRate.Control, "Control", Rate.Control],
  ];

  // Map from Baklava param node ID → UGenOutput
  const paramOutputMap = new Map<string, UGenOutput>();

  let controlIndex = 0;
  for (const [pRate, ugenName, ugenRate] of paramGroups) {
    const group = paramNodes.filter(
      (n) =>
        paramRateFromString(n.inputs.rate?.value as string ?? "control") ===
        pRate
    );
    if (group.length === 0) continue;

    const values: number[] = [];
    for (const pNode of group) {
      values.push(pNode.inputs.defaultValue?.value as number ?? 0);
    }

    // Create the Control UGen
    const controlNode: UGenNode = {
      id: nextId++,
      name: ugenName,
      rate: ugenRate,
      specialIndex: controlIndex,
      inputs: [],
      outputs: [],
    };
    const outputs: UGenOutput[] = [];
    for (let i = 0; i < values.length; i++) {
      outputs.push({ ugen: controlNode, outputIndex: i, rate: ugenRate });
    }
    controlNode.outputs = outputs;
    allUGenNodes.push(controlNode);

    let offset = 0;
    for (const pNode of group) {
      const pName = (pNode.inputs.name?.value as string) || "param";
      const pDefault = (pNode.inputs.defaultValue?.value as number) ?? 0;

      controlNames.push({
        name: pName,
        index: controlIndex + offset,
        rate: pRate,
        defaultValue: pDefault,
      });
      paramValues.push(pDefault);
      paramOutputMap.set(pNode.id, outputs[offset]);
      offset += 1;
    }

    controlIndex += values.length;
  }

  // ── Topological sort of UGen nodes ──────────────────────────────────────
  const sorted = topoSort(ugenNodes, connections);

  // Map from Baklava node ID → UGenNode (for resolving connections)
  const nodeUGenMap = new Map<string, UGenNode>();

  for (const bNode of sorted) {
    const nodeType = bNode.type;
    const inputKeys = getUGenInputKeys(nodeType);
    const numOutputs = getNumOutputs(nodeType);
    const scName = getScUGenName(nodeType);
    const specialIndex = getSpecialIndex(nodeType);

    // Resolve inputs
    const ugenInputs: UGenInput[] = [];
    for (const key of inputKeys) {
      const intf = bNode.inputs[key];
      if (!intf) {
        ugenInputs.push(0);
        continue;
      }

      // Check if this input is connected
      const conn = connByTarget.get(intf.id);
      if (conn) {
        // Is it connected to a Param node?
        if (conn.fromNode.type === "Param") {
          const paramOut = paramOutputMap.get(conn.fromNode.id);
          if (paramOut) {
            ugenInputs.push(paramOut);
          } else {
            ugenInputs.push(0);
          }
        } else {
          // Connected to another UGen
          const sourceUGen = nodeUGenMap.get(conn.fromNode.id);
          if (sourceUGen) {
            const outIdx = getOutputIndex(conn.fromNode, conn.fromInterfaceKey);
            ugenInputs.push(sourceUGen.outputs[outIdx]);
          } else {
            ugenInputs.push(0);
          }
        }
      } else {
        // Not connected: use the literal value
        ugenInputs.push(intf.value as number);
      }
    }

    // Handle EnvGen specially: append envelope data as inputs
    if (nodeType === "EnvGen") {
      const envShape = (bNode.inputs.envShape?.value as string) ?? "perc";
      const attack = (bNode.inputs.attack?.value as number) ?? 0.01;
      const decay = (bNode.inputs.decay?.value as number) ?? 0.3;
      const sustain = (bNode.inputs.sustain?.value as number) ?? 0.5;
      const release = (bNode.inputs.release?.value as number) ?? 1;
      const level = (bNode.inputs.level?.value as number) ?? 1;
      const doneActionStr =
        (bNode.inputs.doneAction?.value as string) ?? "2 (free)";
      const doneAction = parseDoneAction(doneActionStr);

      let envData: number[];
      switch (envShape) {
        case "perc":
          envData = perc({ attack, release, level });
          break;
        case "adsr":
          envData = adsr({ attack, decay, sustain, release, peak: level });
          break;
        case "asr":
          envData = asr({ attack, sustain, release });
          break;
        case "linen":
          envData = linen({ attack, sustain, release, level });
          break;
        case "triangle":
          envData = env({
            levels: [0, level, 0],
            times: [release / 2, release / 2],
            curves: ["lin"],
          });
          break;
        default:
          envData = perc({ attack, release, level });
      }

      // Resolve gate input
      const gateIntf = bNode.inputs.gate;
      let gateInput: UGenInput = 1;
      if (gateIntf) {
        const gateConn = connByTarget.get(gateIntf.id);
        if (gateConn) {
          if (gateConn.fromNode.type === "Param") {
            const paramOut = paramOutputMap.get(gateConn.fromNode.id);
            if (paramOut) gateInput = paramOut;
          } else {
            const sourceUGen = nodeUGenMap.get(gateConn.fromNode.id);
            if (sourceUGen) {
              const outIdx = getOutputIndex(
                gateConn.fromNode,
                gateConn.fromInterfaceKey
              );
              gateInput = sourceUGen.outputs[outIdx];
            }
          }
        } else {
          gateInput = gateIntf.value as number;
        }
      }

      // EnvGen inputs: gate, levelScale, levelBias, timeScale, doneAction, ...envelope
      ugenInputs.length = 0;
      ugenInputs.push(gateInput); // gate
      ugenInputs.push(1); // levelScale
      ugenInputs.push(0); // levelBias
      ugenInputs.push(1); // timeScale
      ugenInputs.push(doneAction); // doneAction
      ugenInputs.push(...envData);
    }

    // Handle Line/XLine doneAction
    if (nodeType === "Line" || nodeType === "XLine") {
      const daStr =
        (bNode.inputs.doneAction?.value as string) ?? "0 (none)";
      ugenInputs.push(parseDoneAction(daStr));
    }

    const rate = resolveRate(bNode, nodeType, ugenInputs);

    const ugenNode: UGenNode = {
      id: nextId++,
      name: scName,
      rate,
      specialIndex,
      inputs: ugenInputs,
      outputs: [],
    };

    const outputs: UGenOutput[] = [];
    for (let i = 0; i < numOutputs; i++) {
      outputs.push({ ugen: ugenNode, outputIndex: i, rate });
    }
    ugenNode.outputs = outputs;
    allUGenNodes.push(ugenNode);
    nodeUGenMap.set(bNode.id, ugenNode);
  }

  const synthDefData: SynthDefData = {
    name: synthDefName,
    ugens: allUGenNodes,
    controlNames,
    paramValues,
    variants: new Map(),
  };

  // ── Compile & encode using the main library ────────────────────────────
  const compiled = compileSynthDef(synthDefData);
  const binary = encodeSynthDef(compiled);

  return { binary, compiled };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function findInterfaceKey(
  node: AbstractNode,
  interfaceId: string,
  direction: "input" | "output"
): string {
  const interfaces =
    direction === "input" ? node.inputs : node.outputs;
  for (const [key, intf] of Object.entries(interfaces)) {
    if (intf.id === interfaceId) return key;
  }
  return "";
}

function getOutputIndex(node: AbstractNode, key: string): number {
  const keys = Object.keys(node.outputs);
  return keys.indexOf(key);
}
