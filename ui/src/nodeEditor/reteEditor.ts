import { ClassicPreset, NodeEditor, type GetSchemes } from "rete";
import {
  AreaExtensions,
  AreaPlugin,
} from "rete-area-plugin";
import {
  ConnectionPlugin,
  Presets as ConnectionPresets,
} from "rete-connection-plugin";
import {
  Presets as VuePresets,
  VuePlugin,
  type VueArea2D,
} from "rete-vue-plugin";
import type {
  NodeEditorGraphConnection,
  NodeEditorGraphModel,
  NodeEditorGraphPortInput,
  NodeEditorGraphPortOutput,
  NodeEditorGraphState,
  NodeEditorGraphStateConnection,
  NodeEditorGraphStateNode,
} from "./graphTypes";
import ReteConnection from "./ReteConnection.vue";
import ReteSelectControl from "./ReteSelectControl.vue";
import ReteNode from "./ReteNode.vue";
import ReteSocket from "./ReteSocket.vue";

interface NodeInputSpec {
  key: string;
  label: string;
  kind: "number" | "text" | "select";
  defaultValue: number | string;
  options?: string[];
  port?: boolean;
}

interface NodeOutputSpec {
  key: string;
  label: string;
  multipleConnections?: boolean;
}

interface NodeTypeSpec {
  category: string;
  type: string;
  title: string;
  inputs: NodeInputSpec[];
  outputs: NodeOutputSpec[];
}

interface AddNodeOptions {
  id?: string;
  title?: string;
  position?: { x: number; y: number };
  inputs?: Record<string, unknown>;
  inputIds?: Record<string, string>;
  outputIds?: Record<string, string>;
}

type NumberControl = ClassicPreset.InputControl<"number", number>;
type TextControl = ClassicPreset.InputControl<"text", string>;
type InputLikeControl = NumberControl | TextControl | SelectControl;

const signalSocket = new ClassicPreset.Socket("signal");

const numberInput = (
  key: string,
  label: string,
  defaultValue: number,
  port = true
): NodeInputSpec => ({
  key,
  label,
  kind: "number",
  defaultValue,
  port,
});

const textInput = (
  key: string,
  label: string,
  defaultValue: string,
  port = false
): NodeInputSpec => ({
  key,
  label,
  kind: "text",
  defaultValue,
  port,
});

const selectInput = (
  key: string,
  label: string,
  defaultValue: string,
  options: string[],
  port = false
): NodeInputSpec => ({
  key,
  label,
  kind: "select",
  defaultValue,
  options,
  port,
});

const RATE_OPTIONS = ["audio", "control"];
const PARAM_RATE_OPTIONS = ["scalar", "control", "trigger", "audio"];
const ENV_OPTIONS = ["perc", "adsr", "asr", "linen", "triangle"];
const DONE_ACTION_OPTIONS = ["0 (none)", "2 (free)"];

const NODE_SPECS: NodeTypeSpec[] = [
  // Oscillators
  {
    category: "Oscillators",
    type: "SinOsc",
    title: "SinOsc",
    inputs: [
      selectInput("rate", "Rate", "audio", RATE_OPTIONS),
      numberInput("freq", "freq", 440),
      numberInput("phase", "phase", 0),
    ],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Oscillators",
    type: "Saw",
    title: "Saw",
    inputs: [
      selectInput("rate", "Rate", "audio", RATE_OPTIONS),
      numberInput("freq", "freq", 440),
    ],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Oscillators",
    type: "Pulse",
    title: "Pulse",
    inputs: [
      selectInput("rate", "Rate", "audio", RATE_OPTIONS),
      numberInput("freq", "freq", 440),
      numberInput("width", "width", 0.5),
    ],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Oscillators",
    type: "WhiteNoise",
    title: "WhiteNoise",
    inputs: [selectInput("rate", "Rate", "audio", RATE_OPTIONS)],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Oscillators",
    type: "PinkNoise",
    title: "PinkNoise",
    inputs: [selectInput("rate", "Rate", "audio", RATE_OPTIONS)],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Oscillators",
    type: "LFNoise0",
    title: "LFNoise0",
    inputs: [
      selectInput("rate", "Rate", "audio", RATE_OPTIONS),
      numberInput("freq", "freq", 500),
    ],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Oscillators",
    type: "LFNoise1",
    title: "LFNoise1",
    inputs: [
      selectInput("rate", "Rate", "audio", RATE_OPTIONS),
      numberInput("freq", "freq", 500),
    ],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Oscillators",
    type: "LFNoise2",
    title: "LFNoise2",
    inputs: [
      selectInput("rate", "Rate", "audio", RATE_OPTIONS),
      numberInput("freq", "freq", 500),
    ],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Oscillators",
    type: "Dust",
    title: "Dust",
    inputs: [
      selectInput("rate", "Rate", "audio", RATE_OPTIONS),
      numberInput("density", "density", 1),
    ],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Oscillators",
    type: "Impulse",
    title: "Impulse",
    inputs: [
      selectInput("rate", "Rate", "audio", RATE_OPTIONS),
      numberInput("freq", "freq", 1),
      numberInput("phase", "phase", 0),
    ],
    outputs: [{ key: "out", label: "out" }],
  },

  // Filters
  {
    category: "Filters",
    type: "LPF",
    title: "LPF",
    inputs: [
      selectInput("rate", "Rate", "audio", RATE_OPTIONS),
      numberInput("in", "in", 0),
      numberInput("freq", "freq", 1000),
    ],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Filters",
    type: "HPF",
    title: "HPF",
    inputs: [
      selectInput("rate", "Rate", "audio", RATE_OPTIONS),
      numberInput("in", "in", 0),
      numberInput("freq", "freq", 1000),
    ],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Filters",
    type: "BPF",
    title: "BPF",
    inputs: [
      selectInput("rate", "Rate", "audio", RATE_OPTIONS),
      numberInput("in", "in", 0),
      numberInput("freq", "freq", 1000),
      numberInput("rq", "rq", 1),
    ],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Filters",
    type: "RLPF",
    title: "RLPF",
    inputs: [
      selectInput("rate", "Rate", "audio", RATE_OPTIONS),
      numberInput("in", "in", 0),
      numberInput("freq", "freq", 1000),
      numberInput("rq", "rq", 1),
    ],
    outputs: [{ key: "out", label: "out" }],
  },

  // Envelopes
  {
    category: "Envelopes",
    type: "EnvGen",
    title: "EnvGen",
    inputs: [
      selectInput("rate", "Rate", "audio", RATE_OPTIONS),
      selectInput("envShape", "Envelope", "perc", ENV_OPTIONS),
      numberInput("gate", "gate", 1),
      numberInput("attack", "attack", 0.01),
      numberInput("decay", "decay", 0.3),
      numberInput("sustain", "sustain", 0.5),
      numberInput("release", "release", 1),
      numberInput("level", "level", 1),
      selectInput("doneAction", "doneAction", "2 (free)", DONE_ACTION_OPTIONS),
    ],
    outputs: [{ key: "out", label: "out" }],
  },

  // Effects
  {
    category: "Effects",
    type: "FreeVerb",
    title: "FreeVerb",
    inputs: [
      numberInput("in", "in", 0),
      numberInput("mix", "mix", 0.33),
      numberInput("room", "room", 0.5),
      numberInput("damp", "damp", 0.5),
    ],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Effects",
    type: "CombC",
    title: "CombC",
    inputs: [
      selectInput("rate", "Rate", "audio", RATE_OPTIONS),
      numberInput("in", "in", 0),
      numberInput("maxdelaytime", "maxdelaytime", 0.2),
      numberInput("delaytime", "delaytime", 0.2),
      numberInput("decaytime", "decaytime", 1),
    ],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Effects",
    type: "AllpassC",
    title: "AllpassC",
    inputs: [
      selectInput("rate", "Rate", "audio", RATE_OPTIONS),
      numberInput("in", "in", 0),
      numberInput("maxdelaytime", "maxdelaytime", 0.2),
      numberInput("delaytime", "delaytime", 0.2),
      numberInput("decaytime", "decaytime", 1),
    ],
    outputs: [{ key: "out", label: "out" }],
  },

  // I/O
  {
    category: "I/O",
    type: "Out",
    title: "Out",
    inputs: [numberInput("bus", "bus", 0), numberInput("in", "in", 0)],
    outputs: [],
  },

  // Math
  {
    category: "Math",
    type: "BinaryOpUGen_Mul",
    title: "Mul (x)",
    inputs: [numberInput("a", "a", 0), numberInput("b", "b", 1)],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Math",
    type: "BinaryOpUGen_Add",
    title: "Add (+)",
    inputs: [numberInput("a", "a", 0), numberInput("b", "b", 0)],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Math",
    type: "BinaryOpUGen_Sub",
    title: "Sub (-)",
    inputs: [numberInput("a", "a", 0), numberInput("b", "b", 0)],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Math",
    type: "BinaryOpUGen_Div",
    title: "Div (/)",
    inputs: [numberInput("a", "a", 0), numberInput("b", "b", 1)],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Math",
    type: "MulAdd",
    title: "MulAdd",
    inputs: [
      numberInput("in", "in", 0),
      numberInput("mul", "mul", 1),
      numberInput("add", "add", 0),
    ],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Math",
    type: "UnaryOpUGen_Abs",
    title: "Abs",
    inputs: [numberInput("in", "in", 0)],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Math",
    type: "UnaryOpUGen_Neg",
    title: "Neg",
    inputs: [numberInput("in", "in", 0)],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Math",
    type: "UnaryOpUGen_MidiCps",
    title: "MidiCps",
    inputs: [numberInput("in", "in", 60)],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Math",
    type: "UnaryOpUGen_CpsMidi",
    title: "CpsMidi",
    inputs: [numberInput("in", "in", 440)],
    outputs: [{ key: "out", label: "out" }],
  },

  // Control
  {
    category: "Control",
    type: "Line",
    title: "Line",
    inputs: [
      selectInput("rate", "Rate", "control", RATE_OPTIONS),
      numberInput("start", "start", 0),
      numberInput("end", "end", 1),
      numberInput("dur", "dur", 1),
      selectInput("doneAction", "doneAction", "0 (none)", DONE_ACTION_OPTIONS),
    ],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Control",
    type: "XLine",
    title: "XLine",
    inputs: [
      selectInput("rate", "Rate", "control", RATE_OPTIONS),
      numberInput("start", "start", 1),
      numberInput("end", "end", 0.001),
      numberInput("dur", "dur", 1),
      selectInput("doneAction", "doneAction", "0 (none)", DONE_ACTION_OPTIONS),
    ],
    outputs: [{ key: "out", label: "out" }],
  },
  {
    category: "Control",
    type: "Pan2",
    title: "Pan2",
    inputs: [
      selectInput("rate", "Rate", "audio", RATE_OPTIONS),
      numberInput("in", "in", 0),
      numberInput("pos", "pos", 0),
      numberInput("level", "level", 1),
    ],
    outputs: [
      { key: "left", label: "left" },
      { key: "right", label: "right" },
    ],
  },

  // Parameters
  {
    category: "Parameters",
    type: "Param",
    title: "Param",
    inputs: [
      textInput("name", "name", "freq"),
      numberInput("defaultValue", "default", 440),
      selectInput("rate", "Rate", "control", PARAM_RATE_OPTIONS),
    ],
    outputs: [{ key: "out", label: "out" }],
  },
];

const NODE_SPEC_MAP = new Map(NODE_SPECS.map((spec) => [spec.type, spec]));

function toNumber(value: unknown, fallback: number): number {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

export class SelectControl extends ClassicPreset.Control {
  readonly options: string[];
  readonly readonly: boolean;
  value: string;
  private readonly change?: (value: string) => void;

  constructor(options: {
    initial: string;
    options: string[];
    readonly?: boolean;
    change?: (value: string) => void;
  }) {
    super();
    this.value = options.initial;
    this.options = options.options;
    this.readonly = options.readonly ?? false;
    this.change = options.change;
  }

  setValue(value: string): void {
    this.value = value;
    this.change?.(value);
  }
}

function isInputControl(control: unknown): control is NumberControl | TextControl {
  return control instanceof ClassicPreset.InputControl;
}

function isSelectControl(control: unknown): control is SelectControl {
  return control instanceof SelectControl;
}

function getControlValue(control: InputLikeControl | null): unknown {
  if (!control) {
    return undefined;
  }
  if (isInputControl(control)) {
    return control.value;
  }
  if (isSelectControl(control)) {
    return control.value;
  }
  return undefined;
}

class SynthNode extends ClassicPreset.Node {
  readonly type: string;
  readonly spec: NodeTypeSpec;
  width = 140;

  constructor(
    spec: NodeTypeSpec,
    onInputChange: (node: SynthNode, key: string) => void
  ) {
    super(spec.title);
    this.type = spec.type;
    this.spec = spec;

    for (const inputSpec of spec.inputs) {
      const control = this.createControl(inputSpec, onInputChange);

      if (inputSpec.port ?? false) {
        const input = new ClassicPreset.Input(signalSocket, inputSpec.label, false);
        if (control) {
          input.addControl(control);
        }
        this.addInput(inputSpec.key, input);
      } else if (control) {
        this.addControl(inputSpec.key, control);
      }
    }

    for (const outputSpec of spec.outputs) {
      this.addOutput(
        outputSpec.key,
        new ClassicPreset.Output(
          signalSocket,
          outputSpec.label,
          outputSpec.multipleConnections ?? true
        )
      );
    }

    this.syncParamTitle();
  }

  get title(): string {
    return this.label;
  }

  set title(value: string) {
    this.label = value;
  }

  getInputControl(key: string): InputLikeControl | null {
    const input = this.inputs[key];
    if (input?.control && (isInputControl(input.control) || isSelectControl(input.control))) {
      return input.control;
    }

    const control = this.controls[key];
    if (control && (isInputControl(control) || isSelectControl(control))) {
      return control;
    }

    return null;
  }

  getInputValue(key: string): unknown {
    return getControlValue(this.getInputControl(key));
  }

  setInputValue(key: string, value: unknown, notify = true): boolean {
    const control = this.getInputControl(key);
    if (!control) {
      return false;
    }

    if (isInputControl(control)) {
      if (control.type === "number") {
        const defaultValue = toNumber(control.value, 0);
        const nextValue = toNumber(value, defaultValue);
        if (notify) {
          control.setValue(nextValue);
        } else {
          control.value = nextValue;
        }
      } else {
        const nextValue = String(value ?? "");
        if (notify) {
          control.setValue(nextValue);
        } else {
          control.value = nextValue;
        }
      }
    } else {
      const nextValue = String(value ?? "");
      if (notify) {
        control.setValue(nextValue);
      } else {
        control.value = nextValue;
      }
    }

    this.syncParamTitle();
    return true;
  }

  getInputId(key: string): string | null {
    const input = this.inputs[key];
    if (input) {
      return input.id;
    }

    const control = this.getInputControl(key);
    return control?.id ?? null;
  }

  setInputId(key: string, id: string): boolean {
    const input = this.inputs[key];
    if (input) {
      input.id = id;
      return true;
    }

    const control = this.getInputControl(key);
    if (control) {
      control.id = id;
      return true;
    }

    return false;
  }

  getOutputId(key: string): string | null {
    const output = this.outputs[key];
    return output?.id ?? null;
  }

  setOutputId(key: string, id: string): boolean {
    const output = this.outputs[key];
    if (!output) {
      return false;
    }
    output.id = id;
    return true;
  }

  private createControl(
    inputSpec: NodeInputSpec,
    onInputChange: (node: SynthNode, key: string) => void
  ): InputLikeControl | null {
    if (inputSpec.kind === "number") {
      return new ClassicPreset.InputControl("number", {
        initial: toNumber(inputSpec.defaultValue, 0),
        change: () => {
          this.syncParamTitle();
          onInputChange(this, inputSpec.key);
        },
      });
    }

    if (inputSpec.kind === "text") {
      return new ClassicPreset.InputControl("text", {
        initial: String(inputSpec.defaultValue),
        change: () => {
          this.syncParamTitle();
          onInputChange(this, inputSpec.key);
        },
      });
    }

    if (inputSpec.kind === "select") {
      return new SelectControl({
        initial: String(inputSpec.defaultValue),
        options: inputSpec.options ?? [],
        change: () => {
          this.syncParamTitle();
          onInputChange(this, inputSpec.key);
        },
      });
    }

    return null;
  }

  private syncParamTitle(): void {
    if (this.type !== "Param") {
      return;
    }

    const raw = String(this.getInputValue("name") ?? "").trim();
    const paramName = raw.length > 0 ? raw : "param";
    this.title = `Param: ${paramName}`;
  }
}

type BaseNode = ClassicPreset.Node;
type Connection = ClassicPreset.Connection<BaseNode, BaseNode>;
type Schemes = GetSchemes<BaseNode, Connection>;
type AreaExtra = VueArea2D<Schemes>;

export interface ReteNodeTypeOption {
  category: string;
  type: string;
  title: string;
}

export interface ParamNodeSummary {
  id: string;
  name: string;
  defaultValue: number;
  rate: string;
}

export interface ReteEditorSession {
  listNodeTypes(): ReteNodeTypeOption[];
  getParamSummary(): ParamNodeSummary[];
  getSelectedNodeIds(): string[];
  addNode(type: string, options?: AddNodeOptions): Promise<SynthNode | null>;
  toGraphPosition(clientX: number, clientY: number): { x: number; y: number };
  addParam(): Promise<void>;
  removeNode(nodeId: string): Promise<boolean>;
  removeSelectedNodes(): Promise<number>;
  focusNode(nodeId: string): Promise<void>;
  setNodeInputValue(nodeId: string, key: string, value: unknown): Promise<boolean>;
  getGraphModel(): NodeEditorGraphModel;
  getGraphState(): NodeEditorGraphState;
  loadGraphState(state: NodeEditorGraphState): Promise<string[]>;
  destroy(): void;
}

interface CreateReteEditorSessionOptions {
  onGraphChange?: (label: string, priority?: number) => void;
}

function normalizeConnectionState(
  connection: NodeEditorGraphStateConnection
): NodeEditorGraphStateConnection {
  return {
    id: typeof connection.id === "string" ? connection.id : undefined,
    from: {
      nodeId: connection.from.nodeId,
      port: connection.from.port,
    },
    to: {
      nodeId: connection.to.nodeId,
      port: connection.to.port,
    },
  };
}

function normalizeNodeState(node: NodeEditorGraphStateNode): NodeEditorGraphStateNode {
  return {
    id: node.id,
    type: node.type,
    title: node.title,
    position: {
      x: node.position.x,
      y: node.position.y,
    },
    inputs: { ...node.inputs },
    inputIds: node.inputIds ? { ...node.inputIds } : undefined,
    outputIds: node.outputIds ? { ...node.outputIds } : undefined,
  };
}

export async function createReteEditorSession(
  container: HTMLElement,
  options: CreateReteEditorSessionOptions = {}
): Promise<ReteEditorSession> {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new VuePlugin<Schemes, AreaExtra>();

  render.addPreset(
    VuePresets.classic.setup({
      customize: {
        connection() {
          return ReteConnection;
        },
        node() {
          return ReteNode;
        },
        socket() {
          return ReteSocket;
        },
        control(context) {
          if (context.payload instanceof SelectControl) {
            return ReteSelectControl;
          }
          if (context.payload instanceof ClassicPreset.InputControl) {
            return VuePresets.classic.Control;
          }
          return null;
        },
      },
    })
  );
  connection.addPreset(ConnectionPresets.classic.setup());

  editor.use(area);
  area.use(render);
  area.use(connection);

  AreaExtensions.simpleNodesOrder(area);
  AreaExtensions.showInputControl(area);

  const accumulating = AreaExtensions.accumulateOnCtrl();
  const selector = AreaExtensions.selector();
  const selectable = AreaExtensions.selectableNodes(area, selector, {
    accumulating,
  });

  let graphChangeBatchDepth = 0;
  let batchedGraphChangeLabel: string | null = null;
  let batchedGraphChangePriority = -1;

  const flushBatchedGraphChange = () => {
    if (!batchedGraphChangeLabel) {
      return;
    }
    const label = batchedGraphChangeLabel;
    const priority = batchedGraphChangePriority;
    batchedGraphChangeLabel = null;
    batchedGraphChangePriority = -1;
    options.onGraphChange?.(label, priority);
  };

  const withGraphChangeBatch = async <T>(action: () => Promise<T>): Promise<T> => {
    graphChangeBatchDepth += 1;
    try {
      return await action();
    } finally {
      graphChangeBatchDepth -= 1;
      if (graphChangeBatchDepth === 0) {
        flushBatchedGraphChange();
      }
    }
  };

  const notifyGraphChange = (label: string, priority = 0) => {
    if (graphChangeBatchDepth > 0) {
      if (priority >= batchedGraphChangePriority) {
        batchedGraphChangeLabel = label;
        batchedGraphChangePriority = priority;
      }
      return;
    }
    options.onGraphChange?.(label, priority);
  };

  const onInputChange = (node: SynthNode, key: string) => {
    // Live control edits already update their own DOM state; forcing a render here
    // can blur focused inputs (especially text controls).
    notifyGraphChange(`Update ${node.type}.${key}`, 10);
  };

  editor.addPipe((context) => {
    switch (context.type) {
      case "nodecreated":
        notifyGraphChange("Add Node", 40);
        break;
      case "noderemoved":
        notifyGraphChange("Remove Node", 40);
        break;
      case "connectioncreated":
        notifyGraphChange("Add Connection", 30);
        break;
      case "connectionremoved":
        notifyGraphChange("Remove Connection", 30);
        break;
      default:
        break;
    }
    return context;
  });

  area.addPipe((context) => {
    if (context.type === "nodedragged") {
      notifyGraphChange("Move Node", 20);
    }
    return context;
  });

  const listNodeTypes = (): ReteNodeTypeOption[] =>
    NODE_SPECS.map((spec) => ({
      category: spec.category,
      type: spec.type,
      title: spec.title,
    }));

  const getSynthNodes = (): SynthNode[] =>
    editor.getNodes().filter((node): node is SynthNode => node instanceof SynthNode);

  const getNode = (nodeId: string): SynthNode | undefined => {
    const node = editor.getNode(nodeId);
    if (!node || !(node instanceof SynthNode)) {
      return undefined;
    }
    return node;
  };

  const defaultPosition = (): { x: number; y: number } => {
    const transform = area.area.transform;
    const width = container.clientWidth || 1200;
    const height = container.clientHeight || 800;
    const offset = editor.getNodes().length * 20;

    return {
      x: (width * 0.5 - transform.x) / transform.k + offset,
      y: (height * 0.35 - transform.y) / transform.k + offset,
    };
  };

  const toGraphPosition = (
    clientX: number,
    clientY: number
  ): { x: number; y: number } => {
    const rect = container.getBoundingClientRect();
    const transform = area.area.transform;
    const localX = clientX - rect.left;
    const localY = clientY - rect.top;

    return {
      x: (localX - transform.x) / transform.k,
      y: (localY - transform.y) / transform.k,
    };
  };

  const addNode = async (
    type: string,
    nodeOptions: AddNodeOptions = {}
  ): Promise<SynthNode | null> => {
    const spec = NODE_SPEC_MAP.get(type);
    if (!spec) {
      return null;
    }

    const node = new SynthNode(spec, onInputChange);

    if (nodeOptions.id) {
      node.id = nodeOptions.id;
    }
    if (nodeOptions.title) {
      node.title = nodeOptions.title;
    }

    const inputValues = nodeOptions.inputs ?? {};
    for (const [key, value] of Object.entries(inputValues)) {
      node.setInputValue(key, value, false);
    }

    const added = await editor.addNode(node);
    if (!added) {
      return null;
    }

    if (nodeOptions.inputIds) {
      for (const [key, id] of Object.entries(nodeOptions.inputIds)) {
        node.setInputId(key, id);
      }
    }

    if (nodeOptions.outputIds) {
      for (const [key, id] of Object.entries(nodeOptions.outputIds)) {
        node.setOutputId(key, id);
      }
    }

    const position = nodeOptions.position ?? defaultPosition();
    await area.translate(node.id, position);
    await area.update("node", node.id);

    return node;
  };

  const addConnectionByState = async (
    state: NodeEditorGraphStateConnection
  ): Promise<boolean> => {
    const sourceNode = getNode(state.from.nodeId);
    const targetNode = getNode(state.to.nodeId);

    if (!sourceNode || !targetNode) {
      return false;
    }

    const sourceOutput = sourceNode.outputs[state.from.port];
    const targetInput = targetNode.inputs[state.to.port];

    if (!sourceOutput || !targetInput) {
      return false;
    }

    const connectionModel = new ClassicPreset.Connection(
      sourceNode,
      state.from.port as keyof BaseNode["outputs"],
      targetNode,
      state.to.port as keyof BaseNode["inputs"]
    );

    if (state.id) {
      connectionModel.id = state.id;
    }

    return editor.addConnection(connectionModel as Connection);
  };

  const getParamSummary = (): ParamNodeSummary[] =>
    getSynthNodes()
      .filter((node) => node.type === "Param")
      .map((node) => ({
        id: node.id,
        name: String(node.getInputValue("name") ?? "param"),
        defaultValue: toNumber(node.getInputValue("defaultValue"), 0),
        rate: String(node.getInputValue("rate") ?? "control"),
      }));

  const getSelectedNodeIds = (): string[] =>
    Array.from(selector.entities.values())
      .filter((entity) => entity.label === "node")
      .map((entity) => entity.id);

  const addParam = async (): Promise<void> => {
    const existing = getParamSummary();
    const paramIndex = existing.length;

    await addNode("Param", {
      position: { x: 50, y: paramIndex * 120 + 50 },
      inputs: {
        name: `param${paramIndex}`,
        defaultValue: 440,
        rate: "control",
      },
    });
  };

  const removeNode = async (nodeId: string): Promise<boolean> => {
    return withGraphChangeBatch(async () => {
      const node = getNode(nodeId);
      if (!node) {
        return false;
      }

      const attachedConnectionIds = editor
        .getConnections()
        .filter((connectionModel) => {
          return connectionModel.source === nodeId || connectionModel.target === nodeId;
        })
        .map((connectionModel) => connectionModel.id);

      for (const connectionId of attachedConnectionIds) {
        await editor.removeConnection(connectionId);
      }

      await selectable.unselect(nodeId);
      return editor.removeNode(nodeId);
    });
  };

  const removeSelectedNodes = async (): Promise<number> => {
    return withGraphChangeBatch(async () => {
      const nodeIds = getSelectedNodeIds();
      let removedCount = 0;
      for (const nodeId of nodeIds) {
        const removed = await removeNode(nodeId);
        if (removed) {
          removedCount += 1;
        }
      }
      return removedCount;
    });
  };

  const focusNode = async (nodeId: string): Promise<void> => {
    if (!getNode(nodeId)) {
      return;
    }
    await selectable.select(nodeId, false);
  };

  const setNodeInputValue = async (
    nodeId: string,
    key: string,
    value: unknown
  ): Promise<boolean> => {
    const node = getNode(nodeId);
    if (!node) {
      return false;
    }

    const updated = node.setInputValue(key, value, true);
    if (!updated) {
      return false;
    }

    const control = node.getInputControl(key);
    if (control) {
      await area.update("control", control.id);
    }
    if (node.type === "Param" && key === "name") {
      await area.update("node", node.id);
    }

    return true;
  };

  const getGraphModel = (): NodeEditorGraphModel => {
    const nodes = getSynthNodes().map((node) => {
      const nodePosition = area.nodeViews.get(node.id)?.position ?? { x: 0, y: 0 };
      const inputs: Record<string, NodeEditorGraphPortInput> = {};
      const outputs: Record<string, NodeEditorGraphPortOutput> = {};

      const spec = NODE_SPEC_MAP.get(node.type);
      if (spec) {
        for (const inputSpec of spec.inputs) {
          inputs[inputSpec.key] = {
            id: node.getInputId(inputSpec.key) ?? `${node.id}:${inputSpec.key}`,
            value: node.getInputValue(inputSpec.key),
          };
        }
      }

      for (const [key, output] of Object.entries(node.outputs)) {
        if (!output) {
          continue;
        }
        outputs[key] = { id: output.id };
      }

      return {
        id: node.id,
        type: node.type,
        title: node.title,
        position: {
          x: nodePosition.x,
          y: nodePosition.y,
        },
        inputs,
        outputs,
      };
    });

    const connections: NodeEditorGraphConnection[] = [];

    for (const connectionModel of editor.getConnections()) {
      const sourceNode = getNode(connectionModel.source);
      const targetNode = getNode(connectionModel.target);
      if (!sourceNode || !targetNode) {
        continue;
      }

      const sourcePortName = String(connectionModel.sourceOutput);
      const targetPortName = String(connectionModel.targetInput);
      const sourcePort = sourceNode.outputs[sourcePortName];
      const targetPort = targetNode.inputs[targetPortName];
      if (!sourcePort || !targetPort) {
        continue;
      }

      connections.push({
        id: connectionModel.id,
        from: {
          nodeId: sourceNode.id,
          id: sourcePort.id,
          name: sourcePortName,
        },
        to: {
          nodeId: targetNode.id,
          id: targetPort.id,
          name: targetPortName,
        },
      });
    }

    return { nodes, connections };
  };

  const getGraphState = (): NodeEditorGraphState => {
    const graphModel = getGraphModel();

    const nodes: NodeEditorGraphStateNode[] = graphModel.nodes.map((node) => ({
      id: node.id,
      type: node.type,
      title: node.title,
      position: {
        x: node.position.x,
        y: node.position.y,
      },
      inputs: Object.fromEntries(
        Object.entries(node.inputs).map(([key, input]) => [key, input.value])
      ),
      inputIds: Object.fromEntries(
        Object.entries(node.inputs).map(([key, input]) => [key, input.id])
      ),
      outputIds: Object.fromEntries(
        Object.entries(node.outputs).map(([key, output]) => [key, output.id])
      ),
    }));

    const connections: NodeEditorGraphStateConnection[] = graphModel.connections.map(
      (connectionModel) => ({
        id: connectionModel.id,
        from: {
          nodeId: connectionModel.from.nodeId,
          port: connectionModel.from.name,
        },
        to: {
          nodeId: connectionModel.to.nodeId,
          port: connectionModel.to.name,
        },
      })
    );

    return {
      nodes,
      connections,
      viewport: {
        x: area.area.transform.x,
        y: area.area.transform.y,
        k: area.area.transform.k,
      },
    };
  };

  const loadGraphState = async (state: NodeEditorGraphState): Promise<string[]> => {
    const warnings: string[] = [];

    await editor.clear();

    for (const rawNode of state.nodes) {
      const nodeState = normalizeNodeState(rawNode);
      const created = await addNode(nodeState.type, {
        id: nodeState.id,
        title: nodeState.title,
        position: nodeState.position,
        inputs: nodeState.inputs,
        inputIds: nodeState.inputIds,
        outputIds: nodeState.outputIds,
      });

      if (!created) {
        warnings.push(`Unknown or duplicate node type/id: ${nodeState.type} (${nodeState.id})`);
      }
    }

    for (const rawConnection of state.connections) {
      const connectionState = normalizeConnectionState(rawConnection);
      const added = await addConnectionByState(connectionState);
      if (!added) {
        warnings.push(
          `Failed connection: ${connectionState.from.nodeId}.${connectionState.from.port} -> ${connectionState.to.nodeId}.${connectionState.to.port}`
        );
      }
    }

    if (state.viewport) {
      const zoom = toNumber(state.viewport.k, 1);
      await area.area.zoom(zoom, 0, 0);
      await area.area.translate(
        toNumber(state.viewport.x, 0),
        toNumber(state.viewport.y, 0)
      );
    } else {
      const nodes = getSynthNodes();
      if (nodes.length > 0) {
        await AreaExtensions.zoomAt(area, nodes, { scale: 0.9 });
      }
    }

    return warnings;
  };

  const destroy = () => {
    accumulating.destroy();
    area.destroy();
  };

  return {
    listNodeTypes,
    getParamSummary,
    getSelectedNodeIds,
    addNode,
    toGraphPosition,
    addParam,
    removeNode,
    removeSelectedNodes,
    focusNode,
    setNodeInputValue,
    getGraphModel,
    getGraphState,
    loadGraphState,
    destroy,
  };
}
