/** @type {import('eslint').Linter.Config} */
const eslintConfig = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'guard-for-in': 'off',
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    'no-restricted-syntax': 'off',
    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': [
      'error', {
        types: {
          object: false,
          '{}': false,
        },
      },
    ],
    'linebreak-style': ['off', 'windows'],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        /**
         * @description 修复 .vue 文件无法读取 global 的问题
         * @link https://github.com/typescript-eslint/typescript-eslint/releases/tag/v3.0.0
         * 最新的 @vue/eslint-config-typescript 中
         * 写法依旧是 'plugin:@typescript-eslint/eslint-recommended'
         */
        'no-undef': 'off',
      },
    },
    {
      files: ['vue.config.js', 'src/typings/global.d.ts'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};

module.exports = eslintConfig;
