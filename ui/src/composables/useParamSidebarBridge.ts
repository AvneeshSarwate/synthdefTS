import { computed, onMounted, onUnmounted, ref } from "vue";
import type { AbstractNode } from "@baklavajs/core";
import type { IBaklavaViewModel } from "@baklavajs/renderer-vue";

export interface ParamSummaryEntry {
  id: string;
  name: string;
  defaultValue: number;
  rate: string;
}

const PARAM_NODE_TYPE = "Param";
const PARAM_SYNC_TOKEN = Symbol("paramSidebarBridge");

function isParamNode(node: AbstractNode): boolean {
  return node.type === PARAM_NODE_TYPE;
}

function getParamName(node: AbstractNode): string {
  return (node.inputs.name?.value as string) ?? "param";
}

function isSidebarNameInputFocused(nodeId: string): boolean {
  const active = document.activeElement as HTMLElement | null;
  return (
    !!active &&
    active.classList.contains("param-name-input") &&
    active.getAttribute("data-param-id") === nodeId
  );
}

export function useParamSidebarBridge(baklava: IBaklavaViewModel) {
  const graphVersion = ref(0);
  const editingParamId = ref<string | null>(null);
  const nameDrafts = ref<Record<string, string>>({});

  const touchGraph = () => {
    graphVersion.value += 1;
  };

  const getParamNodes = (): AbstractNode[] =>
    Array.from(baklava.editor.graph.nodes).filter(isParamNode);

  const findParamNode = (nodeId: string): AbstractNode | undefined =>
    Array.from(baklava.editor.graph.nodes).find(
      (n) => n.id === nodeId && isParamNode(n)
    );

  const clearNameDraft = (nodeId: string) => {
    if (nameDrafts.value[nodeId] !== undefined) {
      delete nameDrafts.value[nodeId];
    }
  };

  const clearEditingState = (nodeId: string) => {
    if (editingParamId.value === nodeId) {
      editingParamId.value = null;
    }
    clearNameDraft(nodeId);
  };

  const paramSummary = computed<ParamSummaryEntry[]>(() => {
    void graphVersion.value;
    const params = getParamNodes();
    return params.map((node) => {
      const draft = nameDrafts.value[node.id];
      const preserveDraft =
        editingParamId.value === node.id &&
        draft !== undefined &&
        isSidebarNameInputFocused(node.id);

      return {
        id: node.id,
        name: preserveDraft ? draft : getParamName(node),
        defaultValue: (node.inputs.defaultValue?.value as number) ?? 0,
        rate: (node.inputs.rate?.value as string) ?? "control",
      };
    });
  });

  const onNodeAdded = (node: AbstractNode) => {
    if (isParamNode(node)) {
      touchGraph();
    }
  };

  const onNodeRemoved = (node: AbstractNode) => {
    if (isParamNode(node)) {
      clearEditingState(node.id);
      touchGraph();
    }
  };

  const onNodeUpdated = (
    data: { name?: string } | null,
    node: AbstractNode
  ) => {
    if (
      isParamNode(node) &&
      (data === null ||
        data?.name === "name" ||
        data?.name === "defaultValue" ||
        data?.name === "rate")
    ) {
      touchGraph();
    }
  };

  onMounted(() => {
    baklava.editor.graph.events.addNode.subscribe(PARAM_SYNC_TOKEN, onNodeAdded);
    baklava.editor.graph.events.removeNode.subscribe(
      PARAM_SYNC_TOKEN,
      onNodeRemoved
    );
    baklava.editor.nodeEvents.update.subscribe(PARAM_SYNC_TOKEN, onNodeUpdated);
    touchGraph();
  });

  onUnmounted(() => {
    baklava.editor.graph.events.addNode.unsubscribe(PARAM_SYNC_TOKEN);
    baklava.editor.graph.events.removeNode.unsubscribe(PARAM_SYNC_TOKEN);
    baklava.editor.nodeEvents.update.unsubscribe(PARAM_SYNC_TOKEN);
  });

  const startEditingName = (nodeId: string) => {
    editingParamId.value = nodeId;
    const node = findParamNode(nodeId);
    nameDrafts.value[nodeId] = node ? getParamName(node) : "param";
  };

  const stopEditingName = (nodeId: string) => {
    if (editingParamId.value === nodeId) {
      editingParamId.value = null;
    }
    clearNameDraft(nodeId);
  };

  const updateParamName = (nodeId: string, newName: string) => {
    nameDrafts.value[nodeId] = newName;
    const node = findParamNode(nodeId);
    if (node?.inputs.name) {
      node.inputs.name.value = newName;
    }
    touchGraph();
  };

  const focusParam = (nodeId: string) => {
    const node = findParamNode(nodeId);
    if (node) {
      baklava.editor.graph.selectedNodes = [node];
    }
  };

  const removeParam = (nodeId: string) => {
    const node = findParamNode(nodeId);
    if (node) {
      baklava.editor.graph.removeNode(node);
    }
    clearEditingState(nodeId);
    touchGraph();
  };

  const addParam = () => {
    const graph = baklava.editor.graph;
    const existingParamCount = getParamNodes().length;
    for (const [, ntInfo] of baklava.editor.nodeTypes) {
      const testNode = new ntInfo.type();
      if (testNode.type === PARAM_NODE_TYPE) {
        const node = new ntInfo.type();
        const added = graph.addNode(node);
        if (added) {
          added.position.x = 50;
          added.position.y = existingParamCount * 120 + 50;
          const nextName = `param${existingParamCount}`;
          if (added.inputs.name) {
            added.inputs.name.value = nextName;
          }
        }
        break;
      }
    }
    touchGraph();
  };

  return {
    paramSummary,
    addParam,
    focusParam,
    removeParam,
    updateParamName,
    startEditingName,
    stopEditingName,
    touchGraph,
  };
}
