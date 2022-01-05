import request from 'supertest';
import jwt from 'jsonwebtoken';
import server from '../src/server.js';
import * as db from '../src/db.js';
import fakeUsers from './data/users.js';
import User from '../src/models/user.js';

const authHeader = `Bearer ${jwt.sign({ _id: fakeUsers[0]._id }, process.env.SECRET)}`;

beforeAll(async () => {
  await db.connectDb();
  await db.dropDb();

  fakeUsers.map(async (fakeUser) => {
    const user = new User(fakeUser);
    await user.save();
  });
});

console.log(process.env.SECRET);
console.log(process.env.NODE_ENV);

afterAll(async () => {
  await db.disconnectDb();
});

test('Users list', async () => {
  const res = await request(server).get('/users').set('Authorization', authHeader);
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBeTruthy();
});

test('Get user by ID', async () => {
  const res = await request(server).get(`/users/${fakeUsers[0]._id}`).set('Authorization', authHeader);
  expect(res.status).toBe(200);
  expect(res.body.email).toBe(fakeUsers[0].email);
});

test('Get user by invalid ID should be 404', async () => {
  const res = await request(server).get('/users/666').set('Authorization', authHeader);
  expect(res.status).toBe(404);
});
