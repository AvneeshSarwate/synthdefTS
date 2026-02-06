<script setup lang="ts">
import { ref, onMounted } from "vue";
import { BaklavaEditor, useBaklava } from "@baklavajs/renderer-vue";
import type { AbstractNode } from "@baklavajs/core";
import "@baklavajs/themes/dist/syrup-dark.css";
import { allNodeTypes } from "./nodes/ugenNodes";
import { compileGraph } from "./bridge/graphCompiler";
import { generateTypeScript } from "./bridge/codeGenerator";
import { loadFilteredSawGraph } from "./bridge/initialGraph";

const baklava = useBaklava();
const synthDefName = ref("ts_filteredSaw");
const statusMessage = ref("");
const statusType = ref<"success" | "error" | "info">("info");
const sidebarOpen = ref(true);

// Reactive list of Param nodes in the graph
const paramSummary = ref<
  { id: string; name: string; defaultValue: number; rate: string }[]
>([]);

// Track subscriptions so we can clean up
const subscribedNodeIds = new Set<string>();
const SYNC_TOKEN = Symbol("paramSync");

function subscribeToParamNode(node: AbstractNode) {
  if (subscribedNodeIds.has(node.id)) return;
  subscribedNodeIds.add(node.id);

  // Subscribe to name, defaultValue, and rate changes on this node
  for (const key of ["name", "defaultValue", "rate"] as const) {
    const intf = node.inputs[key];
    if (intf) {
      intf.events.setValue.subscribe(SYNC_TOKEN, () => {
        refreshParamSummary();
      });
    }
  }
}

function refreshParamSummary() {
  const nodes = Array.from(baklava.editor.graph.nodes);
  const paramNodes = nodes.filter((n) => n.type === "Param");

  // Subscribe to any new param nodes
  for (const n of paramNodes) {
    subscribeToParamNode(n);
  }

  // Clean up removed nodes
  const currentIds = new Set(paramNodes.map((n) => n.id));
  for (const id of subscribedNodeIds) {
    if (!currentIds.has(id)) subscribedNodeIds.delete(id);
  }

  paramSummary.value = paramNodes.map((n) => ({
    id: n.id,
    name: (n.inputs.name?.value as string) ?? "param",
    defaultValue: (n.inputs.defaultValue?.value as number) ?? 0,
    rate: (n.inputs.rate?.value as string) ?? "control",
  }));
}

function updateParamName(nodeId: string, newName: string) {
  const node = Array.from(baklava.editor.graph.nodes).find(
    (n) => n.id === nodeId
  );
  if (node?.inputs.name) {
    node.inputs.name.value = newName;
  }
}

onMounted(() => {
  for (const nodeType of allNodeTypes) {
    baklava.editor.registerNodeType(nodeType);
  }

  // Load initial filteredSaw graph
  loadFilteredSawGraph(baklava.editor);
  refreshParamSummary();

  // Listen for node add/remove to keep sidebar in sync
  baklava.editor.graph.events.addNode.subscribe(SYNC_TOKEN, () => {
    refreshParamSummary();
  });
  baklava.editor.graph.events.removeNode.subscribe(SYNC_TOKEN, () => {
    refreshParamSummary();
  });
});

function showStatus(msg: string, type: "success" | "error" | "info") {
  statusMessage.value = msg;
  statusType.value = type;
  if (type !== "error") {
    setTimeout(() => {
      statusMessage.value = "";
    }, 4000);
  }
}

function downloadBinary() {
  try {
    const graph = baklava.editor.graph;
    const name = synthDefName.value.trim() || "mySynthDef";
    const result = compileGraph(graph, name);

    const blob = new Blob([result.binary], {
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
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    showStatus(`Compile error: ${msg}`, "error");
  }
}

function downloadTypeScript() {
  try {
    const graph = baklava.editor.graph;
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
  }
}

function addParam() {
  const graph = baklava.editor.graph;
  // Find the Param node type
  for (const [, ntInfo] of baklava.editor.nodeTypes) {
    const testNode = new ntInfo.type();
    if (testNode.type === "Param") {
      const node = new ntInfo.type();
      const added = graph.addNode(node);
      if (added) {
        // Position below existing params
        const existingParams = Array.from(graph.nodes).filter(
          (n) => n.type === "Param"
        );
        added.position.x = 50;
        added.position.y = (existingParams.length - 1) * 120 + 50;
        added.inputs.name!.value = `param${existingParams.length}`;
      }
      break;
    }
  }
  refreshParamSummary();
}

function focusParam(nodeId: string) {
  const node = Array.from(baklava.editor.graph.nodes).find(
    (n) => n.id === nodeId
  );
  if (node) {
    // Select the node
    baklava.editor.graph.selectedNodes = [node];
  }
}

function removeParam(nodeId: string) {
  const node = Array.from(baklava.editor.graph.nodes).find(
    (n) => n.id === nodeId
  );
  if (node) {
    baklava.editor.graph.removeNode(node);
  }
  refreshParamSummary();
}
</script>

<template>
  <div class="app-container">
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
      </div>
      <div v-if="statusMessage" class="status" :class="statusType">
        {{ statusMessage }}
      </div>
    </header>
    <div class="main-area">
      <!-- Parameter sidebar -->
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
                :value="param.name"
                @input="updateParamName(param.id, ($event.target as HTMLInputElement).value)"
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
      <!-- Graph editor -->
      <div class="editor-container">
        <BaklavaEditor :view-model="baklava" />
      </div>
    </div>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  background: #1a1a2e;
  color: #e0e0e0;
}

#app {
  width: 100%;
  height: 100%;
}

.app-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

/* ── Toolbar ─────────────────────────────────────────────── */

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

.btn {
  padding: 5px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
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

/* ── Main area ───────────────────────────────────────────── */

.main-area {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* ── Sidebar ─────────────────────────────────────────────── */

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

/* ── Editor container ────────────────────────────────────── */

.editor-container {
  flex: 1;
  position: relative;
  overflow: hidden;
}
</style>
