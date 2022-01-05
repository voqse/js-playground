import express from 'express';
import bodyParser from 'body-parser';
import jwtMiddleware from 'express-jwt';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.send('Hello from server');
});

server.use('/auth', authRoutes);

server.use(jwtMiddleware({
  secret: process.env.SECRET,
  algorithms: ['HS256'],
}));

server.use('/users', usersRoutes);

export default server;
