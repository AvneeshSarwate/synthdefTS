<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { compileGraph } from "../bridge/graphCompiler";
import { generateTypeScript } from "../bridge/codeGenerator";
import { createFilteredSawGraphState } from "../bridge/initialGraph";
import { NodeEditorCommandStack } from "./commandStack";
import {
  createReteEditorSession,
  type ReteEditorSession,
  type ReteNodeTypeOption,
} from "./reteEditor";
import {
  captureFullState,
  captureNodeEditorState,
  parseFullState,
  type NodeEditorFullState,
  type NodeEditorStateSnapshot,
} from "./nodeEditorState";
import { useParamSidebarBridge } from "./useParamSidebarBridge";
import {
  registerForAgentCapture,
  unregisterAgentCapture,
} from "../utils/agentStateExporter";

const DEFAULT_LOCAL_STORAGE_KEY = "synthdefTS.nodeEditor.fullState.v2";
const AGENT_CAPTURE_ID = "node-editor";
const DESIGN_STYLE_PROPERTIES = [
  "background-color",
  "color",
  "border-color",
  "border-radius",
  "box-shadow",
  "font-family",
  "font-size",
  "font-weight",
  "line-height",
  "padding",
] as const;

const DESIGN_STYLE_PROBES = [
  '[data-agent-surface="root"]',
  '[data-agent-surface="toolbar"]',
  '[data-agent-surface="sidebar"]',
  '[data-agent-surface="editor"]',
  '[data-agent-surface="canvas"]',
  ".btn-primary",
  ".btn-secondary",
  ".btn-ghost",
  ".param-card",
] as const;

const props = withDefaults(
  defineProps<{
    width?: number | string;
    height?: number | string;
    initialSynthDefName?: string;
    initialFullState?: NodeEditorFullState | null;
    autoSaveToLocalStorage?: boolean;
    autoLoadFromLocalStorage?: boolean;
    localStorageKey?: string;
    syncState?: (state: NodeEditorStateSnapshot) => void;
  }>(),
  {
    width: "100%",
    height: "100vh",
    initialSynthDefName: "ts_filteredSaw",
    initialFullState: null,
    autoSaveToLocalStorage: false,
    autoLoadFromLocalStorage: false,
    localStorageKey: DEFAULT_LOCAL_STORAGE_KEY,
  }
);

const emit = defineEmits<{
  (event: "state-update", state: NodeEditorStateSnapshot): void;
  (
    event: "compile-success",
    info: { ugenCount: number; paramCount: number; bytes: number }
  ): void;
  (event: "compile-error", error: string): void;
}>();

const synthDefName = ref(props.initialSynthDefName);
const statusMessage = ref("");
const statusType = ref<"success" | "error" | "info">("info");
const sidebarOpen = ref(true);
const autoSaveEnabled = ref(props.autoSaveToLocalStorage);
const canUndoState = ref(false);
const canRedoState = ref(false);
const editorContainer = ref<HTMLDivElement>();
const editorPane = ref<HTMLDivElement>();
const reteCanvas = ref<HTMLDivElement>();
const graphFileInput = ref<HTMLInputElement | null>(null);
const suppressGraphEvents = ref(false);
const graphVersion = ref(0);
const editorSession = ref<ReteEditorSession | null>(null);
const nodeTypeOptions = ref<ReteNodeTypeOption[]>([]);
const selectedNodeType = ref("");
const nodeTypeSearch = ref("");
const quickAddOpen = ref(false);
const quickAddSearch = ref("");
const quickAddMenuX = ref(0);
const quickAddMenuY = ref(0);
const quickAddClientX = ref(0);
const quickAddClientY = ref(0);
const quickAddSearchInput = ref<HTMLInputElement | null>(null);

let changeFlushQueued = false;
let pendingChangeLabel: string | null = null;
let pendingChangePriority = -1;

const {
  paramSummary,
  addParam,
  focusParam,
  removeParam,
  updateParamName,
  commitParamName,
  startEditingName,
  stopEditingName,
} = useParamSidebarBridge(editorSession, graphVersion);

const commandStack = new NodeEditorCommandStack({
  captureState: () => captureHistoryState(),
  restoreState: async (state) => {
    const warnings = await restoreFromHistoryState(state);
    if (warnings.length > 0) {
      showStatus(
        `Undo/redo restored with ${warnings.length} warning(s): ${warnings.join("; ")}`,
        "error"
      );
    }
  },
  onChange: () => {
    updateUndoRedoState();
  },
});

const containerStyle = computed(() => ({
  width: typeof props.width === "number" ? `${props.width}px` : props.width,
  height: typeof props.height === "number" ? `${props.height}px` : props.height,
}));

const filteredNodeTypeOptions = computed(() => {
  const query = nodeTypeSearch.value.trim().toLowerCase();
  if (query.length === 0) {
    return nodeTypeOptions.value;
  }

  return nodeTypeOptions.value.filter((option) => {
    const haystack = `${option.category} ${option.type} ${option.title}`.toLowerCase();
    return haystack.includes(query);
  });
});

const quickAddNodeTypeOptions = computed(() => {
  const query = quickAddSearch.value.trim().toLowerCase();
  if (query.length === 0) {
    return nodeTypeOptions.value;
  }

  return nodeTypeOptions.value.filter((option) => {
    const haystack = `${option.category} ${option.type} ${option.title}`.toLowerCase();
    return haystack.includes(query);
  });
});

const quickAddMenuStyle = computed(() => ({
  left: `${quickAddMenuX.value}px`,
  top: `${quickAddMenuY.value}px`,
}));

watch(synthDefName, (next, prev) => {
  if (next !== prev) {
    queueGraphChange("Rename SynthDef", 5);
  }
});

watch(autoSaveEnabled, (enabled) => {
  if (enabled) {
    persistToLocalStorage();
  }
});

watch(filteredNodeTypeOptions, (next) => {
  if (next.length === 0) {
    selectedNodeType.value = "";
    return;
  }

  const hasCurrent = next.some((option) => option.type === selectedNodeType.value);
  if (!hasCurrent) {
    selectedNodeType.value = next[0]!.type;
  }
});

onMounted(() => {
  void mountEditor();
  window.addEventListener("keydown", onKeydown);

  registerForAgentCapture(AGENT_CAPTURE_ID, () => {
    const container = editorContainer.value;
    const rect = container?.getBoundingClientRect() ?? {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };

    const snapshot = getState();
    return {
      name: "NodeEditor",
      tagName: "node-editor-component",
      state: {
        ...snapshot,
        __design: captureDesignSnapshot(),
      },
      boundingBox: {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      },
    };
  });
});

onUnmounted(() => {
  unregisterAgentCapture(AGENT_CAPTURE_ID);
  window.removeEventListener("keydown", onKeydown);
  editorSession.value?.destroy();
  editorSession.value = null;
});

function createEmptySnapshot(): NodeEditorStateSnapshot {
  return {
    synthDefName: synthDefName.value,
    nodes: [],
    connections: [],
    paramCount: 0,
    ugenCount: 0,
  };
}

function extractComputedStyles(element: Element): Record<string, string> {
  const styles = window.getComputedStyle(element);
  const result: Record<string, string> = {};
  for (const property of DESIGN_STYLE_PROPERTIES) {
    result[property] = styles.getPropertyValue(property).trim();
  }
  return result;
}

function captureDesignSnapshot() {
  const root = editorContainer.value;
  if (!root || typeof window === "undefined") {
    return {
      probes: [],
      viewport: { width: 0, height: 0 },
      ui: { sidebarOpen: sidebarOpen.value, quickAddOpen: quickAddOpen.value },
    };
  }

  const probes = DESIGN_STYLE_PROBES.map((selector) => {
    const element = root.querySelector(selector);
    return {
      selector,
      found: element !== null,
      styles: element ? extractComputedStyles(element) : {},
    };
  });

  return {
    probes,
    viewport: {
      width: root.clientWidth,
      height: root.clientHeight,
    },
    ui: {
      sidebarOpen: sidebarOpen.value,
      quickAddOpen: quickAddOpen.value,
      filteredNodeTypeCount: filteredNodeTypeOptions.value.length,
      quickAddNodeTypeCount: quickAddNodeTypeOptions.value.length,
    },
  };
}

function getSessionOrThrow(): ReteEditorSession {
  const activeSession = editorSession.value;
  if (!activeSession) {
    throw new Error("Node editor session has not initialized yet");
  }
  return activeSession;
}

async function mountEditor() {
  if (!reteCanvas.value) {
    showStatus("Failed to initialize node editor canvas", "error");
    return;
  }

  editorSession.value = await createReteEditorSession(reteCanvas.value, {
    onGraphChange: (label, priority) => {
      queueGraphChange(label, priority);
    },
  });

  nodeTypeOptions.value = editorSession.value.listNodeTypes();
  if (nodeTypeOptions.value.length > 0 && selectedNodeType.value.length === 0) {
    selectedNodeType.value = nodeTypeOptions.value[0]!.type;
  }

  await initializeGraphState();

  commandStack.replaceCurrentState(captureHistoryState(), true);
  updateUndoRedoState();
  emitStateUpdate();
}

function updateUndoRedoState() {
  canUndoState.value = commandStack.canUndo();
  canRedoState.value = commandStack.canRedo();
}

function queueGraphChange(label: string, priority = 0) {
  if (suppressGraphEvents.value || commandStack.isRecordingPaused()) {
    return;
  }

  if (priority >= pendingChangePriority) {
    pendingChangeLabel = label;
    pendingChangePriority = priority;
  }

  if (changeFlushQueued) {
    return;
  }

  changeFlushQueued = true;
  queueMicrotask(() => {
    changeFlushQueued = false;
    const nextLabel = pendingChangeLabel ?? "Edit Graph";
    pendingChangeLabel = null;
    pendingChangePriority = -1;
    commandStack.recordChange(nextLabel);
    emitStateUpdate();
  });
}

function captureCurrentFullState(): NodeEditorFullState {
  const graphState = getSessionOrThrow().getGraphState();
  return captureFullState(graphState, synthDefName.value);
}

function captureHistoryState(): NodeEditorFullState {
  const fullState = captureCurrentFullState();
  return {
    synthDefName: fullState.synthDefName,
    version: fullState.version,
    graphState: {
      ...fullState.graphState,
      viewport: undefined,
    },
  };
}

async function restoreFromHistoryState(state: NodeEditorFullState): Promise<string[]> {
  const activeSession = getSessionOrThrow();
  const parsed = parseFullState(state);
  const currentViewport = activeSession.getGraphState().viewport;
  const historyGraphState = {
    ...parsed.graphState,
    viewport: currentViewport,
  };

  let warnings: string[] = [];
  suppressGraphEvents.value = true;
  try {
    synthDefName.value = parsed.synthDefName;
    warnings = await activeSession.loadGraphState(historyGraphState);
  } finally {
    suppressGraphEvents.value = false;
  }

  emitStateUpdate();
  return warnings;
}

interface SetStateOptions {
  resetHistory?: boolean;
  emitUpdate?: boolean;
}

async function setFullStateInternal(
  state: NodeEditorFullState,
  options: SetStateOptions = {}
): Promise<string[]> {
  const parsed = parseFullState(state);

  let warnings: string[] = [];
  suppressGraphEvents.value = true;
  try {
    synthDefName.value = parsed.synthDefName;
    warnings = await getSessionOrThrow().loadGraphState(parsed.graphState);
  } finally {
    suppressGraphEvents.value = false;
  }

  if (options.resetHistory ?? true) {
    commandStack.replaceCurrentState(captureHistoryState(), true);
  } else {
    commandStack.syncCurrentState();
  }
  updateUndoRedoState();

  if (options.emitUpdate ?? true) {
    emitStateUpdate();
  }
  return warnings;
}

async function initializeGraphState() {
  if (props.initialFullState) {
    const warnings = await setFullStateInternal(props.initialFullState, {
      resetHistory: false,
      emitUpdate: false,
    });
    if (warnings.length > 0) {
      showStatus(
        `Initial state loaded with ${warnings.length} warning(s): ${warnings.join("; ")}`,
        "error"
      );
    }
    return;
  }

  if (props.autoLoadFromLocalStorage) {
    try {
      const warnings = await loadFromLocalStorage({
        resetHistory: false,
        emitUpdate: false,
      });
      if (warnings.length > 0) {
        showStatus(`Auto-loaded graph with ${warnings.length} warning(s)`, "info");
      } else {
        showStatus("Loaded graph from localStorage", "success");
      }
      return;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      showStatus(`Failed to auto-load saved graph: ${msg}`, "error");
    }
  }

  suppressGraphEvents.value = true;
  try {
    await getSessionOrThrow().loadGraphState(createFilteredSawGraphState());
  } finally {
    suppressGraphEvents.value = false;
  }
}

function emitStateUpdate() {
  const activeSession = editorSession.value;
  if (!activeSession) {
    return;
  }

  const snapshot = captureNodeEditorState(activeSession.getGraphModel(), synthDefName.value);
  graphVersion.value += 1;
  props.syncState?.(snapshot);
  emit("state-update", snapshot);
  persistToLocalStorage();
}

function showStatus(msg: string, type: "success" | "error" | "info") {
  statusMessage.value = msg;
  statusType.value = type;
  if (type !== "error") {
    setTimeout(() => {
      if (statusMessage.value === msg) {
        statusMessage.value = "";
      }
    }, 4000);
  }
}

function openQuickAddPalette(clientX: number, clientY: number) {
  const pane = editorPane.value;
  if (!pane || !editorSession.value) {
    return;
  }

  const rect = pane.getBoundingClientRect();
  quickAddClientX.value = clientX;
  quickAddClientY.value = clientY;
  quickAddMenuX.value = Math.max(0, clientX - rect.left);
  quickAddMenuY.value = Math.max(0, clientY - rect.top);
  quickAddSearch.value = "";
  quickAddOpen.value = true;

  void nextTick(() => {
    quickAddSearchInput.value?.focus();
    quickAddSearchInput.value?.select();
  });
}

function closeQuickAddPalette() {
  quickAddOpen.value = false;
}

function openQuickAddAtCenter() {
  const pane = editorPane.value;
  if (!pane) {
    return;
  }

  const rect = pane.getBoundingClientRect();
  openQuickAddPalette(rect.left + rect.width * 0.5, rect.top + rect.height * 0.45);
}

function onEditorContextMenu(event: MouseEvent) {
  event.preventDefault();
  openQuickAddPalette(event.clientX, event.clientY);
}

async function addQuickNodeAtCursor(type: string) {
  const activeSession = editorSession.value;
  if (!activeSession) {
    return;
  }

  const position = activeSession.toGraphPosition(
    quickAddClientX.value,
    quickAddClientY.value
  );
  const created = await activeSession.addNode(type, { position });
  if (!created) {
    showStatus(`Failed to create node: ${type}`, "error");
    return;
  }

  closeQuickAddPalette();
}

function onQuickAddSearchKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.preventDefault();
    closeQuickAddPalette();
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    const firstOption = quickAddNodeTypeOptions.value[0];
    if (firstOption) {
      void addQuickNodeAtCursor(firstOption.type);
    }
  }
}

function onKeydown(event: KeyboardEvent) {
  if (quickAddOpen.value && event.key === "Escape") {
    event.preventDefault();
    closeQuickAddPalette();
    return;
  }

  if ((event.metaKey || event.ctrlKey) && event.shiftKey && !event.altKey) {
    const key = event.key.toLowerCase();
    if (key === "a") {
      event.preventDefault();
      openQuickAddAtCenter();
      return;
    }
  }

  if (!(event.metaKey || event.ctrlKey) || event.altKey) {
    return;
  }

  const key = event.key.toLowerCase();
  if (key === "z") {
    event.preventDefault();
    if (event.shiftKey) {
      void redo();
    } else {
      void undo();
    }
    return;
  }

  if (key === "y" && !event.shiftKey) {
    event.preventDefault();
    void redo();
  }
}

async function undo() {
  if (!commandStack.canUndo()) {
    return;
  }
  await commandStack.undo();
}

async function redo() {
  if (!commandStack.canRedo()) {
    return;
  }
  await commandStack.redo();
}

function getState() {
  const activeSession = editorSession.value;
  if (!activeSession) {
    return createEmptySnapshot();
  }

  return captureNodeEditorState(activeSession.getGraphModel(), synthDefName.value);
}

function getFullState() {
  return captureCurrentFullState();
}

async function setFullState(state: NodeEditorFullState) {
  return setFullStateInternal(state, { resetHistory: true, emitUpdate: true });
}

function saveToJSON() {
  return JSON.stringify(captureCurrentFullState(), null, 2);
}

async function loadFromJSON(json: string, options?: SetStateOptions): Promise<string[]> {
  const parsed = parseFullState(JSON.parse(json));
  return setFullStateInternal(parsed, options);
}

function downloadGraphJSON() {
  const name = synthDefName.value.trim() || "mySynthDef";
  const blob = new Blob([saveToJSON()], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.node-graph.json`;
  a.click();
  URL.revokeObjectURL(url);
  showStatus(`Saved ${name}.node-graph.json`, "success");
}

function triggerGraphUpload() {
  graphFileInput.value?.click();
}

async function onGraphFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) {
    return;
  }

  try {
    const json = await file.text();
    const warnings = await loadFromJSON(json, {
      resetHistory: true,
      emitUpdate: true,
    });

    if (warnings.length > 0) {
      showStatus(
        `Loaded ${file.name} with ${warnings.length} warning(s): ${warnings.join("; ")}`,
        "info"
      );
    } else {
      showStatus(`Loaded ${file.name}`, "success");
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    showStatus(`Failed to load graph JSON: ${msg}`, "error");
  } finally {
    input.value = "";
  }
}

function getLocalStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage;
}

function persistToLocalStorage() {
  if (!autoSaveEnabled.value) {
    return;
  }

  const storage = getLocalStorage();
  if (!storage) {
    return;
  }

  try {
    storage.setItem(props.localStorageKey, saveToJSON());
  } catch {
    // Ignore write errors (quota/private browsing).
  }
}

async function loadFromLocalStorage(options?: SetStateOptions): Promise<string[]> {
  const storage = getLocalStorage();
  if (!storage) {
    throw new Error("localStorage is not available");
  }

  const json = storage.getItem(props.localStorageKey);
  if (!json) {
    throw new Error(`No saved state found for key "${props.localStorageKey}"`);
  }

  return loadFromJSON(json, options);
}

async function loadAutoSavedGraph() {
  try {
    const warnings = await loadFromLocalStorage({
      resetHistory: true,
      emitUpdate: true,
    });

    if (warnings.length > 0) {
      showStatus(
        `Loaded auto-save with ${warnings.length} warning(s): ${warnings.join("; ")}`,
        "info"
      );
    } else {
      showStatus("Loaded auto-save", "success");
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    showStatus(`Failed to load auto-save: ${msg}`, "error");
  }
}

function downloadBinary() {
  try {
    const activeSession = getSessionOrThrow();
    const graph = activeSession.getGraphModel();
    const name = synthDefName.value.trim() || "mySynthDef";
    const result = compileGraph(graph, name);

    const binaryBytes = new Uint8Array(result.binary);
    const blob = new Blob([binaryBytes], {
      type: "application/octet-stream",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.scsyndef`;
    a.click();
    URL.revokeObjectURL(url);

    const ugenCount = result.compiled.ugens.length;
    const paramCount = result.compiled.paramNames.length;
    const bytes = result.binary.length;
    showStatus(
      `Binary: ${ugenCount} UGens, ${paramCount} params, ${bytes} bytes`,
      "success"
    );
    emit("compile-success", { ugenCount, paramCount, bytes });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    showStatus(`Compile error: ${msg}`, "error");
    emit("compile-error", msg);
  }
}

function downloadTypeScript() {
  try {
    const activeSession = getSessionOrThrow();
    const graph = activeSession.getGraphModel();
    const name = synthDefName.value.trim() || "mySynthDef";
    const code = generateTypeScript(graph, name);

    const blob = new Blob([code], { type: "text/typescript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.ts`;
    a.click();
    URL.revokeObjectURL(url);

    showStatus(`Downloaded ${name}.ts`, "success");
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    showStatus(`Codegen error: ${msg}`, "error");
    emit("compile-error", msg);
  }
}

async function addSelectedNode() {
  const activeSession = editorSession.value;
  if (!activeSession) {
    return;
  }
  if (!selectedNodeType.value) {
    showStatus("No node type selected", "info");
    return;
  }

  const created = await activeSession.addNode(selectedNodeType.value);
  if (!created) {
    showStatus(`Failed to create node: ${selectedNodeType.value}`, "error");
  }
}

defineExpose({
  getSynthDefName: () => synthDefName.value,
  setSynthDefName: (name: string) => {
    synthDefName.value = name;
  },
  getState,
  getFullState,
  setFullState,
  saveToJSON,
  loadFromJSON,
  undo,
  redo,
  canUndo: () => commandStack.canUndo(),
  canRedo: () => commandStack.canRedo(),
  downloadBinary,
  downloadTypeScript,
  downloadGraphJSON,
  addParam,
});
</script>

<template>
  <div
    ref="editorContainer"
    class="node-editor-root"
    :style="containerStyle"
    data-agent-component="node-editor"
    data-agent-surface="root"
  >
    <header class="toolbar" data-agent-surface="toolbar">
      <div class="toolbar-row">
        <!-- Identity -->
        <div class="toolbar-group">
          <span class="title">SynthDef</span>
          <input
            v-model="synthDefName"
            class="name-input"
            placeholder="mySynthDef"
          />
        </div>

        <span class="toolbar-sep" />

        <!-- Edit -->
        <div class="toolbar-group">
          <button class="tb" :disabled="!canUndoState" @click="undo" title="Undo (Cmd+Z)">Undo</button>
          <button class="tb" :disabled="!canRedoState" @click="redo" title="Redo (Cmd+Shift+Z)">Redo</button>
        </div>

        <span class="toolbar-sep" />

        <!-- Add node -->
        <div class="toolbar-group">
          <input
            v-model="nodeTypeSearch"
            class="toolbar-input"
            placeholder="Filter nodes"
          />
          <select v-model="selectedNodeType" class="toolbar-select">
            <option
              v-for="option in filteredNodeTypeOptions"
              :key="option.type"
              :value="option.type"
            >
              {{ option.category }} / {{ option.title }}
            </option>
          </select>
          <button class="tb tb-accent" @click="addSelectedNode">+ Node</button>
        </div>

        <span class="toolbar-sep" />

        <!-- File -->
        <div class="toolbar-group">
          <button class="tb" @click="downloadGraphJSON" title="Save graph as JSON">Save</button>
          <button class="tb" @click="triggerGraphUpload" title="Load graph JSON">Load</button>
          <label class="autosave-label">
            <input v-model="autoSaveEnabled" type="checkbox" />
            Auto
          </label>
          <button class="tb" @click="loadAutoSavedGraph">Restore</button>
        </div>

        <span class="toolbar-sep" />

        <!-- Export -->
        <div class="toolbar-group">
          <button class="tb tb-accent" @click="downloadBinary">.scsyndef</button>
          <button class="tb" @click="downloadTypeScript">.ts</button>
        </div>

        <span class="toolbar-sep" />

        <!-- View -->
        <button class="tb" @click="sidebarOpen = !sidebarOpen">
          {{ sidebarOpen ? "Hide" : "Show" }} Params
        </button>

        <input
          ref="graphFileInput"
          class="file-input-hidden"
          type="file"
          accept=".json,application/json"
          @change="onGraphFileSelected"
        />
      </div>
      <div v-if="statusMessage" class="status" :class="statusType">
        {{ statusMessage }}
      </div>
    </header>
    <div class="main-area">
      <aside v-if="sidebarOpen" class="sidebar" data-agent-surface="sidebar">
        <div class="sidebar-header">
          <h2 class="sidebar-title">Parameters</h2>
          <button class="tb tb-accent" @click="addParam">+ Add</button>
        </div>
        <div class="param-list">
          <div
            v-for="param in paramSummary"
            :key="param.id"
            class="param-card"
            @click="focusParam(param.id)"
          >
            <div class="param-info">
              <input
                class="param-name-input"
                :data-param-id="param.id"
                :value="param.name"
                @input="updateParamName(param.id, ($event.target as HTMLInputElement).value)"
                @keydown.enter.prevent="commitParamName(param.id)"
                @focus="startEditingName(param.id)"
                @blur="stopEditingName(param.id)"
                @click.stop
              />
              <span class="param-meta">
                {{ param.rate }} = {{ param.defaultValue }}
              </span>
            </div>
            <button
              class="param-remove"
              @click.stop="removeParam(param.id)"
              title="Remove parameter"
            >
              x
            </button>
          </div>
          <div v-if="paramSummary.length === 0" class="param-empty">
            No parameters defined.
            <br />Click "+ Add" to create one.
          </div>
        </div>
      </aside>
      <div
        ref="editorPane"
        class="editor-container"
        data-agent-surface="editor"
        @contextmenu="onEditorContextMenu"
      >
        <div
          ref="reteCanvas"
          class="rete-editor-canvas"
          data-agent-surface="canvas"
        />
        <div
          v-if="quickAddOpen"
          class="quick-add-overlay"
          @pointerdown.self="closeQuickAddPalette"
        >
          <div class="quick-add-menu" :style="quickAddMenuStyle" @pointerdown.stop>
            <div class="quick-add-header">Add Node</div>
            <input
              ref="quickAddSearchInput"
              v-model="quickAddSearch"
              class="quick-add-search"
              placeholder="Search node type"
              @keydown="onQuickAddSearchKeydown"
            />
            <div class="quick-add-list">
              <button
                v-for="option in quickAddNodeTypeOptions"
                :key="`quick-${option.type}`"
                class="quick-add-item"
                @click="addQuickNodeAtCursor(option.type)"
              >
                <span class="quick-add-type">{{ option.title }}</span>
                <span class="quick-add-category">{{ option.category }}</span>
              </button>
              <div v-if="quickAddNodeTypeOptions.length === 0" class="quick-add-empty">
                No matching node types.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Palette ───────────────────────────────────────────── */
/* bg-0  #111118   deepest (canvas)                        */
/* bg-1  #18181f   surfaces (toolbar, sidebar)              */
/* bg-2  #222230   elevated (cards, inputs)                 */
/* border #2a2a3a  subtle lines                             */
/* fg-3  #555568   muted text                               */
/* fg-2  #8888a0   secondary text                           */
/* fg-1  #c0c0d0   primary text                             */
/* accent #6c8cff  action blue                              */
/* accent-h #8aa4ff hover blue                              */

.node-editor-root {
  display: flex;
  flex-direction: column;
  background: #111118;
  color: #c0c0d0;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 11px;
}

/* ── Toolbar ───────────────────────────────────────────── */

.toolbar {
  display: flex;
  flex-direction: column;
  background: #18181f;
  border-bottom: 1px solid #2a2a3a;
  flex-shrink: 0;
  z-index: 100;
}

.toolbar-row {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  flex-wrap: wrap;
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: 3px;
}

.toolbar-sep {
  width: 1px;
  height: 18px;
  background: #2a2a3a;
  margin: 0 4px;
  flex-shrink: 0;
}

.title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #6c8cff;
  margin: 0;
  white-space: nowrap;
}

.name-input {
  padding: 2px 6px;
  border: 1px solid #2a2a3a;
  border-radius: 3px;
  background: #222230;
  color: #c0c0d0;
  font-size: 11px;
  width: 120px;
  font-family: "JetBrains Mono", "SF Mono", monospace;
}

.name-input:focus {
  outline: none;
  border-color: #6c8cff;
}

/* ── Toolbar buttons ─────────────────────────────────── */

.tb {
  padding: 2px 8px;
  border: 1px solid #2a2a3a;
  border-radius: 3px;
  background: transparent;
  color: #8888a0;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  line-height: 1.5;
  font-family: inherit;
}

.tb:hover {
  background: #222230;
  color: #c0c0d0;
  border-color: #3a3a4a;
}

.tb:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.tb:disabled:hover {
  background: transparent;
  color: #8888a0;
  border-color: #2a2a3a;
}

.tb-accent {
  background: #6c8cff;
  color: #111118;
  border-color: #6c8cff;
  font-weight: 600;
}

.tb-accent:hover {
  background: #8aa4ff;
  color: #111118;
  border-color: #8aa4ff;
}

.toolbar-input,
.toolbar-select {
  padding: 2px 6px;
  border: 1px solid #2a2a3a;
  border-radius: 3px;
  background: #222230;
  color: #c0c0d0;
  font-size: 11px;
  min-width: 100px;
  font-family: inherit;
}

.toolbar-input:focus,
.toolbar-select:focus {
  outline: none;
  border-color: #6c8cff;
}

.autosave-label {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  color: #555568;
  white-space: nowrap;
  cursor: pointer;
}

.autosave-label input[type="checkbox"] {
  margin: 0;
  accent-color: #6c8cff;
}

.file-input-hidden {
  display: none;
}

/* ── Status ──────────────────────────────────────────── */

.status {
  font-size: 11px;
  padding: 2px 10px 3px;
  border-top: 1px solid #2a2a3a;
}

.status.success {
  color: #6fcf97;
}

.status.error {
  color: #f07070;
}

.status.info {
  color: #555568;
}

/* ── Layout ──────────────────────────────────────────── */

.main-area {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* ── Sidebar ─────────────────────────────────────────── */

.sidebar {
  width: 180px;
  flex-shrink: 0;
  background: #18181f;
  border-right: 1px solid #2a2a3a;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-bottom: 1px solid #2a2a3a;
}

.sidebar-title {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin: 0;
  color: #555568;
}

.sidebar-header .btn-small {
  padding: 0;
  border: 0;
  background: 0;
}

.sidebar-header .tb {
  padding: 1px 6px;
  font-size: 10px;
}

.param-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px;
}

.param-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 6px;
  margin-bottom: 1px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.1s;
}

.param-card:hover {
  background: #222230;
  border-color: #2a2a3a;
}

.param-info {
  display: flex;
  align-items: baseline;
  gap: 6px;
  min-width: 0;
  flex: 1;
}

.param-name-input {
  font-size: 11px;
  font-weight: 600;
  color: #c0c0d0;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 2px;
  padding: 0 2px;
  width: 100%;
  min-width: 0;
  outline: none;
  font-family: "JetBrains Mono", "SF Mono", monospace;
}

.param-name-input:hover {
  border-color: #2a2a3a;
}

.param-name-input:focus {
  border-color: #6c8cff;
  background: #222230;
}

.param-meta {
  font-size: 9px;
  color: #555568;
  white-space: nowrap;
  flex-shrink: 0;
}

.param-remove {
  background: none;
  border: none;
  color: #555568;
  cursor: pointer;
  font-size: 12px;
  padding: 0 3px;
  border-radius: 2px;
  line-height: 1;
  opacity: 0;
  transition: opacity 0.1s;
}

.param-card:hover .param-remove {
  opacity: 1;
}

.param-remove:hover {
  color: #f07070;
}

.param-empty {
  font-size: 10px;
  color: #555568;
  text-align: center;
  padding: 16px 8px;
  line-height: 1.6;
}

/* ── Editor ──────────────────────────────────────────── */

.editor-container {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.rete-editor-canvas {
  width: 100%;
  height: 100%;
}

/* ── Quick-add palette ───────────────────────────────── */

.quick-add-overlay {
  position: absolute;
  inset: 0;
  z-index: 40;
}

.quick-add-menu {
  position: absolute;
  width: 260px;
  max-width: calc(100% - 12px);
  max-height: min(360px, calc(100% - 12px));
  background: #18181f;
  border: 1px solid #2a2a3a;
  border-radius: 6px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.quick-add-header {
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #555568;
  font-weight: 700;
}

.quick-add-search {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #2a2a3a;
  border-radius: 3px;
  background: #222230;
  color: #c0c0d0;
  font-size: 11px;
  padding: 4px 6px;
  font-family: inherit;
}

.quick-add-search:focus {
  outline: none;
  border-color: #6c8cff;
}

.quick-add-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  overflow-y: auto;
}

.quick-add-item {
  width: 100%;
  border: none;
  border-radius: 3px;
  background: transparent;
  color: #c0c0d0;
  cursor: pointer;
  padding: 4px 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  text-align: left;
  font-family: inherit;
}

.quick-add-item:hover {
  background: #222230;
}

.quick-add-type {
  font-size: 11px;
  font-weight: 600;
}

.quick-add-category {
  font-size: 9px;
  color: #555568;
}

.quick-add-empty {
  font-size: 10px;
  color: #555568;
  text-align: center;
  padding: 8px 4px;
}

/* ── Rete.js Connection Overrides ────────────────────── */

:deep(svg[data-testid="connection"] path) {
  stroke: rgba(108, 140, 255, 0.3);
  stroke-width: 1.5px;
  fill: none;
}

:deep(svg[data-testid="connection"]:hover path) {
  stroke: rgba(108, 140, 255, 0.65);
  stroke-width: 2px;
}
</style>
