module.exports = {
  root: true,
  extends: '@react-native-community',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      rules: {
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
      },
    },
  ],
};
