const server = require('express')();
const bodyParser = require('body-parser');
const jwtMiddleware = require('express-jwt');
// import corsMiddleware from 'cors';

const authRoutes = require('./routes/auth.js');
const usersRoutes = require('./routes/users.js');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
// server.use(corsMiddleware());

server.get('/', (req, res) => {
  res.send('Hello from server');
});

server.use('/auth', authRoutes);

server.use(jwtMiddleware({
  secret: process.env.SECRET,
  algorithms: ['HS256'],
}));

server.use('/users', usersRoutes);

module.exports = server;
