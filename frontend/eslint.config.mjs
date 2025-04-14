import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import tsParser from "@typescript-eslint/parser"; // TypeScript parser


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
  { 
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], 
    languageOptions: 
    { 
      globals: {
        ...globals.browser, // Browser globals
        ...globals.node, // Node.js globals (this is to recognize `process`)
      },
      parser: tsParser, // Use TypeScript parser
    } 
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);