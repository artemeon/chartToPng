module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["plugin:@typescript-eslint/recommended"],
  rules: {
    semi: ["error", "never"],
    quotes: [2, "single"],
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/no-explicit-any": 0
  }
};
