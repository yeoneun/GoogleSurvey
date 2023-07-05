module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      "module:metro-react-native-babel-preset",
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.ts", ".android.ts", ".ts", ".ios.tsx", ".android.tsx", ".tsx", ".jsx", ".js", ".json"],
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
          },
        },
      ],
    ],
  };
};
