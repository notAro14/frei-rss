import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      "styled-system": path.resolve(__dirname, "styled-system"),
    },
  },
});
