module.exports = {
  autoDetect: true,
  files: [
    'src/**/*.js',
  ],
  tests: [
    'tests/**/*.js',
    '!tests/data/**/*',
    '!tests/helpers/**/*',
  ],
  env: {
    params: {
      runner: '-r dotenv-flow/config',
      env: 'NODE_ENV=test', // set for dotenv-flow
    },
  },
};
