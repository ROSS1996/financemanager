import express from 'express';
import AuthController from './auth/auth.controller';


const router = express.Router();
router.get('', (req, res) => {
    res.send('Hello World!');
  });
router.use('', AuthController);

export default router;
