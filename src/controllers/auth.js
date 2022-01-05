import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import User from '../models/user.js';

const { hashSync, compareSync } = bcrypt;

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !compareSync(password, user.password)) {
    res.status(403).json({
      message: 'Invalid credential',
    });
  } else {
    const refreshToken = uuid();
    res.status(200).json({
      // eslint-disable-next-line no-underscore-dangle
      token: jwt.sign({ _id: user._id }, process.env.SECRET),
      refreshToken,
    });
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
