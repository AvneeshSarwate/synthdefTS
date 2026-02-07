import { defineCustomElement } from 'vue'
import NodeEditorRoot from './NodeEditorRoot.vue'

const tagName = 'node-editor-component'

const NodeEditorElement = defineCustomElement(NodeEditorRoot)

if (!customElements.get(tagName)) {
  customElements.define(tagName, NodeEditorElement)
}

export { NodeEditorElement }
export type {
  NodeEditorStateSnapshot,
  NodeEditorComponentSnapshot,
  NodeEditorFullState
} from './nodeEditorState'
