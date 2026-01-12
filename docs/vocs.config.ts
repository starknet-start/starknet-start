import ts from "typescript";
import { defineConfig } from "vocs";
import { sidebar } from "./sidebar";

export default defineConfig({
  rootDir: ".",
  title: "Starknet React",
  sidebar,
  twoslash: {
    compilerOptions: {
      moduleResolution: ts.ModuleResolutionKind.Bundler,
    },
  },
  topNav: [
    { text: "Docs", link: "/docs/getting-started", match: "/docs" },
    { text: "Demo", link: "/demo", match: "/demo" },
  ],
});
