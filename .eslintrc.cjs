module.exports = {
  'plugins': [
    'jest'
  ],
  'extends': 'airbnb-base',
  'env': {
    'jest/globals': true,
  },
  'rules': {
    'import/extensions': 'off',
    'no-console': process.env.NODE_ENV !== 'production' ? 'off' : 'warn',
  }
};
