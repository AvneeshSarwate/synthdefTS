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
  const nameDrafts = ref<Record<string, string>>({});

  const paramSummary = computed<ParamSummaryEntry[]>(() => {
    graphVersion.value;
    const activeSession = session.value;
    if (!activeSession) {
      return [];
    }
    return activeSession.getParamSummary().map((param) => ({
      ...param,
      name: nameDrafts.value[param.id] ?? param.name,
    }));
  });

  const startEditingName = (nodeId: string) => {
    editingParamId.value = nodeId;
    if (!(nodeId in nameDrafts.value)) {
      const currentName =
        session.value?.getParamSummary().find((entry) => entry.id === nodeId)?.name ??
        "param";
      nameDrafts.value = {
        ...nameDrafts.value,
        [nodeId]: currentName,
      };
    }
  };

  const updateParamName = (nodeId: string, newName: string) => {
    nameDrafts.value = {
      ...nameDrafts.value,
      [nodeId]: newName,
    };
  };

  const commitParamName = (nodeId: string) => {
    const draft = nameDrafts.value[nodeId];
    const currentName = session.value
      ?.getParamSummary()
      .find((entry) => entry.id === nodeId)?.name;

    if (typeof draft === "string" && draft !== currentName) {
      void session.value?.setNodeInputValue(nodeId, "name", draft);
    }

    if (nodeId in nameDrafts.value) {
      const nextDrafts = { ...nameDrafts.value };
      delete nextDrafts[nodeId];
      nameDrafts.value = nextDrafts;
    }

    if (editingParamId.value === nodeId) {
      editingParamId.value = null;
    }
  };

  const stopEditingName = (nodeId: string) => {
    commitParamName(nodeId);
  };

  const focusParam = (nodeId: string) => {
    void session.value?.focusNode(nodeId);
  };

  const removeParam = (nodeId: string) => {
    void session.value?.removeNode(nodeId);
    if (nodeId in nameDrafts.value) {
      const nextDrafts = { ...nameDrafts.value };
      delete nextDrafts[nodeId];
      nameDrafts.value = nextDrafts;
    }
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
    commitParamName,
    startEditingName,
    stopEditingName,
    editingParamId,
  };
}
