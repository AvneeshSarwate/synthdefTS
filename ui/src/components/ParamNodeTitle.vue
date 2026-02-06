<script setup lang="ts">
import { ref } from "vue";
import type { AbstractNode } from "@baklavajs/core";
import { Components as BaklavaComponents } from "@baklavajs/renderer-vue";

const BaklavaContextMenu = BaklavaComponents.ContextMenu;

const props = defineProps<{
  node: AbstractNode;
  selected: boolean;
  onSelect: (event?: unknown) => void;
  onStartDrag: (ev: PointerEvent) => void;
}>();

const showContextMenu = ref(false);
const contextMenuItems = [{ value: "delete", label: "Delete" }];

function startDrag(ev: PointerEvent) {
  if (!props.selected) {
    props.onSelect(undefined);
  }
  props.onStartDrag(ev);
}

function openContextMenu() {
  showContextMenu.value = true;
}

function onContextMenuClick(action: string) {
  if (action === "delete") {
    props.node.graph?.removeNode(props.node);
  }
  showContextMenu.value = false;
}
</script>

<template>
  <div
    class="__title"
    @pointerdown.self.stop="startDrag"
    @contextmenu.prevent="openContextMenu"
  >
    <div class="__title-label">{{ node.title }}</div>
    <div class="__menu">
      <button
        class="param-node-menu-btn"
        type="button"
        @click.stop="openContextMenu"
        title="Node menu"
      >
        ⋮
      </button>
      <BaklavaContextMenu
        v-model="showContextMenu"
        :items="contextMenuItems"
        :x="0"
        :y="0"
        @click="onContextMenuClick"
      />
    </div>
  </div>
</template>

<style scoped>
.param-node-menu-btn {
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 0 4px;
}
</style>
