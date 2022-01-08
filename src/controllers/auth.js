import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import User from '../models/user.js';
import Token from '../models/token.js';

const { hashSync, compareSync } = bcrypt;

async function issueTokenPair(userId) {
  const refreshToken = uuid();
  const token = await new Token({ userId, token: refreshToken });
  await token.save();

  return {
    token: jwt.sign({ id: userId }, process.env.SECRET),
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
    const tokens = await issueTokenPair(user._id);

    res.json({
      ...user.toJSON(),
      ...tokens,
    }, 200);
  }
}

export async function register(req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    res.status(409).json({
      message: 'User already exists',
    });
  } else {
    const user = new User({
      email: req.body.email,
      passwordHash: hashSync(req.body.password),
    });
    await user.save();
    const tokens = await issueTokenPair(user._id);

    res.json({
      ...user.toJSON(),
      ...tokens,
    }, 201);
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
    await token.remove();
    const tokens = await issueTokenPair(token.userId);

    res.json(tokens, 200);
  }
}

export async function logout(req, res) {
  const { refreshToken } = req.body;

  await Token.findOneAndRemove({ token: refreshToken });
  res.status(200).send();
}
