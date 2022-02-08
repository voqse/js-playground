const request = require('supertest');
const server = require('../src/server.js');

test('Root path should response 200', async () => {
  const res = await request(server).get('/');
  expect(res.statusCode).toBe(200);
});
