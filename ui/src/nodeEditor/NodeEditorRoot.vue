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

    return {
      name: "NodeEditor",
      tagName: "node-editor-component",
      state: getState(),
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
  <div ref="editorContainer" class="node-editor-root" :style="containerStyle">
    <header class="toolbar">
      <h1 class="title">SynthDef Editor</h1>
      <div class="toolbar-controls">
        <label class="name-label">
          Name:
          <input
            v-model="synthDefName"
            class="name-input"
            placeholder="mySynthDef"
          />
        </label>

        <input
          v-model="nodeTypeSearch"
          class="node-search-input"
          placeholder="Filter node types"
        />

        <select v-model="selectedNodeType" class="node-type-select">
          <option
            v-for="option in filteredNodeTypeOptions"
            :key="option.type"
            :value="option.type"
          >
            {{ option.category }} / {{ option.title }}
          </option>
        </select>

        <button class="btn btn-small btn-primary" @click="addSelectedNode">
          + Node
        </button>

        <button
          class="btn btn-ghost"
          :disabled="!canUndoState"
          @click="undo"
        >
          Undo
        </button>
        <button
          class="btn btn-ghost"
          :disabled="!canRedoState"
          @click="redo"
        >
          Redo
        </button>
        <button class="btn btn-ghost" @click="downloadGraphJSON">
          Save Graph JSON
        </button>
        <button class="btn btn-ghost" @click="triggerGraphUpload">
          Load Graph JSON
        </button>
        <button class="btn btn-ghost" @click="loadAutoSavedGraph">
          Load Auto-save
        </button>
        <label class="autosave-label">
          <input
            v-model="autoSaveEnabled"
            type="checkbox"
          />
          Auto-save
        </label>
        <button class="btn btn-primary" @click="downloadBinary">
          Download .scsyndef
        </button>
        <button class="btn btn-secondary" @click="downloadTypeScript">
          Download .ts
        </button>
        <button
          class="btn btn-ghost"
          @click="sidebarOpen = !sidebarOpen"
        >
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
      <aside v-if="sidebarOpen" class="sidebar">
        <div class="sidebar-header">
          <h2 class="sidebar-title">Parameters</h2>
          <button class="btn btn-small btn-primary" @click="addParam">
            + Add
          </button>
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
        @contextmenu="onEditorContextMenu"
      >
        <div ref="reteCanvas" class="rete-editor-canvas" />
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
.node-editor-root {
  display: flex;
  flex-direction: column;
  background: #1a1a2e;
  color: #e0e0e0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 16px;
  background: #16213e;
  border-bottom: 1px solid #0f3460;
  flex-shrink: 0;
  z-index: 100;
}

.title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  color: #e94560;
}

.toolbar-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.name-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #a0a0b8;
}

.name-input {
  padding: 4px 8px;
  border: 1px solid #0f3460;
  border-radius: 4px;
  background: #1a1a2e;
  color: #e0e0e0;
  font-size: 13px;
  width: 160px;
}

.name-input:focus {
  outline: none;
  border-color: #e94560;
}

.node-search-input,
.node-type-select {
  padding: 4px 8px;
  border: 1px solid #0f3460;
  border-radius: 4px;
  background: #1a1a2e;
  color: #e0e0e0;
  font-size: 12px;
  min-width: 160px;
}

.node-search-input:focus,
.node-type-select:focus {
  outline: none;
  border-color: #e94560;
}

.btn {
  padding: 5px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}

.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.btn-primary {
  background: #e94560;
  color: white;
}

.btn-primary:hover {
  background: #d63851;
}

.btn-secondary {
  background: #0f3460;
  color: #a0c4ff;
}

.btn-secondary:hover {
  background: #1a4a7a;
}

.btn-ghost {
  background: transparent;
  color: #a0a0b8;
  border: 1px solid #333;
}

.btn-ghost:hover {
  background: #222;
}

.btn-small {
  padding: 3px 8px;
  font-size: 11px;
}

.autosave-label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #a0a0b8;
  white-space: nowrap;
}

.file-input-hidden {
  display: none;
}

.status {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 4px;
  white-space: nowrap;
}

.status.success {
  background: #1b4332;
  color: #95d5b2;
}

.status.error {
  background: #6b0f1a;
  color: #ffb3b3;
}

.status.info {
  background: #1a1a2e;
  color: #a0a0b8;
}

.main-area {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 240px;
  flex-shrink: 0;
  background: #16213e;
  border-right: 1px solid #0f3460;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-bottom: 1px solid #0f3460;
}

.sidebar-title {
  font-size: 13px;
  font-weight: 600;
  margin: 0;
  color: #a0c4ff;
}

.param-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.param-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  margin-bottom: 4px;
  background: #1a1a2e;
  border: 1px solid #0f3460;
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.15s;
}

.param-card:hover {
  border-color: #e94560;
}

.param-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.param-name-input {
  font-size: 12px;
  font-weight: 600;
  color: #e0e0e0;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 2px;
  padding: 1px 3px;
  width: 100%;
  min-width: 0;
  outline: none;
  font-family: inherit;
}

.param-name-input:hover {
  border-color: #333;
}

.param-name-input:focus {
  border-color: #e94560;
  background: #1a1a2e;
}

.param-meta {
  font-size: 10px;
  color: #6b7280;
}

.param-remove {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 14px;
  padding: 2px 4px;
  border-radius: 2px;
  line-height: 1;
}

.param-remove:hover {
  color: #e94560;
  background: #2a1a2e;
}

.param-empty {
  font-size: 11px;
  color: #6b7280;
  text-align: center;
  padding: 20px 10px;
  line-height: 1.6;
}

.editor-container {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.rete-editor-canvas {
  width: 100%;
  height: 100%;
}

.quick-add-overlay {
  position: absolute;
  inset: 0;
  z-index: 40;
}

.quick-add-menu {
  position: absolute;
  width: 320px;
  max-width: calc(100% - 16px);
  max-height: min(420px, calc(100% - 16px));
  background: #111827;
  border: 1px solid #2b3346;
  border-radius: 8px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quick-add-header {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #9ca3af;
}

.quick-add-search {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #374151;
  border-radius: 6px;
  background: #0f172a;
  color: #e5e7eb;
  font-size: 12px;
  padding: 6px 8px;
}

.quick-add-search:focus {
  outline: none;
  border-color: #4f6df5;
}

.quick-add-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
}

.quick-add-item {
  width: 100%;
  border: 1px solid #273247;
  border-radius: 6px;
  background: #111c31;
  color: #dbe2f4;
  cursor: pointer;
  padding: 6px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  text-align: left;
}

.quick-add-item:hover {
  border-color: #4368f8;
  background: #172543;
}

.quick-add-type {
  font-size: 12px;
  font-weight: 600;
}

.quick-add-category {
  font-size: 10px;
  color: #9fb0d6;
}

.quick-add-empty {
  font-size: 11px;
  color: #6b7280;
  text-align: center;
  padding: 10px 6px;
}
</style>
