import request from 'supertest';
import server from '../src/server.js';

test('Root path should response 200', async () => {
  const res = await request(server).get('/');
  expect(res.statusCode).toBe(200);
});
