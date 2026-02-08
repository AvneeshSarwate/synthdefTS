<script lang="ts">
import { Ref } from "rete-vue-plugin";

function sortByIndex(
  entries: [string, { index?: number }][]
): [string, any][] {
  entries.sort(
    (a, b) => ((a[1] && a[1].index) || 0) - ((b[1] && b[1].index) || 0)
  );
  return entries;
}

export default {
  props: ["data", "emit", "seed"],
  components: { Ref },
  methods: {
    nodeStyle() {
      return {
        width: Number.isFinite(this.data.width)
          ? `${this.data.width}px`
          : "140px",
      };
    },
    inputs() {
      return sortByIndex(Object.entries(this.data.inputs));
    },
    controls() {
      return sortByIndex(Object.entries(this.data.controls));
    },
    outputs() {
      return sortByIndex(Object.entries(this.data.outputs));
    },
  },
};
</script>

<template>
  <div
    class="sn"
    :class="{ selected: data.selected }"
    :style="nodeStyle()"
    data-testid="node"
  >
    <div class="sn-title" data-testid="title">{{ data.label }}</div>

    <div
      v-for="[key, output] in outputs()"
      :key="'o-' + key + seed"
      class="sn-output"
      data-testid="output"
    >
      <span class="sn-port-label">{{ output.label }}</span>
      <Ref
        class="sn-socket sn-socket-out"
        data-testid="output-socket"
        :data="{
          type: 'socket',
          side: 'output',
          key,
          nodeId: data.id,
          payload: output.socket,
        }"
        :emit="emit"
      />
    </div>

    <Ref
      v-for="[key, control] in controls()"
      :key="'c-' + key + seed"
      class="sn-control"
      data-testid="control"
      :emit="emit"
      :data="{ type: 'control', payload: control }"
    />

    <div
      v-for="[key, input] in inputs()"
      :key="'i-' + key + seed"
      class="sn-input"
      data-testid="input"
    >
      <Ref
        class="sn-socket sn-socket-in"
        data-testid="input-socket"
        :data="{
          type: 'socket',
          side: 'input',
          key,
          nodeId: data.id,
          payload: input.socket,
        }"
        :emit="emit"
      />
      <span
        v-show="!input.control || !input.showControl"
        class="sn-port-label"
        data-testid="input-title"
      >
        {{ input.label }}
      </span>
      <Ref
        v-show="input.control && input.showControl"
        class="sn-input-ctrl"
        data-testid="input-control"
        :emit="emit"
        :data="{ type: 'control', payload: input.control }"
      />
    </div>
  </div>
</template>

<style scoped>
/* ── Node shell ──────────────────────────────────── */
.sn {
  background: #16161e;
  border: 1px solid #2a2a3a;
  border-radius: 3px;
  font-family: "JetBrains Mono", "SF Mono", "Cascadia Code", monospace;
  font-size: 10px;
  color: #c0c0d0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  cursor: grab;
  user-select: none;
}

.sn:hover {
  border-color: #3a3a4a;
}

.sn.selected {
  border-color: #6c8cff;
  box-shadow: 0 0 0 1px rgba(108, 140, 255, 0.2), 0 1px 4px rgba(0, 0, 0, 0.35);
}

/* ── Title ───────────────────────────────────────── */
.sn-title {
  font-size: 10px;
  font-weight: 600;
  color: #c0c0d0;
  padding: 3px 6px;
  background: #1a1a26;
  border-bottom: 1px solid #2a2a3a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}

/* ── Output rows ─────────────────────────────────── */
.sn-output {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1px 0 1px 6px;
  min-height: 16px;
}

/* ── Input rows ──────────────────────────────────── */
.sn-input {
  display: flex;
  align-items: center;
  padding: 1px 6px 1px 0;
  min-height: 16px;
}

/* ── Port labels ─────────────────────────────────── */
.sn-port-label {
  font-size: 9px;
  color: #666680;
  padding: 0 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1;
}

/* ── Socket wrappers ─────────────────────────────── */
.sn-socket {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Standalone controls ─────────────────────────── */
.sn-control {
  padding: 1px 6px;
}

/* ── Input-inline controls ───────────────────────── */
.sn-input-ctrl {
  flex: 1;
  min-width: 0;
}

/* ── Input/select overrides inside this node ─────── */
.sn :deep(input[type="number"]),
.sn :deep(input[type="text"]) {
  width: 100%;
  box-sizing: border-box;
  background: #111118;
  color: #c0c0d0;
  border: 1px solid #2a2a3a;
  border-radius: 2px;
  font-family: "JetBrains Mono", "SF Mono", monospace;
  font-size: 10px;
  padding: 1px 4px;
  outline: none;
  appearance: textfield;
  -moz-appearance: textfield;
}

.sn :deep(input:focus) {
  border-color: #6c8cff;
}

.sn :deep(input::-webkit-inner-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}

.sn :deep(select) {
  width: 100%;
  box-sizing: border-box;
  background: #111118;
  color: #c0c0d0;
  border: 1px solid #2a2a3a;
  border-radius: 2px;
  font-family: "JetBrains Mono", "SF Mono", monospace;
  font-size: 10px;
  padding: 1px 4px;
  outline: none;
  cursor: pointer;
}

.sn :deep(select:focus) {
  border-color: #6c8cff;
}

.sn :deep(select option) {
  background: #18181f;
  color: #c0c0d0;
}
</style>
