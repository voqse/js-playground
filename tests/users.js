import request from 'supertest';

import server from '../src/server.js';
import { fakeUsers } from './data/users.js';
import * as db from '../src/db.js';
import User from '../src/models/user.js';
import getAuthHeader from './helpers/tokens.js';

process.env.TEST_COLLECTION = '-users-test';

beforeAll(async () => {
  await db.connectDb();
  await db.dropDb();

  // Inserting fake users to DB
  User.insertMany(fakeUsers);
});

afterAll(async () => {
  await db.disconnectDb();
});

test('Users list', async () => {
  const res = await request(server)
    .get('/users')
    .set('Authorization', getAuthHeader(fakeUsers[0]._id));
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBeTruthy();
});

test('Get user by ID', async () => {
  const res = await request(server)
    .get(`/users/${fakeUsers[0]._id}`)
    .set('Authorization', getAuthHeader(fakeUsers[0]._id));
  expect(res.status).toBe(200);
  expect(res.body.email).toBe(fakeUsers[0].email);
});

test('Get user by invalid ID should be 404', async () => {
  const res = await request(server)
    .get('/users/666')
    .set('Authorization', getAuthHeader(fakeUsers[0]._id));
  expect(res.status).toBe(404);
});
