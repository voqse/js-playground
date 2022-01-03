import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const { hashSync, compareSync } = bcrypt;

export async function login(req, res) {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !compareSync(req.body.password, user.password)) {
    res.status(403).json({
      message: 'User doesn\'t exist',
    });
  } else {
    res.status(200).send();
  }
}

export async function register(req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    res.status(409).json({
      message: 'User already exists',
    });
  } else {
    const password = hashSync(req.body.password);

    const user = new User({
      email: req.body.email,
      password,
    });

    try {
      await user.save();
      res.status(201).send();
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }
}