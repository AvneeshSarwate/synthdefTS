import { computed, ref, type Ref } from "vue";
import type { ReteEditorSession } from "./reteEditor";

export interface ParamSummaryEntry {
  id: string;
  name: string;
  defaultValue: number;
  rate: string;
}

export function useParamSidebarBridge(
  session: Ref<ReteEditorSession | null>,
  graphVersion: Ref<number>
) {
  const editingParamId = ref<string | null>(null);

  const paramSummary = computed<ParamSummaryEntry[]>(() => {
    graphVersion.value;
    const activeSession = session.value;
    if (!activeSession) {
      return [];
    }
    return activeSession.getParamSummary();
  });

  const startEditingName = (nodeId: string) => {
    editingParamId.value = nodeId;
  };

  const stopEditingName = (nodeId: string) => {
    if (editingParamId.value === nodeId) {
      editingParamId.value = null;
    }
  };

  const updateParamName = (nodeId: string, newName: string) => {
    void session.value?.setNodeInputValue(nodeId, "name", newName);
  };

  const focusParam = (nodeId: string) => {
    void session.value?.focusNode(nodeId);
  };

  const removeParam = (nodeId: string) => {
    void session.value?.removeNode(nodeId);
    if (editingParamId.value === nodeId) {
      editingParamId.value = null;
    }
  };

  const addParam = () => {
    void session.value?.addParam();
  };

  return {
    paramSummary,
    addParam,
    focusParam,
    removeParam,
    updateParamName,
    startEditingName,
    stopEditingName,
    editingParamId,
  };
}
