module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'global-require': 0,
    'import/order': 0,
    'react/prop-types': 'off',
    'no-use-before-define': 'off',
    'import/no-duplicates': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': ['error', {
      custom: 'ignore',
    }],
  },
};
