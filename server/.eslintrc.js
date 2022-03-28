module.exports = {
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  extends: [
    'plugin:prettier/recommended',
  ],
  root: true,
  rules: {
    indent: [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'never'
    ],
    // `eslint/no-unused-vars` will check all qualified ts files, include d.ts
    // using interface to define function types is compliant, but `eslint/no-unused-vars` will prompt for unused parameters......
    // so set `args === none` here
    // and leave `no-unused-vars` to `@typescript-eslint/no-unused-vars`
    "no-unused-vars": ["error", { "vars": "all", "args": "none", "ignoreRestSiblings": false }]
  }
}