import request from 'supertest';
import server from '../src/server.js';
import * as db from '../src/db.js';

beforeAll(async () => {
  await db.connectDb(process.env.MONGO_TEST_URI);
});

afterAll(async () => {
  await db.clearDb();
});

test('User can register', async () => {
  const res = await request(server).post('/auth/register').send({
    email: 'user',
    password: '123456',
  });
  expect(res.statusCode).toBe(200);
});

test('User can login', async () => {
  const res = await request(server).post('/auth/login').send({
    username: 'user',
    password: '123456',
  });
  expect(res.statusCode).toBe(200);
  // expect(typeof res.body.token).toBe('string');
});

test.todo('Get 403 if invalid credential');
test.todo('Get 401 if token expired');
test.todo('User can renew access token using refresh token');
test.todo('User can use refresh token only once');
test.todo('Refresh tokens become invalid on logout');
test.todo('Multiple refresh tokens are valid');
