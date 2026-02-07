/**
 * Node Editor - Main exports
 *
 * This module follows the component isolation pattern from avTools/apps/browser-projections
 * for compatibility with the agentic UI improvement loop.
 */

// Types
export * from './nodeEditorState'
export * from './graphTypes'

// Composables
export { useParamSidebarBridge } from './useParamSidebarBridge'
export type { ParamSummaryEntry } from './useParamSidebarBridge'

// Undo/redo
export { NodeEditorCommandStack } from './commandStack'

// Main component
export { default as NodeEditorRoot } from './NodeEditorRoot.vue'

// Web component registration (import this to register the custom element)
// import './nodeEditor/web-component'
