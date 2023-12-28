module.exports = {
  root: true,
  extends: '@react-native',
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
    },
  ],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
