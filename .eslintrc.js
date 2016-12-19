const eslintrc = {
  extends: ['eslint-config-airbnb'],
  env: {
    browser: true,
    node: true,
    mocha: true,
    jest: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: [
    'react',
    'babel'
  ],
  rules: {
    'react/jsx-filename-extension': 0,
    'import/no-extraneous-dependencies': 0,
    'class-methods-use-this': 0,
    "no-unused-expressions": [2, {"allowShortCircuit": true, "allowTernary": true}],
    "max-len":0,
  }
};

module.exports = eslintrc;
