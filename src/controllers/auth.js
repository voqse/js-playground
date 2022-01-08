import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import User from '../models/user.js';
import Token from '../models/token.js';

const { hashSync, compareSync } = bcrypt;

async function issueToken(userId) {
  const refreshToken = uuid();
  await new Token({ userId, token: refreshToken }).save();
  return {
    token: jwt.sign({ userId }, process.env.SECRET),
    refreshToken,
  };
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !compareSync(password, user.passwordHash)) {
    res.status(403).json({
      message: 'Invalid credential',
    });
  } else {
    const tokens = await issueToken(user._id)
    res.status(200).json({
      ...user.toJSON(),
      ...tokens,
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
    const passwordHash = hashSync(req.body.password);

    const user = new User({
      email: req.body.email,
      passwordHash,
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

export async function refresh(req, res) {
  const { refreshToken } = req.body;
  const token = await Token.findOne({ token: refreshToken });

  if (!token) {
    res.status(404).json({
      message: 'Invalid or expired token',
    });
  } else {
    res.status(200).json(await issueToken(token.userId));
  }
}
