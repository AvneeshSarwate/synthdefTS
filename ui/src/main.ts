import { createApp } from "vue";
import App from "./App.vue";

// Initialize agent snapshot infrastructure for agentic UI improvement loop
import "./utils/agentStateExporter";

createApp(App).mount("#app");
