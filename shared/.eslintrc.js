module.exports = {
  extends: [
    '@bigpopakap/eslint-config/node'
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"]
      }
    },
  },
};
