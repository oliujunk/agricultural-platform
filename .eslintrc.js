module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-param-reassign': 'off',
    'no-continue': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-bitwise': 'off',
    'no-undef': 'off',
    'camelcase': 'off',
    'no-multi-assign': 'off',
    'max-len': ['error', 400],
    'global-require': 'off',
    'no-lonely-if': 'off',
    'vue/no-parsing-error': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
