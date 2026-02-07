/**
 * Generates TypeScript synthdef code from the node-editor graph.
 * Produces code using the synthdefTS library API (synthDef, kr, SinOsc.ar, etc.)
 */

import type {
  NodeEditorGraphConnection as IConnection,
  NodeEditorGraphModel as Graph,
  NodeEditorGraphNode as AbstractNode,
} from "../nodeEditor/graphTypes";

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

function getOutputKey(node: AbstractNode, key: string): string {
  const keys = Object.keys(node.outputs);
  const idx = keys.indexOf(key);
  if (idx === 0 && keys.length === 1) return "";
  // For multi-output like Pan2 (left, right), return [0] / [1]
  return `[${idx}]`;
}

// Map node type → human-readable variable name prefix
function varPrefix(nodeType: string): string {
  switch (nodeType) {
    case "SinOsc":
      return "sinOsc";
    case "Saw":
      return "saw";
    case "Pulse":
      return "pulse";
    case "WhiteNoise":
      return "whiteNoise";
    case "PinkNoise":
      return "pinkNoise";
    case "LFNoise0":
      return "lfNoise0";
    case "LFNoise1":
      return "lfNoise1";
    case "LFNoise2":
      return "lfNoise2";
    case "Dust":
      return "dust";
    case "Impulse":
      return "impulse";
    case "LPF":
      return "lpf";
    case "HPF":
      return "hpf";
    case "BPF":
      return "bpf";
    case "RLPF":
      return "rlpf";
    case "EnvGen":
      return "envGen";
    case "FreeVerb":
      return "freeVerb";
    case "CombC":
      return "combC";
    case "AllpassC":
      return "allpassC";
    case "BinaryOpUGen_Mul":
      return "mul";
    case "BinaryOpUGen_Add":
      return "add";
    case "BinaryOpUGen_Sub":
      return "sub";
    case "BinaryOpUGen_Div":
      return "div";
    case "MulAdd":
      return "mulAdd";
    case "UnaryOpUGen_Abs":
      return "abs";
    case "UnaryOpUGen_Neg":
      return "neg";
    case "UnaryOpUGen_MidiCps":
      return "freq";
    case "UnaryOpUGen_CpsMidi":
      return "midi";
    case "Line":
      return "line";
    case "XLine":
      return "xLine";
    case "Pan2":
      return "panned";
    default:
      return "sig";
  }
}

// Get the function call for a binary/unary op
function opFunctionName(nodeType: string): string | null {
  switch (nodeType) {
    case "BinaryOpUGen_Mul":
      return "mul";
    case "BinaryOpUGen_Add":
      return "add";
    case "BinaryOpUGen_Sub":
      return "sub";
    case "BinaryOpUGen_Div":
      return "div";
    case "UnaryOpUGen_Abs":
      return "abs";
    case "UnaryOpUGen_Neg":
      return "neg";
    case "UnaryOpUGen_MidiCps":
      return "midicps";
    case "UnaryOpUGen_CpsMidi":
      return "cpsmidi";
    default:
      return null;
  }
}

function parseDoneAction(value: string): number {
  const match = value.match(/^(\d+)/);
  return match?.[1] ? parseInt(match[1], 10) : 0;
}

// Which input keys for a given node type (for code generation)
function getNodeInputKeys(nodeType: string): string[] {
  switch (nodeType) {
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
    case "LPF":
    case "HPF":
      return ["in", "freq"];
    case "BPF":
    case "RLPF":
      return ["in", "freq", "rq"];
    case "FreeVerb":
      return ["in", "mix", "room", "damp"];
    case "CombC":
    case "AllpassC":
      return ["in", "maxdelaytime", "delaytime", "decaytime"];
    case "Line":
    case "XLine":
      return ["start", "end", "dur"];
    case "Pan2":
      return ["in", "pos", "level"];
    case "BinaryOpUGen_Mul":
    case "BinaryOpUGen_Add":
    case "BinaryOpUGen_Sub":
    case "BinaryOpUGen_Div":
      return ["a", "b"];
    case "MulAdd":
      return ["in", "mul", "add"];
    case "UnaryOpUGen_Abs":
    case "UnaryOpUGen_Neg":
    case "UnaryOpUGen_MidiCps":
    case "UnaryOpUGen_CpsMidi":
      return ["in"];
    case "Out":
      return ["bus", "in"];
    default:
      return [];
  }
}

// ─── Main code generator ──────────────────────────────────────────────────────

export function generateTypeScript(
  graph: Graph,
  synthDefName: string
): string {
  const nodes = Array.from(graph.nodes);
  const connections = Array.from(graph.connections);

  const paramNodes = nodes.filter((n) => n.type === "Param");
  const ugenNodes = nodes.filter((n) => n.type !== "Param");

  // Build connection lookup: target interface ID → source info
  const connByTarget = new Map<
    string,
    { fromNode: AbstractNode; fromInterfaceKey: string }
  >();
  for (const conn of connections) {
    const fromNode = nodes.find((n) => n.id === conn.from.nodeId)!;
    connByTarget.set(conn.to.id, {
      fromNode,
      fromInterfaceKey: findInterfaceKey(fromNode, conn.from.id, "output"),
    });
  }

  // ── Collect imports ─────────────────────────────────────────────────────
  const ugenImports = new Set<string>();
  const opsImports = new Set<string>();
  const builderImports = new Set<string>(["synthDef"]);

  // Check what param rate helpers are needed
  const paramRates = new Set(
    paramNodes.map((n) => (n.inputs.rate?.value as string) ?? "control")
  );
  if (paramRates.has("control")) builderImports.add("kr");
  if (paramRates.has("scalar")) builderImports.add("ir");
  if (paramRates.has("trigger")) builderImports.add("tr");
  if (paramRates.has("audio")) builderImports.add("ar");

  for (const node of ugenNodes) {
    const opFn = opFunctionName(node.type);
    if (opFn) {
      opsImports.add(opFn);
    } else if (node.type === "MulAdd") {
      // MulAdd generates mul + add ops
      opsImports.add("mul");
      opsImports.add("add");
    } else if (node.type !== "Out") {
      ugenImports.add(node.type.replace(/^(BinaryOpUGen_|UnaryOpUGen_)/, ""));
    }
    if (node.type === "Out") ugenImports.add("Out");
    if (node.type === "EnvGen") {
      ugenImports.add("EnvGen");
    }
  }

  // Check if we need envelope helpers
  const hasEnvGen = ugenNodes.some((n) => n.type === "EnvGen");
  const envShapes = new Set(
    ugenNodes
      .filter((n) => n.type === "EnvGen")
      .map((n) => (n.inputs.envShape?.value as string) ?? "perc")
  );

  const envHelperImports = new Set<string>();
  for (const shape of envShapes) {
    envHelperImports.add(shape);
  }

  // ── Generate param definitions ──────────────────────────────────────────
  const paramLines: string[] = [];
  const paramVarMap = new Map<string, string>(); // node id → "p.paramName"

  for (const pNode of paramNodes) {
    const pName = (pNode.inputs.name?.value as string) || "param";
    const pDefault = (pNode.inputs.defaultValue?.value as number) ?? 0;
    const pRate = (pNode.inputs.rate?.value as string) ?? "control";

    const rateFn =
      pRate === "scalar"
        ? "ir"
        : pRate === "trigger"
          ? "tr"
          : pRate === "audio"
            ? "ar"
            : "kr";
    paramLines.push(`    ${pName}: ${rateFn}(${pDefault}),`);
    paramVarMap.set(pNode.id, `p.${pName}`);
  }

  // ── Generate variable names for each UGen node ──────────────────────────
  const sorted = topoSort(ugenNodes, connections);
  const varNames = new Map<string, string>(); // node id → variable name
  const varCounts = new Map<string, number>();

  for (const node of sorted) {
    const prefix = varPrefix(node.type);
    const count = (varCounts.get(prefix) ?? 0) + 1;
    varCounts.set(prefix, count);
    const name = count === 1 ? prefix : `${prefix}${count}`;
    varNames.set(node.id, name);
  }

  // ── Resolve an input value to a code expression ─────────────────────────
  function resolveInput(
    node: AbstractNode,
    inputKey: string
  ): string {
    const intf = node.inputs[inputKey];
    if (!intf) return "0";

    const conn = connByTarget.get(intf.id);
    if (conn) {
      if (conn.fromNode.type === "Param") {
        return paramVarMap.get(conn.fromNode.id) ?? "0";
      }
      const srcVar = varNames.get(conn.fromNode.id) ?? "sig";
      const outSuffix = getOutputKey(conn.fromNode, conn.fromInterfaceKey);
      return `${srcVar}${outSuffix}`;
    }

    return String(intf.value);
  }

  // ── Generate graph body ─────────────────────────────────────────────────
  const bodyLines: string[] = [];

  for (const node of sorted) {
    const vName = varNames.get(node.id)!;
    const nodeType = node.type;
    const opFn = opFunctionName(nodeType);

    if (opFn) {
      // Binary/unary op
      const keys = getNodeInputKeys(nodeType);
      if (keys.length === 2) {
        const a = resolveInput(node, keys[0]!);
        const b = resolveInput(node, keys[1]!);
        bodyLines.push(`    const ${vName} = ${opFn}(${a}, ${b});`);
      } else if (keys.length === 1) {
        const a = resolveInput(node, keys[0]!);
        bodyLines.push(`    const ${vName} = ${opFn}(${a});`);
      }
    } else if (nodeType === "MulAdd") {
      const inp = resolveInput(node, "in");
      const m = resolveInput(node, "mul");
      const a = resolveInput(node, "add");
      bodyLines.push(
        `    const ${vName} = add(mul(${inp}, ${m}), ${a});`
      );
    } else if (nodeType === "EnvGen") {
      const envShape = (node.inputs.envShape?.value as string) ?? "perc";
      const rate = (node.inputs.rate?.value as string) ?? "audio";
      const rateSuffix = rate === "control" ? "kr" : "ar";
      const doneActionStr =
        (node.inputs.doneAction?.value as string) ?? "2 (free)";
      const doneAction = parseDoneAction(doneActionStr);

      // Build envelope call args
      let envCall: string;
      const attack = resolveInput(node, "attack");
      const decay = resolveInput(node, "decay");
      const sustain = resolveInput(node, "sustain");
      const release = resolveInput(node, "release");
      const level = resolveInput(node, "level");

      switch (envShape) {
        case "perc":
          envCall = `perc({ attack: ${attack}, release: ${release}, level: ${level} })`;
          break;
        case "adsr":
          envCall = `adsr({ attack: ${attack}, decay: ${decay}, sustain: ${sustain}, release: ${release}, peak: ${level} })`;
          break;
        case "asr":
          envCall = `asr({ attack: ${attack}, sustain: ${sustain}, release: ${release} })`;
          break;
        case "linen":
          envCall = `linen({ attack: ${attack}, sustain: ${sustain}, release: ${release}, level: ${level} })`;
          break;
        case "triangle":
          envCall = `perc({ attack: ${release}, release: ${release}, level: ${level} })`;
          break;
        default:
          envCall = `perc()`;
      }

      const gate = resolveInput(node, "gate");
      const gateArg = gate !== "1" ? `, gate: ${gate}` : "";
      const daArg = doneAction !== 0 ? `, doneAction: ${doneAction}` : "";

      bodyLines.push(
        `    const ${vName} = EnvGen.${rateSuffix}({ envelope: ${envCall}${gateArg}${daArg} });`
      );
    } else if (nodeType === "Out") {
      const bus = resolveInput(node, "bus");
      const inp = resolveInput(node, "in");
      bodyLines.push(
        `    Out.ar({ bus: ${bus}, channelsArray: ${inp} });`
      );
    } else if (nodeType === "Pan2") {
      const rate = (node.inputs.rate?.value as string) ?? "audio";
      const rateSuffix = rate === "control" ? "kr" : "ar";
      const keys = getNodeInputKeys(nodeType);
      const args = keys
        .map((k) => {
          const v = resolveInput(node, k);
          return `${k === "in" ? "in" : k}: ${v}`;
        })
        .join(", ");
      bodyLines.push(
        `    const ${vName} = ${nodeType}.${rateSuffix}({ ${args} });`
      );
    } else {
      // Standard UGen call
      const rate = (node.inputs.rate?.value as string) ?? "audio";
      const rateSuffix = rate === "control" ? "kr" : "ar";
      const keys = getNodeInputKeys(nodeType);
      const scName = nodeType;

      if (keys.length === 0) {
        // No-arg UGens like WhiteNoise
        bodyLines.push(
          `    const ${vName} = ${scName}.${rateSuffix}();`
        );
      } else {
        const args = keys
          .map((k) => {
            const v = resolveInput(node, k);
            const paramName = k === "in" ? "in" : k;
            return `${paramName}: ${v}`;
          })
          .join(", ");
        bodyLines.push(
          `    const ${vName} = ${scName}.${rateSuffix}({ ${args} });`
        );
      }
    }
  }

  // ── Assemble final code ─────────────────────────────────────────────────
  const lines: string[] = [];

  // Imports
  lines.push(
    `import { ${Array.from(builderImports).join(", ")} } from "../src/graph/builder.ts";`
  );
  if (ugenImports.size > 0) {
    lines.push(
      `import { ${Array.from(ugenImports).sort().join(", ")} } from "../src/ugens/generated.ts";`
    );
  }
  if (opsImports.size > 0) {
    lines.push(
      `import { ${Array.from(opsImports).sort().join(", ")} } from "../src/ugens/ops.ts";`
    );
  }
  if (hasEnvGen && envHelperImports.size > 0) {
    lines.push(
      `import { ${Array.from(envHelperImports).sort().join(", ")} } from "../src/ugens/envelope.ts";`
    );
  }

  lines.push("");

  // SynthDef
  if (paramNodes.length > 0) {
    lines.push(`const ${camelCase(synthDefName)} = synthDef(`);
    lines.push(`  "${synthDefName}",`);
    lines.push(`  {`);
    for (const line of paramLines) {
      lines.push(line);
    }
    lines.push(`  },`);
    lines.push(`  (p) => {`);
    for (const line of bodyLines) {
      lines.push(line);
    }
    lines.push(`  },`);
    lines.push(`);`);
  } else {
    lines.push(`const ${camelCase(synthDefName)} = synthDef(`);
    lines.push(`  "${synthDefName}",`);
    lines.push(`  () => {`);
    for (const line of bodyLines) {
      lines.push(line);
    }
    lines.push(`  },`);
    lines.push(`);`);
  }

  lines.push("");

  return lines.join("\n");
}

function camelCase(s: string): string {
  return s
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^[A-Z]/, (c) => c.toLowerCase());
}
