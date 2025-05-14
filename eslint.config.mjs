import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["node_modules", "dist", "./src/migrations", "migrate.js"]),
  { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js, perfectionist }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "perfectionist/sort-imports": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
        },
      ],
    },
  },
]);
