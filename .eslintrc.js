module.exports = {
  root: true,
  extends: "@react-native-community",
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error", { singleQuote: false }],
    quotes: ["error", "double"],
  },
  "space-in-brackets": "always",
}
