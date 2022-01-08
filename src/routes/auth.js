import express from 'express';
import jwtMiddleware from 'express-jwt';
import * as controller from '../controllers/auth.js';

const router = express.Router();

router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/refresh', controller.refresh);
router.post('/logout', jwtMiddleware({
  secret: process.env.SECRET,
  algorithms: ['HS256'],
}), controller.logout);

export default router;
