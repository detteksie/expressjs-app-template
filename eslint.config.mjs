// @ts-check
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
// @ts-ignore
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["eslint.config.mjs", "db/"],
  },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  eslintPluginImport.flatConfigs.recommended,
  eslintPluginImport.flatConfigs.typescript,
  {
    plugins: {
      "unused-imports": eslintPluginUnusedImports,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: "module",
      parserOptions: {
        projectService: true,
        // @ts-ignore
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  },
  {
    rules: {
      "no-unused-vars": "off",
      "sort-imports": [
        "warn",
        {
          ignoreCase: false,
          ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          allowSeparatedGroups: true,
        },
      ],

      // turn on errors for missing imports
      "import/no-unresolved": "warn",
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin", // Built-in imports (come from NodeJS native) go first
            "external", // <- External imports
            "internal", // <- Absolute imports
            ["sibling", "parent"], // <- Relative imports, the sibling and parent types they can be mingled together
            "index", // <- index imports
            "unknown", // <- unknown
          ],
          "newlines-between": "always",
          alphabetize: {
            /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
            order: "asc",
            /* ignore case. Options: [true, false] */
            caseInsensitive: true,
          },
        },
      ],
      "unused-imports/no-unused-imports": "warn",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
    },
  },
);
