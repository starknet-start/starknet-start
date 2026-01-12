import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/paymaster/index.ts"],
  sourcemap: true,
  dts: true,
  clean: true,
  format: ["esm"],
  hash: false,
});
