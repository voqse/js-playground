import request from 'supertest';
import server from '../src/server.js';
import * as db from '../src/db.js';
import fakeUsers from './data/users.js';

beforeAll(async () => {
  await db.connectDb();
  await db.dropDb();
});

afterAll(async () => {
  await db.disconnectDb();
});

test('User can register', async () => {
  const res = await request(server).post('/auth/register').send(fakeUsers[0]);
  expect(res.statusCode).toBe(201);
});

test('Get 409 if user already exists', async () => {
  const res = await request(server).post('/auth/register').send(fakeUsers[0]);
  expect(res.statusCode).toBe(409);
});

test('User can login with email', async () => {
  const res = await request(server).post('/auth/login').send(fakeUsers[0]);
  expect(res.statusCode).toBe(200);
  expect(typeof res.body.token).toBe('string');
  expect(typeof res.body.refreshToken).toBe('string');
});

test.todo('User can login with username');

test('Get 403 if invalid credential', async () => {
  const res = await request(server).post('/auth/login').send(fakeUsers[1]);
  expect(res.statusCode).toBe(403);
});

test.todo('Get 401 if token expired');
test.todo('User can renew access token using refresh token');
test.todo('User can use refresh token only once');
test.todo('Refresh tokens become invalid on logout');
test.todo('Multiple refresh tokens are valid');
