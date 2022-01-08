import bcrypt from 'bcryptjs';

const { hashSync } = bcrypt;

export const fakeUsers = [
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

export const fakeTokens = [
  {
    userId: '61d5ef379dfea500eec5253d',
    token: 'TEST_REFRESH_TOKEN',
  },
];
