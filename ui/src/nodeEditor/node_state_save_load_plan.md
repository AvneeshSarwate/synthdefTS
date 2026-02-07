# Node Editor State Management Implementation Plan

## Current State

The node editor component has been factored out following the avTools component isolation pattern, but lacks:
- Full state serialization/deserialization (get/set state)
- Undo/redo functionality
- Integration with the existing ugen generation pipeline for Baklava node types

## Part 1: Baklava Graph Serialization

### Baklava Native API

Baklava provides built-in serialization via:

```typescript
// Save: Returns IGraphState object
const state = graph.save();
const json = JSON.stringify(state);

// Load: Accepts IGraphState, returns warnings array
const warnings = graph.load(JSON.parse(json));
```

**IGraphState Structure:**
```typescript
interface IGraphState {
  id: string;
  nodes: INodeState[];  // Array of node.save() results
  connections: {
    id: string;
    from: string;  // Source interface ID
    to: string;    // Target interface ID
  }[];
  inputs: [];   // Deprecated
  outputs: [];  // Deprecated
}
```

### Implementation Steps

#### 1.1 Add Serialization to nodeEditorState.ts

```typescript
// New types
export interface NodeEditorFullState {
  synthDefName: string;
  graphState: unknown;  // Baklava IGraphState
  version: number;      // For migration compatibility
}

// Capture function using Baklava native API
export function captureFullState(
  graph: Graph,
  synthDefName: string
): NodeEditorFullState {
  return {
    synthDefName,
    graphState: graph.save(),
    version: 1,
  };
}

// Restore function
export function restoreFullState(
  editor: Editor,
  state: NodeEditorFullState
): string[] {
  const warnings = editor.graph.load(state.graphState);
  return warnings;
}
```

#### 1.2 Update NodeEditorRoot.vue

Add to `defineExpose()`:
```typescript
defineExpose({
  // Existing
  getState: () => captureNodeEditorState(...),

  // New - full serialization
  getFullState: () => captureFullState(baklava.editor.graph, synthDefName.value),
  setFullState: (state: NodeEditorFullState) => {
    synthDefName.value = state.synthDefName;
    const warnings = restoreFullState(baklava.editor, state);
    touchGraph();
    emitStateUpdate();
    return warnings;
  },

  // JSON convenience methods
  saveToJSON: () => JSON.stringify(captureFullState(...)),
  loadFromJSON: (json: string) => {
    const state = JSON.parse(json);
    return setFullState(state);
  },
});
```

#### 1.3 Add Persistence UI

- Download/Upload buttons for graph state (like Canvas component)
- localStorage auto-save option
- Initial state prop for loading saved graphs

---

## Part 2: Undo/Redo Command Stack

### Important Note: Baklava Does NOT Have Built-in Undo/Redo

Verified by searching the Baklava package source - there is no history, undo, or command stack functionality. We need to implement this ourselves using Baklava's graph events and save/load API.

### Pattern from avTools

The Canvas and PianoRoll components use a `CommandStack` class:
- Captures state before/after each action
- Maintains undo/redo stacks of state snapshots
- Provides `executeCommand(name, action)` wrapper

### Implementation Steps

#### 2.1 Create CommandStack for Node Editor

```typescript
// nodeEditor/commandStack.ts
export class NodeEditorCommandStack {
  private undoStack: NodeEditorFullState[] = [];
  private redoStack: NodeEditorFullState[] = [];
  private captureState: () => NodeEditorFullState;
  private restoreState: (state: NodeEditorFullState) => void;
  private onChange: () => void;

  constructor(config: {
    captureState: () => NodeEditorFullState;
    restoreState: (state: NodeEditorFullState) => void;
    onChange: () => void;
  }) { ... }

  executeCommand(name: string, action: () => void): void {
    const before = this.captureState();
    action();
    const after = this.captureState();
    if (JSON.stringify(before) !== JSON.stringify(after)) {
      this.undoStack.push(before);
      this.redoStack = [];
      this.onChange();
    }
  }

  undo(): void { ... }
  redo(): void { ... }
  canUndo(): boolean { ... }
  canRedo(): boolean { ... }
}
```

#### 2.2 Integrate with Node Editor

Key points:
- Hook into Baklava graph events (`addNode`, `removeNode`, `addConnection`, `removeConnection`)
- Wrap node input changes with command stack
- Add keyboard shortcuts (Ctrl+Z, Ctrl+Shift+Z)
- Add Undo/Redo buttons to toolbar

#### 2.3 Graph Event Subscription

```typescript
// In NodeEditorRoot.vue onMounted()
const graphEvents = baklava.editor.graph.events;

graphEvents.addNode.subscribe(COMMAND_TOKEN, (node) => {
  commandStack.captureAfterChange('Add Node');
});

graphEvents.removeNode.subscribe(COMMAND_TOKEN, (node) => {
  commandStack.captureAfterChange('Remove Node');
});

// Similar for connections
```

---

## Part 2.5: Parameter Sidebar Architecture (Critical Fix)

### Current Problem

The `useParamSidebarBridge` composable maintains its own reactive state:
- `graphVersion` - manual counter to trigger reactivity
- `nameDrafts` - local cache of parameter names being edited
- `editingParamId` - tracks which param is being edited

This creates potential desync issues between the sidebar UI and the actual Baklava graph state.

### Correct Architecture

**Baklava Graph must be the single source of truth.**

```
┌─────────────────────────────────────────────────────────┐
│                  Baklava Graph                          │
│               (source of truth)                         │
│  - nodes, connections, input values                     │
└─────────────────────────────────────────────────────────┘
        │                              ▲
        │ (read via computed)          │ (write via graph API)
        ▼                              │
┌─────────────────────────────────────────────────────────┐
│              Parameter Sidebar                          │
│            (derived view only)                          │
│  - displays Param nodes from graph                      │
│  - edits go through baklava.editor.graph.nodes          │
└─────────────────────────────────────────────────────────┘
        │
        │ (triggers on graph change)
        ▼
┌─────────────────────────────────────────────────────────┐
│              Command Stack                              │
│  - captures before/after snapshots                      │
│  - provides undo/redo                                   │
└─────────────────────────────────────────────────────────┘
```

### Refactored useParamSidebarBridge

```typescript
export function useParamSidebarBridge(baklava: IBaklavaViewModel) {
  // NO local state for param data - derive everything from graph

  // Computed that reads directly from Baklava graph
  const paramSummary = computed<ParamSummaryEntry[]>(() => {
    // Force reactivity by reading graph.nodes (Baklava uses Vue reactivity)
    const nodes = Array.from(baklava.editor.graph.nodes);

    return nodes
      .filter(n => n.type === "Param")
      .map(node => ({
        id: node.id,
        name: node.inputs.name?.value as string ?? "param",
        defaultValue: node.inputs.defaultValue?.value as number ?? 0,
        rate: node.inputs.rate?.value as string ?? "control",
      }));
  });

  // Actions that modify graph directly (undo/redo will capture these)
  const updateParamName = (nodeId: string, newName: string) => {
    const node = baklava.editor.graph.nodes.find(n => n.id === nodeId);
    if (node?.inputs.name) {
      node.inputs.name.value = newName;  // Baklava reactivity handles the rest
    }
  };

  const addParam = () => {
    // ... create node via baklava.editor.graph.addNode(...)
    // Graph events will trigger command stack snapshot
  };

  const removeParam = (nodeId: string) => {
    const node = baklava.editor.graph.nodes.find(n => n.id === nodeId);
    if (node) {
      baklava.editor.graph.removeNode(node);
      // Graph events will trigger command stack snapshot
    }
  };

  // Only local UI state needed: which input is currently focused
  const editingParamId = ref<string | null>(null);

  return {
    paramSummary,  // Derived from graph
    updateParamName,
    addParam,
    removeParam,
    focusParam,
    editingParamId,  // UI-only state
  };
}
```

### Key Changes

1. **Remove `graphVersion` counter** - Baklava's graph is already reactive
2. **Remove `nameDrafts` cache** - Read directly from node.inputs.name.value
3. **Keep `editingParamId`** - This is legitimate UI state (which field is focused)
4. **All mutations go through Baklava API** - So undo/redo captures them

### Integration with Command Stack

The command stack hooks into Baklava graph events:
- `graph.events.addNode` → capture snapshot
- `graph.events.removeNode` → capture snapshot
- `nodeEvents.update` → capture snapshot (for input value changes)

Since all sidebar actions now go through the Baklava graph API, they automatically get captured by the command stack.

---

## Part 3: Baklava Node Type Generation

### Current State

- **Generated:** `src/ugens/generated.ts` - UGen function definitions from SuperCollider source
- **Manual:** `ui/src/nodes/ugenNodes.ts` - Baklava node type definitions (hand-written)

### Gap Analysis

The manual Baklava node file only covers ~30 UGens, while `generated.ts` has hundreds. Each manual node requires:
- Input ports with defaults
- Output ports
- Rate selector (if applicable)
- Special handling (like EnvGen shape selector)

### Proposed Generation Pipeline Extension

#### 3.1 Extend codegen/generate.ts

Add a second output mode for Baklava node definitions:

```typescript
// New file: codegen/generate-baklava.ts

interface BaklavaDef {
  type: string;
  title: string;
  inputs: { name: string; default: number | string; type: 'signal' | 'select' }[];
  outputs: { name: string }[];
  rates: ('ar' | 'kr' | 'ir')[];
}

function specToBaklavaDef(spec: ClassSpec): BaklavaDef | null {
  // Skip non-UGens (utility classes, etc.)
  if (!hasAudioMethods(spec)) return null;

  return {
    type: spec.name,
    title: spec.name,
    inputs: spec.params.map(p => ({
      name: p.name,
      default: p.default ?? 0,
      type: 'signal'
    })),
    outputs: spec.numOutputs > 1
      ? range(spec.numOutputs).map(i => ({ name: `out${i}` }))
      : [{ name: 'out' }],
    rates: spec.methods // ['ar', 'kr'] etc.
  };
}

function generateBaklavaNodes(specs: ClassSpec[]): string {
  const defs = specs.map(specToBaklavaDef).filter(Boolean);

  return `
// AUTO-GENERATED - Do not edit directly
import { defineNode } from "@baklavajs/core";
import { signalInput, signalOutput, rateSelect } from "./nodeHelpers";

${defs.map(d => generateNodeDefinition(d)).join('\n\n')}

export const generatedNodeTypes = [
  ${defs.map(d => d.type + 'Node').join(',\n  ')}
];
`;
}
```

#### 3.2 Node Definition Template

```typescript
function generateNodeDefinition(def: BaklavaDef): string {
  const hasRateSelect = def.rates.length > 1;

  return `
export const ${def.type}Node = defineNode({
  type: "${def.type}",
  title: "${def.title}",
  inputs: {
    ${hasRateSelect ? `rate: rateSelect("${def.rates[0]}"),` : ''}
    ${def.inputs.map(i =>
      `${i.name}: signalInput("${i.name}", ${JSON.stringify(i.default)})`
    ).join(',\n    ')}
  },
  outputs: {
    ${def.outputs.map(o => `${o.name}: signalOutput("${o.name}")`).join(',\n    ')}
  }
});`;
}
```

#### 3.3 Update run.ts

```typescript
// codegen/run.ts - add new output mode

const args = parseArgs({
  options: {
    'sc-path': { type: 'string', default: './supercollider/SCClassLibrary/Common/Audio' },
    'out': { type: 'string', default: './src/ugens/generated.ts' },
    'baklava-out': { type: 'string', default: './ui/src/nodes/generatedNodes.ts' },
    'overrides': { type: 'string', default: './codegen/overrides.json' },
  }
});

// After generating UGen functions:
const baklavaCode = generateBaklavaNodes(specs);
fs.writeFileSync(args['baklava-out'], baklavaCode);
```

#### 3.4 Curated vs Generated Nodes

Maintain two files:
- `generatedNodes.ts` - Auto-generated from SC source
- `customNodes.ts` - Hand-crafted nodes with special UI (EnvGen, Param, etc.)

Merge in `ugenNodes.ts`:
```typescript
import { generatedNodeTypes } from './generatedNodes';
import { customNodeTypes } from './customNodes';

export const allNodeTypes = [
  ...generatedNodeTypes,
  ...customNodeTypes,
];
```

#### 3.5 Graph Compiler Updates

The graph compiler (`graphCompiler.ts`) would need updates to handle:
- Generic node → UGen mapping for generated nodes
- Parameter extraction from input ports
- Rate resolution for generated nodes

### Generation Challenges

1. **Special UGens** - Some UGens have complex input requirements (EnvGen, Poll, etc.)
   - Solution: Mark in overrides.json, use custom nodes instead

2. **Multi-output UGens** - Need proper output port generation
   - Solution: Parse `numOutputs` from SC source (already done in parse-sc.ts)

3. **Rate-dependent behavior** - Some UGens behave differently at different rates
   - Solution: Rate selector widget, handled in graph compiler

4. **Default values** - Need to extract from SC source
   - Solution: Already parsed in parse-sc.ts

5. **UI Categories** - Users need organized node browser
   - Solution: Add category metadata based on source file (Filter.sc → "Filters", etc.)

---

## Part 4: WebSocket State Sync

Following the pattern from PianoRoll and Canvas components:

### 4.1 Create WebSocket Controller

```typescript
// nodeEditor/nodeEditorWebSocket.ts
export class NodeEditorWebSocketController {
  private ws: WebSocket | null = null;
  private handlers: {
    onSetState?: (state: NodeEditorFullState) => void;
    onUndo?: () => void;
    onRedo?: () => void;
    onGetState?: (requestId: string) => void;
  } = {};

  // ... connection management, message handling
}
```

### 4.2 Message Types

```typescript
type NodeEditorMessage =
  | { type: 'setState'; state: NodeEditorFullState }
  | { type: 'getState'; requestId: string }
  | { type: 'stateResponse'; state: NodeEditorFullState; requestId: string }
  | { type: 'undo' }
  | { type: 'redo' }
  | { type: 'stateUpdate'; state: NodeEditorStateSnapshot }
```

---

## Implementation Priority

### Phase 1: Core State Management (High Priority)
1. ✅ Component isolation (done)
2. ⏳ Full state serialization using Baklava API
3. ⏳ Undo/redo command stack
4. ⏳ Save/load UI (download/upload buttons)

### Phase 2: Agent Integration (Medium Priority)
5. ⏳ WebSocket state sync controller
6. ⏳ Enhanced agent snapshot with full state

### Phase 3: Node Generation (Lower Priority - Scalability)
7. ⏳ Extend codegen to produce Baklava node definitions
8. ⏳ Update graph compiler for generated nodes
9. ⏳ Node browser with categories

---

## File Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `nodeEditor/nodeEditorState.ts` | Modify | Add full state capture/restore |
| `nodeEditor/NodeEditorRoot.vue` | Modify | Add get/setFullState, undo/redo |
| `nodeEditor/commandStack.ts` | Create | Undo/redo infrastructure |
| `nodeEditor/nodeEditorWebSocket.ts` | Create | WebSocket state sync |
| `codegen/generate-baklava.ts` | Create | Baklava node generation |
| `codegen/run.ts` | Modify | Add baklava-out option |
| `ui/src/nodes/generatedNodes.ts` | Create | Auto-generated node types |
| `ui/src/nodes/customNodes.ts` | Create | Hand-crafted special nodes |
| `ui/src/nodes/ugenNodes.ts` | Modify | Merge generated + custom |
| `ui/src/bridge/graphCompiler.ts` | Modify | Handle generated nodes |

---

## References

- Baklava Docs: https://baklava.tech/
- Graph.save()/load(): https://baklava.tech/api/classes/_baklavajs_core.Graph.html
- CodeSandbox Example: https://codesandbox.io/s/baklava-v2-saving-loading-w4vnyk
- avTools CommandStack: `avTools/apps/browser-projections/src/pianoRoll/commandStack.ts`
- Existing codegen: `synthdefTS/codegen/run.ts`
