<script setup lang="ts">
import NodeEditorRoot from "./nodeEditor/NodeEditorRoot.vue";
</script>

<template>
  <NodeEditorRoot />
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
