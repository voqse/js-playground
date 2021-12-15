import express from 'express';
import mongoose from 'mongoose';

const auth = express();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected!');
}).catch((error) => {
  console.error(error);
});

auth.post('/auth', (req, res) => {
  res.send('You are trying to auth');
});

export default auth;
