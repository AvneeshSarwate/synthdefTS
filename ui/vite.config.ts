import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import deno from "@deno/vite-plugin";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [vue(), deno()],
  resolve: {
    alias: {
      "@synthdef": resolve(__dirname, "../src"),
    },
  },
});
