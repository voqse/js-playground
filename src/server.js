import express from 'express';
import authRoutes from './routes/auth.js';

const server = express();

server.get('/', (req, res) => {
  res.send('Hello from server');
});

server.use('/auth', authRoutes);

export default server;
