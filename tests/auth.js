const request = require('supertest');

const server = require('../src/server.js');
const { fakeTokens, fakeUsers } = require('./data/users.js');
const db = require('../src/db.js');
const Token = require('../src/models/token.js');
const User = require('../src/models/user.js');
const getAuthHeader = require('./helpers/tokens.js');

process.env.TEST_COLLECTION = '-auth-test';

beforeAll(async () => {
  await db.connectDb();
  await db.dropDb();

  // Inserting fake Tokens and Users to DB
  Token.insertMany(fakeTokens);
  User.insertMany(fakeUsers);
});

afterAll(async () => {
  await db.disconnectDb();
});

test('User can register', async () => {
  const res = await request(server)
    .post('/auth/register')
    .send({
      email: 'user@voqse.com',
      password: '123456',
    });
  expect(res.statusCode).toBe(201);
});

test('Get 409 if user already exists', async () => {
  const res = await request(server)
    .post('/auth/register')
    .send(fakeUsers[0]);
  expect(res.statusCode).toBe(409);
});

test('User can login with email & refresh token', async () => {
  const res = await request(server)
    .post('/auth/login')
    .send(fakeUsers[0]);
  expect(res.statusCode).toBe(200);
  expect(typeof res.body.token).toBe('string');
  expect(typeof res.body.refreshToken).toBe('string');

  const refreshTokenRes = await request(server)
    .post('/auth/refresh')
    .send({ refreshToken: res.body.refreshToken });
  expect(refreshTokenRes.status).toBe(200);
  expect(typeof res.body.token).toBe('string');
  expect(typeof res.body.refreshToken).toBe('string');
});

test.todo('User can login with username');

test('Get 403 if invalid credential', async () => {
  const res = await request(server)
    .post('/auth/login')
    .send({
      email: 'invalid@voqse.com',
      password: '123456',
    });
  expect(res.statusCode).toBe(403);
});

test('Get 401 if token expired', async () => {
  const res = await request(server)
    .get('/users')
    .set('Authorization', getAuthHeader(fakeUsers[0]._id, { expiresIn: '1ms' }));
  expect(res.status).toBe(401);
});

test('User can renew access token using refresh token', async () => {
  const res = await request(server)
    .post('/auth/refresh')
    .send({ refreshToken: fakeTokens[0].token });
  expect(res.status).toBe(200);
  expect(typeof res.body.token).toBe('string');
  expect(typeof res.body.refreshToken).toBe('string');
});

test('Get 404 on invalid refresh token', async () => {
  const res = await request(server)
    .post('/auth/refresh')
    .send({ refreshToken: 'INVALID_REFRESH_TOKEN' });
  expect(res.status).toBe(404);
});

test('User can use refresh token only once', async () => {
  const firstRes = await request(server)
    .post('/auth/refresh')
    .send({ refreshToken: fakeTokens[1].token });
  expect(firstRes.status).toBe(200);
  expect(typeof firstRes.body.token).toBe('string');
  expect(typeof firstRes.body.refreshToken).toBe('string');

  const secondRes = await request(server)
    .post('/auth/refresh')
    .send({ refreshToken: fakeTokens[1].token });
  expect(secondRes.status).toBe(404);
});

test('Refresh tokens become invalid on logout', async () => {
  const logoutRes = await request(server)
    .post('/auth/logout')
    .send({ refreshToken: fakeTokens[2].token })
    .set('Authorization', getAuthHeader(fakeUsers[0]._id));
  expect(logoutRes.status).toBe(200);

  const refreshRes = await request(server)
    .post('/auth/refresh')
    .send({ refreshToken: fakeTokens[2].token });
  expect(refreshRes.status).toBe(404);
});
