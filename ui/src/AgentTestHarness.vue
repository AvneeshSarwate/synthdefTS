<script setup lang="ts">
import NodeEditorRoot from "./nodeEditor/NodeEditorRoot.vue";

function parseDimension(raw: string | null, fallback: number): number {
  if (!raw) {
    return fallback;
  }
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }
  return Math.round(parsed);
}

const params = typeof window !== "undefined"
  ? new URLSearchParams(window.location.search)
  : new URLSearchParams();

const scenario = params.get("scenario") ?? "node-editor-default";
const width = parseDimension(params.get("width"), 1360);
const height = parseDimension(params.get("height"), 820);
</script>

<template>
  <div
    class="agent-test-harness"
    data-agent-harness="true"
    :data-agent-scenario="scenario"
  >
    <header class="harness-header">
      <div class="harness-title">Agent Test Harness</div>
      <div class="harness-meta">
        scenario=<code>{{ scenario }}</code> size=<code>{{ width }}x{{ height }}</code>
      </div>
    </header>

    <main class="harness-main">
      <section class="harness-panel" data-agent-panel="node-editor">
        <NodeEditorRoot
          :width="width"
          :height="height"
          :auto-save-to-local-storage="false"
          :auto-load-from-local-storage="false"
          initial-synth-def-name="agentHarnessSynth"
        />
      </section>
    </main>
  </div>
</template>

<style scoped>
.agent-test-harness {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(circle at 20% 0%, rgba(69, 91, 255, 0.2), transparent 45%),
    radial-gradient(circle at 85% 100%, rgba(0, 187, 249, 0.15), transparent 50%),
    #0b1020;
  color: #d8e4ff;
  overflow: auto;
}

.harness-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  border-bottom: 1px solid rgba(115, 145, 255, 0.25);
  background: rgba(10, 15, 34, 0.8);
  backdrop-filter: blur(3px);
  flex-shrink: 0;
}

.harness-title {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.harness-meta {
  font-size: 12px;
  color: #9db1ea;
}

.harness-meta code {
  color: #dbe8ff;
  font-family: "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
}

.harness-main {
  flex: 1;
  padding: 14px;
  min-height: 0;
}

.harness-panel {
  width: fit-content;
  border: 1px solid rgba(115, 145, 255, 0.25);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.45);
}
</style>
