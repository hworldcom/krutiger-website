import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    css: false,
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
