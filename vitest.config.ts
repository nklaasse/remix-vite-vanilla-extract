import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    environment: "happy-dom",
    restoreMocks: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["app/**/*"],
      exclude: [
        // It doesn't make sense to test the icons
        "app/icons/**/*",
        // Locales export objects without logic to test
        "app/config/locales/**/*",
        // Look and feel of the app is not unit-tested
        "app/**/*.css.ts",
        "app/css/**/*",
        "app/fonts/**/*",
        // Excluded since index.ts files simply re-export other files
        "app/**/index.ts",
        // Development artefacts should not be tested
        "app/**/*.stories.tsx",
        "app/test/**/*",
        "**/*.test.ts",
        "**/*.d.ts",
      ],
      thresholds: {
        statements: 1.63,
        autoUpdate: true,
      },
      all: true,
    },
    setupFiles: ["./tests/vitest-setup.ts"],
  },
  plugins: [tsconfigPaths(), vanillaExtractPlugin()],
});
