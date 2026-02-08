<script setup lang="ts">
defineProps<{
  data: unknown;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  path?: string;
}>();
</script>

<template>
  <svg class="rc" data-testid="connection">
    <path class="rc-path" :d="path ?? ''" />
  </svg>
</template>

<style scoped>
/* Keep the same layout behavior as Rete classic connection wrapper. */
.rc {
  overflow: visible !important;
  position: absolute;
  pointer-events: none;
  width: 9999px;
  height: 9999px;
}

.rc-path {
  fill: none;
  stroke: rgba(108, 140, 255, 0.3);
  stroke-width: 1.5px;
  pointer-events: auto;
  transition: stroke 0.12s ease, stroke-width 0.12s ease;
}

.rc-path:hover {
  stroke: rgba(108, 140, 255, 0.65);
  stroke-width: 2px;
}
</style>
