module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
  ],
  compilerOptions: {
    jsx: "react-jsx",
  },
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts", "*.css"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.app.json", "./tsconfig.node.json"],
    ecmaFeatures: {
      jsx: true,
    },
    tsconfigRootDir: __dirname,
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    semi: ["error", "never"],
    camelcase: "off",
    "no-console": "warn",
    "no-mixed-operators": "error",
    "no-unneeded-ternary": "error",
    "no-use-before-define": ["off"],
    "no-restricted-syntax": ["off"],
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/anchor-has-content": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "react/jsx-no-bind": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-unused-prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
  },
};
