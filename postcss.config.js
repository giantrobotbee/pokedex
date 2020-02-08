module.exports = {
  plugins: [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009"
        },
        stage: 4,
        features: {
          "nesting-rules": true,
          "custom-properties": true
        }
      }
    ]
  ]
};
