import type { NodeEditorFullState } from "./nodeEditorState";

interface Command {
  name: string;
  beforeState: string;
  afterState: string;
}

interface NodeEditorCommandStackConfig {
  captureState: () => NodeEditorFullState;
  restoreState: (state: NodeEditorFullState) => void | Promise<void>;
  onChange?: () => void;
  maxHistorySize?: number;
}

/**
 * Snapshot-based undo/redo stack for the node editor.
 */
export class NodeEditorCommandStack {
  private stack: Command[] = [];
  private currentIndex = -1;
  private paused = false;
  private currentSnapshot = "";
  private readonly maxHistorySize: number;
  private readonly config: NodeEditorCommandStackConfig;

  constructor(config: NodeEditorCommandStackConfig) {
    this.config = config;
    this.maxHistorySize = config.maxHistorySize ?? 100;
  }

  syncCurrentState() {
    this.currentSnapshot = this.captureSnapshot();
  }

  replaceCurrentState(state: NodeEditorFullState, clearHistory = false) {
    this.currentSnapshot = JSON.stringify(state);
    if (clearHistory) {
      this.stack = [];
      this.currentIndex = -1;
      this.config.onChange?.();
    }
  }

  executeCommand(name: string, action: () => void) {
    if (this.paused) {
      action();
      return;
    }

    const before =
      this.currentSnapshot.length > 0
        ? this.currentSnapshot
        : this.captureSnapshot();
    action();
    const after = this.captureSnapshot();
    this.pushIfChanged(name, before, after);
  }

  recordChange(name: string) {
    if (this.paused) {
      return;
    }
    const before =
      this.currentSnapshot.length > 0
        ? this.currentSnapshot
        : this.captureSnapshot();
    const after = this.captureSnapshot();
    this.pushIfChanged(name, before, after);
  }

  canUndo(): boolean {
    return this.currentIndex >= 0;
  }

  canRedo(): boolean {
    return this.currentIndex < this.stack.length - 1;
  }

  async undo() {
    if (!this.canUndo()) {
      return;
    }

    const command = this.stack[this.currentIndex]!;
    await this.withRecordingPaused(async () => {
      await this.config.restoreState(this.parseSnapshot(command.beforeState));
    });
    this.currentSnapshot = command.beforeState;
    this.currentIndex -= 1;
    this.config.onChange?.();
  }

  async redo() {
    if (!this.canRedo()) {
      return;
    }

    this.currentIndex += 1;
    const command = this.stack[this.currentIndex]!;
    await this.withRecordingPaused(async () => {
      await this.config.restoreState(this.parseSnapshot(command.afterState));
    });
    this.currentSnapshot = command.afterState;
    this.config.onChange?.();
  }

  clear() {
    this.stack = [];
    this.currentIndex = -1;
    this.config.onChange?.();
  }

  isRecordingPaused(): boolean {
    return this.paused;
  }

  async withRecordingPaused(action: () => void | Promise<void>) {
    const wasPaused = this.paused;
    this.paused = true;
    try {
      await action();
    } finally {
      this.paused = wasPaused;
    }
  }

  private captureSnapshot(): string {
    return JSON.stringify(this.config.captureState());
  }

  private parseSnapshot(snapshot: string): NodeEditorFullState {
    return JSON.parse(snapshot) as NodeEditorFullState;
  }

  private pushIfChanged(name: string, beforeState: string, afterState: string) {
    this.currentSnapshot = afterState;
    if (beforeState === afterState) {
      return;
    }

    this.stack = this.stack.slice(0, this.currentIndex + 1);
    this.stack.push({ name, beforeState, afterState });
    this.currentIndex += 1;

    if (this.stack.length > this.maxHistorySize) {
      this.stack.shift();
      this.currentIndex = this.stack.length - 1;
    }

    this.config.onChange?.();
  }
}
