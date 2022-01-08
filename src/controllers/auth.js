import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

import User from '../models/user.js';
import Token from '../models/token.js';

const { hashSync, compareSync } = bcrypt;

// Helper functions
async function issueTokens(userId) {
  const token = jwt.sign({
    id: userId,
  }, process.env.SECRET, {
    expiresIn: '15m',
  });

  const refreshToken = await new Token({
    userId,
    token: hashSync(uuid()),
  });
  await refreshToken.save();

  return {
    token,
    refreshToken: refreshToken.token,
  };
}

// Logic below
export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !compareSync(password, user.passwordHash)) {
    res.status(403).json({
      message: 'Invalid credential',
    });
  } else {
    const tokens = await issueTokens(user._id);

    res.status(200).json({
      // ...user.toJSON(),
      ...tokens,
    });
  }
}

export async function register(req, res) {
  const { email, password } = req.body;
  const candidate = await User.findOne({ email });

  if (candidate) {
    res.status(409).json({
      message: 'User already exists',
    });
  } else {
    const user = new User({
      email,
      passwordHash: hashSync(password),
    });
    await user.save();

    const tokens = await issueTokens(user._id);

    res.status(201).json({
      // ...user.toJSON(),
      ...tokens,
    });
  }
}

export async function refresh(req, res) {
  const { refreshToken: token } = req.body;
  const refreshToken = await Token.findOne({ token });

  if (!refreshToken) {
    res.status(404).json({
      message: 'Invalid or expired token',
    });
  } else {
    await refreshToken.remove();

    const tokens = await issueTokens(refreshToken.userId);

    res.status(200).json({
      // ...user.toJSON(),
      ...tokens,
    });
  }
}

export async function logout(req, res) {
  const { refreshToken: token } = req.body;

  await Token.findOneAndRemove({ token });

  res.status(200).send();
}
