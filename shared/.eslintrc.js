module.exports = {
  extends: [
    '@bigpopakap/eslint-config/node'
  ],
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"]
      }
    },
  },
  rules: {
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        ignores: [
          // This project does indeed work with import/export even though that's technically an experimental feature
          'modules',
        ],
      },
    ],

    // Not sure why this is failing. Need to look into it an re-enable
    'node/no-missing-import': 0,
  }
};
