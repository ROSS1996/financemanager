import express from 'express';
import AuthController from './auth/auth.controller';
import UserController from './user/user.controller';

const router = express.Router();
router.get('', (req, res) => {
    res.send('Hello World!');
  });
router.use('', AuthController);
router.use('', UserController);


export default router;
