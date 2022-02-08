const router = require('express').Router();
const jwtMiddleware = require('express-jwt');
const controller = require('../controllers/auth.js');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/refresh', controller.refresh);
router.post('/logout', jwtMiddleware({
  secret: process.env.SECRET,
  algorithms: ['HS256'],
}), controller.logout);

module.exports = router;
