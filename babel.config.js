module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],

    plugins: [
      // Required for react-native-reanimated
      "react-native-reanimated/plugin",

      // Class properties transformation
      ["@babel/plugin-transform-class-properties", { loose: true }],

      // Private methods transformation
      ["@babel/plugin-transform-private-methods", { loose: true }],

      // Private properties in object transformation
      ["@babel/plugin-transform-private-property-in-object", { loose: true }],
    ],
  };
};
