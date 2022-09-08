module.exports = {
  root: true,
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "eol-last": "error",
    "@typescript-eslint/semi": "error",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/quotes": ["error", "single"],
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-duplicate-imports": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/prefer-enum-initializers": "error",
    "@typescript-eslint/func-call-spacing": ["error", "never"],
    "@typescript-eslint/keyword-spacing": ["error", { "before": true }],
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "_" }],
    "@typescript-eslint/brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    "@typescript-eslint/space-before-function-paren": ["error", { "anonymous": "always", "named": "never", "asyncArrow": "always" }],
  }
};
