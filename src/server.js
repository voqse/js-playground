import express from 'express';
import authModule from './modules/auth.js';

const server = express();

server.get('/', (req, res) => {
  res.send('Hello from server');
});

server.use(authModule);

export default server;
