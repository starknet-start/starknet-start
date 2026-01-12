import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths({ ignoreConfigErrors: true })],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    typecheck: {
      enabled: true,
      ignoreSourceErrors: true,
    },
  },
});
