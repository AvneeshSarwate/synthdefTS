# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Agent Design Loop (Styling)

- Open `http://localhost:5173/test-harness` to use the isolated styling harness.
- Optional query params:
  - `scenario` (string label)
  - `width` (editor width in px)
  - `height` (editor height in px)
- Capture structured state in dev tools / browser automation:
  - `window.__agentSnapshot()`
  - `window.__agentSnapshotById("node-editor")`
  - `window.__agentComponentIds()`

The harness and snapshot hooks are intended for visual/style iteration only and are isolated from compile/codegen/editor API behavior.
