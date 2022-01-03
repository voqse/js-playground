import request from 'supertest';
import server from '../src/server.js';
import * as db from '../src/db.js';

const users = {
  valid:
  {
    email: 'user@example.com',
    password: '123456',
  },
  invalid:
  {
    email: 'user@example.com',
    password: 'invalidPass',
  },
};

beforeAll(async () => {
  await db.connectDb(process.env.MONGO_TEST_URI);
});

afterAll(async () => {
  await db.clearDb();
});

test('User can register', async () => {
  const res = await request(server).post('/auth/register').send(users.valid);
  expect(res.statusCode).toBe(201);
});

test('Get 409 if user already exists', async () => {
  const res = await request(server).post('/auth/register').send(users.valid);
  expect(res.statusCode).toBe(409);
});

test('User can login with email', async () => {
  const res = await request(server).post('/auth/login').send(users.valid);
  expect(res.statusCode).toBe(200);
  // expect(res.body.token)
});

test.todo('User can login with username');

test.todo('Get 403 if invalid credential');
test.todo('Get 401 if token expired');
test.todo('User can renew access token using refresh token');
test.todo('User can use refresh token only once');
test.todo('Refresh tokens become invalid on logout');
test.todo('Multiple refresh tokens are valid');
