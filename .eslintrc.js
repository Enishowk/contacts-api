module.exports = {
  extends: "airbnb-base",
  env: {
    node: 1,
  },
  rules: {
    quotes: ["error", "double"],
    "linebreak-style": ["error", "unix"],
    "no-underscore-dangle": "off",
    "arrow-parens": ["error", "as-needed"],
    "no-mixed-operators": "off",
  },
};
