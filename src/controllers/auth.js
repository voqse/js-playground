import User from '../models/user.js';

export function login(req, res) {
}

export function register(req, res) {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  user.save().then(() => {
    res.status(200).json({
      email: req.body.email,
    });
  });
}
