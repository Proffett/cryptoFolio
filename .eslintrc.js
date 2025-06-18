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
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react', '@babel/preset-typescript'],
    },
  },
  rules: {
    'prettier/prettier': ['error', prettierConfig],
    'no-console': 'off',
    'strict': ['error', 'global'],
    'curly': 'warn',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.tsx'] }],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'import/no-unresolved': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-use-before-define': 'off',
    'no-plusplus': 'off',
    'no-restricted-globals': 'off',
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
