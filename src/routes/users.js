import express from 'express';
import User from '../models/user.js';

const router = express.Router();

// This router for the testing purpose only.

router.get('/', async (req, res) => {
  console.log(req.user.id);
  res.status(200).json(await User.find({}));
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send();
  }
});

export default router;
