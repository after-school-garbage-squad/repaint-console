import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "setup.ts",
    exclude: ["node_modules"],
    include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
  },
});
