<script setup lang="ts">
import AgentTestHarness from "./AgentTestHarness.vue";
import NodeEditorRoot from "./nodeEditor/NodeEditorRoot.vue";

const isAgentTestHarness =
  typeof window !== "undefined" &&
  (window.location.pathname === "/test-harness" ||
    window.location.pathname.startsWith("/test-harness/"));
</script>

<template>
  <AgentTestHarness v-if="isAgentTestHarness" />
  <NodeEditorRoot v-else />
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
</style>
