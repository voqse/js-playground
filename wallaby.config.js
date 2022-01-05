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
      runner: '--experimental-vm-modules -r dotenv/config',
    },
  },
};
