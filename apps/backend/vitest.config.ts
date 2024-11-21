import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node", // Specify Node.js as the testing environment
    globals: true, // Enable global variables like `describe`, `it`, `expect`
    include: ["src/**/*.{test,spec}.ts"], // Include your test files (e.g., *.test.ts, *.spec.ts)
    coverage: {
      provider: "istanbul", // or 'v8'
      reporter: ["text", "html"], // Report coverage in text and HTML format
    },
  },
});
