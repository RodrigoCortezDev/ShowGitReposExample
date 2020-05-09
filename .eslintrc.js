module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:prettier/recommended',
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
      'max-len': ['error', { 'code': 125 }],
      'prettier/prettier': 'error',
      'react/jsx-filename-extension': ['warn', { extensions: ['.jsx','.js'] }],
      'import/prefer-default-export': 'off',
      'react/state-in-constructor' : ['off', 'never']
  },
};
