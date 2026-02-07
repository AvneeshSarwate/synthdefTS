import type {
  NodeEditorGraphModel,
  NodeEditorGraphState,
} from "./graphTypes";

/**
 * Serializable node data for agent snapshot
 */
export interface SerializedNode {
  id: string;
  type: string;
  title: string;
  position: { x: number; y: number };
  inputs: Record<string, unknown>;
  outputs: string[];
}

/**
 * Serializable connection data for agent snapshot
 */
export interface SerializedConnection {
  id: string;
  from: { nodeId: string; port: string };
  to: { nodeId: string; port: string };
}

/**
 * Complete serializable state for agent snapshot
 */
export interface NodeEditorStateSnapshot extends Record<string, unknown> {
  synthDefName: string;
  nodes: SerializedNode[];
  connections: SerializedConnection[];
  paramCount: number;
  ugenCount: number;
}

export const NODE_EDITOR_FULL_STATE_VERSION = 2;

/**
 * Full serializable state for the node editor.
 */
export interface NodeEditorFullState {
  synthDefName: string;
  graphState: NodeEditorGraphState;
  version: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parsePosition(value: unknown, path: string): { x: number; y: number } {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  if (typeof value.x !== "number" || typeof value.y !== "number") {
    throw new Error(`Invalid ${path}: expected numeric x/y`);
  }
  return { x: value.x, y: value.y };
}

function parseGraphStateNode(value: unknown): NodeEditorGraphState["nodes"][number] {
  if (!isRecord(value)) {
    throw new Error("Invalid graphState.nodes[]: expected object");
  }
  if (typeof value.id !== "string") {
    throw new Error("Invalid graphState.nodes[].id: expected string");
  }
  if (typeof value.type !== "string") {
    throw new Error("Invalid graphState.nodes[].type: expected string");
  }
  if (!isRecord(value.inputs)) {
    throw new Error("Invalid graphState.nodes[].inputs: expected object");
  }

  const inputIds: Record<string, string> | undefined = isRecord(value.inputIds)
    ? Object.fromEntries(
        Object.entries(value.inputIds)
          .filter((entry): entry is [string, string] => typeof entry[1] === "string")
      )
    : undefined;

  const outputIds: Record<string, string> | undefined = isRecord(value.outputIds)
    ? Object.fromEntries(
        Object.entries(value.outputIds)
          .filter((entry): entry is [string, string] => typeof entry[1] === "string")
      )
    : undefined;

  return {
    id: value.id,
    type: value.type,
    title: typeof value.title === "string" ? value.title : undefined,
    position: parsePosition(value.position, "graphState.nodes[].position"),
    inputs: { ...value.inputs },
    inputIds,
    outputIds,
  };
}

function parseGraphStateConnection(
  value: unknown
): NodeEditorGraphState["connections"][number] {
  if (!isRecord(value)) {
    throw new Error("Invalid graphState.connections[]: expected object");
  }
  if (!isRecord(value.from) || !isRecord(value.to)) {
    throw new Error("Invalid graphState.connections[]: expected from/to objects");
  }
  if (typeof value.from.nodeId !== "string" || typeof value.from.port !== "string") {
    throw new Error("Invalid graphState.connections[].from: expected nodeId/port strings");
  }
  if (typeof value.to.nodeId !== "string" || typeof value.to.port !== "string") {
    throw new Error("Invalid graphState.connections[].to: expected nodeId/port strings");
  }

  return {
    id: typeof value.id === "string" ? value.id : undefined,
    from: {
      nodeId: value.from.nodeId,
      port: value.from.port,
    },
    to: {
      nodeId: value.to.nodeId,
      port: value.to.port,
    },
  };
}

function parseGraphState(value: unknown): NodeEditorGraphState {
  if (!isRecord(value)) {
    throw new Error("Invalid graphState: expected object");
  }
  if (!Array.isArray(value.nodes)) {
    throw new Error("Invalid graphState.nodes: expected array");
  }
  if (!Array.isArray(value.connections)) {
    throw new Error("Invalid graphState.connections: expected array");
  }

  const viewport = isRecord(value.viewport)
    ? {
        x: typeof value.viewport.x === "number" ? value.viewport.x : 0,
        y: typeof value.viewport.y === "number" ? value.viewport.y : 0,
        k: typeof value.viewport.k === "number" ? value.viewport.k : 1,
      }
    : undefined;

  return {
    nodes: value.nodes.map(parseGraphStateNode),
    connections: value.connections.map(parseGraphStateConnection),
    viewport,
  };
}

/**
 * Parse and validate unknown JSON into a NodeEditorFullState.
 */
export function parseFullState(value: unknown): NodeEditorFullState {
  if (!isRecord(value)) {
    throw new Error("Invalid full state: expected object");
  }
  if (!("graphState" in value)) {
    throw new Error("Invalid full state: missing graphState");
  }

  const synthDefName =
    typeof value.synthDefName === "string" && value.synthDefName.trim().length > 0
      ? value.synthDefName
      : "mySynthDef";

  const version =
    typeof value.version === "number"
      ? value.version
      : NODE_EDITOR_FULL_STATE_VERSION;

  if (version !== NODE_EDITOR_FULL_STATE_VERSION) {
    throw new Error(
      `Unsupported full state version: ${version}. Expected version ${NODE_EDITOR_FULL_STATE_VERSION}.`
    );
  }

  return {
    synthDefName,
    graphState: parseGraphState(value.graphState),
    version,
  };
}

/**
 * Capture full editor state (name + graph state).
 */
export function captureFullState(
  graphState: NodeEditorGraphState,
  synthDefName: string
): NodeEditorFullState {
  return {
    synthDefName,
    graphState: parseGraphState(graphState),
    version: NODE_EDITOR_FULL_STATE_VERSION,
  };
}

/**
 * Capture the current node editor state as a serializable snapshot.
 * This is used by the agent snapshot infrastructure for the agentic UI improvement loop.
 */
export function captureNodeEditorState(
  graph: NodeEditorGraphModel,
  synthDefName: string
): NodeEditorStateSnapshot {
  const nodes: SerializedNode[] = [];
  const connections: SerializedConnection[] = [];

  let paramCount = 0;
  let ugenCount = 0;

  for (const node of graph.nodes) {
    const inputs: Record<string, unknown> = {};
    for (const [key, input] of Object.entries(node.inputs)) {
      inputs[key] = input.value;
    }

    const outputs: string[] = [];
    for (const key of Object.keys(node.outputs)) {
      outputs.push(key);
    }

    nodes.push({
      id: node.id,
      type: node.type,
      title: node.title,
      position: { x: node.position.x, y: node.position.y },
      inputs,
      outputs,
    });

    if (node.type === "Param") {
      paramCount++;
    } else if (node.type === "Out") {
      // Out is a special node, not a UGen
    } else {
      ugenCount++;
    }
  }

  for (const conn of graph.connections) {
    connections.push({
      id: conn.id,
      from: {
        nodeId: conn.from.nodeId,
        port: conn.from.name,
      },
      to: {
        nodeId: conn.to.nodeId,
        port: conn.to.name,
      },
    });
  }

  return {
    synthDefName,
    nodes,
    connections,
    paramCount,
    ugenCount,
  };
}

/**
 * Component snapshot for agent capture infrastructure
 */
export interface NodeEditorComponentSnapshot {
  name: string;
  tagName: string;
  state: NodeEditorStateSnapshot;
  boundingBox: { x: number; y: number; width: number; height: number };
}
