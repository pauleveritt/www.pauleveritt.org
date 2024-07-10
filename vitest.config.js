import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    include: [
      "./content/**/*.test.tsx",
      "./_includes/**/*.test.ts*",
      "./components/**/*.test.ts*",
      "./tests/**/*.test.ts*",
    ],
  },
});
