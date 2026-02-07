/**
 * Agent State Exporter
 *
 * This utility provides infrastructure for the agentic UI improvement loop.
 * It allows components to register themselves for state capture, which can then
 * be accessed by AI agents via page.evaluate(() => window.__agentSnapshot()).
 *
 * See browser_control_tools/vue_integration_plan.md for full documentation.
 */

export interface ComponentSnapshot {
  name: string;
  tagName: string;
  state: Record<string, unknown>;
  canvasDataURLs?: Record<string, string>;
  boundingBox: { x: number; y: number; width: number; height: number };
}

export interface AgentSnapshot {
  timestamp: number;
  url: string;
  components: ComponentSnapshot[];
}

const registeredComponents = new Map<string, () => ComponentSnapshot>();

/**
 * Register a component for agent state capture.
 * Call this in onMounted() of each root component.
 */
export function registerForAgentCapture(
  id: string,
  capturer: () => ComponentSnapshot
) {
  registeredComponents.set(id, capturer);
}

/**
 * Unregister a component from agent state capture.
 * Call this in onUnmounted() of each root component.
 */
export function unregisterAgentCapture(id: string) {
  registeredComponents.delete(id);
}

/**
 * Capture full snapshot of all registered components.
 * Called by the AI agent via page.evaluate(() => window.__agentSnapshot())
 */
function captureAgentSnapshot(): AgentSnapshot {
  const components: ComponentSnapshot[] = [];

  for (const [id, capturer] of registeredComponents) {
    try {
      components.push(capturer());
    } catch (e) {
      components.push({
        name: id,
        tagName: "error",
        state: { error: String(e) },
        boundingBox: { x: 0, y: 0, width: 0, height: 0 },
      });
    }
  }

  return {
    timestamp: Date.now(),
    url: window.location.href,
    components,
  };
}

// Expose globally for page.evaluate() access
if (import.meta.env.DEV) {
  (window as any).__agentSnapshot = captureAgentSnapshot;
  (window as any).__agentComponents = registeredComponents;
}

export { captureAgentSnapshot };
