module.exports = {
  extends: 'airbnb',
  root: true,
  // parser: 'babel-eslint',
  // parserOptions: {
  //   sourceType: 'module',
  //   ecmaFeatures: {
  //     legacyDecorators: true
  //   }
  // },
  env: {
    browser: true,
  },
  plugins: [
    'html'
  ],
  'rules': {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'comma-dangle': 0,
    'consistent-return': 0,
    'semi': 0,
    'indent': [2, 4],
    "new-cap": [2, { "newIsCap": true, "capIsNew": false }],
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/first': 0,
    'lines-between-class-members': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'react/jsx-indent': [2, 4],
    'react/jsx-indent-props': [2, 4],
    'react/jsx-filename-extension': ['js', 'jsx'],
    'react/default-props-match-prop-types': 0,
    'react/no-danger': 0,
    'linebreak-style': 0,
    'react/prop-types': 0,
    'react/no-array-index-key': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/mouse-events-have-key-events': 0,
    'max-len': 0,
    'use-isnan': 0,
    'no-restricted-globals': 0,
    'camelcase': 2,
    'arrow-parens': 0,
    'no-undef': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-wrap-multilines': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/button-has-type': 0,
    'react/no-access-state-in-setstate': 0,
    'react/sort-comp': 0,
    'implicit-arrow-linebreak': 0,
  }
}
