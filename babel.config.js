module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "^~(.+)": "./App/\\1",
            "^!(.+)": "./App/Components\\1",
          },
          extensions: [".json", ".tsx", ".ts"],
        },
      ],
    ],
  }
}
