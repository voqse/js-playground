module.exports = {
  plugins: [
    'jest',
  ],
  extends: 'airbnb-base',
  env: {
    'jest/globals': true,
  },
  rules: {
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    // 'prefer-destructuring': 'warn',
    'no-underscore-dangle': 'off',
    'no-unused-vars': process.env.NODE_ENV !== 'production' ? 'warn' : 'error',
    'no-console': process.env.NODE_ENV !== 'production' ? 'off' : 'warn',
  },
};
