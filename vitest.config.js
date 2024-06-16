import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    jsx: "transform",
    jsxInject: "import { jsx } from 'jsx-async-runtime/jsx-runtime'",
    jsxFactory: "jsx",
    jsxImportSource: "jsx-async-runtime",
  },
  test: {
    environment: "happy-dom",
    include: [
      "./content/**/*.test.tsx",
      "./_includes/**/*.test.ts*",
      "./components/**/*.test.ts*",
    ],
  },
});
