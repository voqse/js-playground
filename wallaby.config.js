export default {
  autoDetect: true,
  files: [
    'src/**/*.js',
  ],
  tests: [
    'tests/**/*.js',
    '!tests/data/**/*',
  ],
  env: {
    params: {
      runner: '-r dotenv-flow/config --experimental-vm-modules',
      env: 'NODE_ENV=test', // set for dotenv-flow
    },
  },
};
