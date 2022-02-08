const { hashSync } = require('bcryptjs');

const fakeUsers = [
  {
    _id: '61d5ef379dfea500eec5253d',
    email: 'fake@voqse.com',
    password: '123456',
    passwordHash: hashSync('123456'),
  },
  {
    _id: '61d5ef379dfea500eec5253c',
    email: 'fake1@voqse.com',
    password: '123456',
    passwordHash: hashSync('123456'),
  },
];

const fakeTokens = [
  {
    userId: '61d5ef379dfea500eec5253d',
    token: 'TEST_REFRESH_TOKEN_1',
  },
  {
    userId: '61d5ef379dfea500eec5253d',
    token: 'TEST_REFRESH_TOKEN_TO_USE_ONCE',
  },
  {
    userId: '61d5ef379dfea500eec5253c',
    token: 'TEST_REFRESH_TOKEN_TO_DELETE_ON_LOGOUT',
  },
];

module.exports = { fakeUsers, fakeTokens };
