export interface NodeEditorGraphPortInput {
  id: string;
  value: unknown;
}

export interface NodeEditorGraphPortOutput {
  id: string;
}

export interface NodeEditorGraphNode {
  id: string;
  type: string;
  title: string;
  position: { x: number; y: number };
  inputs: Record<string, NodeEditorGraphPortInput>;
  outputs: Record<string, NodeEditorGraphPortOutput>;
}

export interface NodeEditorGraphConnection {
  id: string;
  from: { nodeId: string; id: string; name: string };
  to: { nodeId: string; id: string; name: string };
}

export interface NodeEditorGraphModel {
  nodes: NodeEditorGraphNode[];
  connections: NodeEditorGraphConnection[];
}

export interface NodeEditorGraphStateNode {
  id: string;
  type: string;
  title?: string;
  position: { x: number; y: number };
  inputs: Record<string, unknown>;
  inputIds?: Record<string, string>;
  outputIds?: Record<string, string>;
}

export interface NodeEditorGraphStateConnection {
  id?: string;
  from: { nodeId: string; port: string };
  to: { nodeId: string; port: string };
}

export interface NodeEditorGraphViewport {
  x: number;
  y: number;
  k: number;
}

export interface NodeEditorGraphState {
  nodes: NodeEditorGraphStateNode[];
  connections: NodeEditorGraphStateConnection[];
  viewport?: NodeEditorGraphViewport;
}
