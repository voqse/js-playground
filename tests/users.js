import request from 'supertest';
import jwt from 'jsonwebtoken';
import server from '../src/server.js';
import { fakeUsers } from './data/users.js';
import * as db from '../src/db.js';
import User from '../src/models/user.js';

process.env.TEST_COLLECTION = '-users-test';

const authHeader = `Bearer ${jwt.sign({ _id: fakeUsers[0]._id }, process.env.SECRET)}`;

beforeAll(async () => {
  await db.connectDb();
  await db.dropDb();

  // Inserting fake users to DB
  fakeUsers.map(async (fakeUser) => {
    const newUser = new User(fakeUser);
    await newUser.save();
  });
});

afterAll(async () => {
  await db.disconnectDb();
});

test('Users list', async () => {
  const res = await request(server)
    .get('/users')
    .set('Authorization', authHeader);
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBeTruthy();
});

test('Get user by ID', async () => {
  const res = await request(server)
    .get(`/users/${fakeUsers[0]._id}`)
    .set('Authorization', authHeader);
  expect(res.status).toBe(200);
  expect(res.body.email).toBe(fakeUsers[0].email);
});

test('Get user by invalid ID should be 404', async () => {
  const res = await request(server)
    .get(`/users/666`)
    .set('Authorization', authHeader);
  expect(res.status).toBe(404);
});
