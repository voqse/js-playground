import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use('/auth', authRoutes);

server.get('/', (req, res) => {
  res.send('Hello from server');
});

export default server;
