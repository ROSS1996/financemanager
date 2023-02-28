import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();
const controller = new AuthController();


router.get('', (req, res) => {
    res.send('Hello World!');
  });
router.get('/login', (req, res) => {
    res.send('Login Page!');
  });
router.post('/login', controller.login);
router.get('/register', (req, res) => {
    res.send('Register Page!');
  });
router.post('/register', controller.register);

export default router;
