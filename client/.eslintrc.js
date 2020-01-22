module.exports = {
  extends: [
    '@bigpopakap/eslint-config/react'
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"]
      }
    },
  },
};
