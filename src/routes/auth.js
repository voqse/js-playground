import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected!');
}).catch((error) => {
  console.error(error);
});

router.get('/', (req, res) => {
  res.status(403).send();
});

router.get('/login', (req, res) => {
  res.send('You are trying to auth');
});

router.post('/login', (req, res) => {
  res.send({
    login: true,
  });
});

export default router;
