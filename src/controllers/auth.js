const { hashSync, compareSync } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');

const User = require('../models/user.js');
const Token = require('../models/token.js');

// Helper functions
async function issueTokens(userId, payload = {}) {
  const token = jwt.sign({
    id: userId,
    ...payload,
  }, process.env.SECRET, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_TTL,
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
async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !compareSync(password, user.passwordHash)) {
    res.status(403).json({
      message: 'Invalid credential',
    });
  } else {
    const tokens = await issueTokens(user._id, { email });

    res.status(200).json({
      // ...user.toJSON(),
      ...tokens,
    });
  }
}

async function register(req, res) {
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

    const tokens = await issueTokens(user._id, { email });

    res.status(201).json({
      // ...user.toJSON(),
      ...tokens,
    });
  }
}

async function refresh(req, res) {
  const { refreshToken: token } = req.body;
  const refreshToken = await Token.findOne({ token });

  if (!refreshToken) {
    res.status(404).json({
      message: 'Invalid or expired token',
    });
  } else {
    const { email } = await User.findOne({ _id: refreshToken.userId });
    await refreshToken.remove();

    const tokens = await issueTokens(refreshToken.userId, { email });

    res.status(200).json({
      // ...user.toJSON(),
      ...tokens,
    });
  }
}

async function logout(req, res) {
  const { refreshToken: token } = req.body;

  await Token.findOneAndRemove({ token });

  res.status(200).send();
}

module.exports = {
  register,
  login,
  logout,
  refresh,
};
