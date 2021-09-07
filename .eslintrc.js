const prettierConfig = require('./.prettierrc.js');

module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],
  plugins: ['react', 'import', 'jsx-a11y', 'react-hooks', 'simple-import-sort', 'prettier'],
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': ['error', prettierConfig],
    'no-console': 'off',
    'strict': ['error', 'global'],
    'curly': 'warn',
    'import/extensions': 'warn',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.tsx'] }],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
  },
  settings: {
    'postcss-modules': {
      postcssConfigDir: 'src',
      baseDir: 'src',
      camelCase: false,
      defaultScope: 'local',
      include: '**/*.css',
      exclude: '**/node_modules/**/*',
    },
  },
};
