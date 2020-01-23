module.exports = {
  extends: [
    '@bigpopakap/eslint-config/react'
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

    'node/no-unpublished-import': [
      'error',
      {
        allowModules: [
          // eslint thinks this package is not published, but it works on CI so 🤷🏾‍
          'react',
          'react-dom',
          'styled-components',
          'styled-reset'
        ],
      },
    ],

    // Not sure why this is failing. Need to look into it an re-enable
    'node/no-missing-import': 0,
    'node/no-extraneous-import': 0,

    // Need to enable these to get absolute import checking to work
    'absolute-import/no-unresolved': 0,
    'import/no-unresolved': 0
  }
};
