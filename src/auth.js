import express from 'express';

const auth = express();

auth.get('/auth', (req, res) => {
  res.send('You are trying to auth');
});

export default auth;
