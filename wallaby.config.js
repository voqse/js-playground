export default {
  autoDetect: true,
  files: [
    'src/**/*.js',
  ],
  tests: [
    'tests/**/*.js',
  ],
  env: {
    params: {
      runner: '--experimental-vm-modules -r dotenv/config',
    },
  },
};
