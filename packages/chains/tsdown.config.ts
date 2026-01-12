import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  sourcemap: true,
  dts: true,
  clean: true,
  hash: false,
  format: ["esm"],
});
