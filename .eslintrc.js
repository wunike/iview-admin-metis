module.exports = {
  root: true,
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false
    }],
    'no-undef': 'off',
    'camelcase': 'off',
    'indent': [0, 4],
    'quotes': [0, 'single'],
    'space-before-blocks': [0, 'always'],
    'standard/object-curly-even-spacing': [0, 'either'],
    'space-before-function-paren': 0,
    'spaced-comment': 0,
    'semi': 0,
    'key-spacing': 0,
    'keyword-spacing': 0,
    'object-curly-spacing': 0,
    'no-unused-vars': 0,
    'no-unneeded-ternary': 0,
    'no-tabs': 0,
    'no-trailing-spaces': 0,
    'no-multiple-empty-lines': 0,
    'comma-dangle': 0,
    'comma-spacing': 0,
    'eqeqeq': 0,
    'import/first': 0,
    'arrow-spacing': 0,
    'space-infix-ops': 0,
    'semi-spacing': 0,
    'padded-blocks': 0,
    'no-mixed-spaces-and-tabs': 0,
    'eslint-plugin-vue': 0,
    'one-var': 0,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
