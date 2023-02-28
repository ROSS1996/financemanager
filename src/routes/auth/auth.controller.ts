import { AuthService } from './auth.service';
import express from 'express';

class Handler {
  private service = new AuthService();

  constructor() {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async login(req: express.Request, res: express.Response): Promise<void> {
    if (req.method === 'GET') {
      res.send('Login Page!');
    }
    if (req.method === 'POST') {
      const { email, password } = req.body;
      const result = await this.service.login(email, password);
      res.status(result.statusCode).json(result.message);
    }
      res.status(405).send();
  }

  async register(req: express.Request, res: express.Response): Promise<void> {
    if (req.method === 'GET') {
      res.send('Login Page!');
    }
    if (req.method === 'POST') {
      const { email, password } = req.body;
      const result = await this.service.register(email, password);
      res.status(result.statusCode).json(result.message);
    }
    res.status(405).send();
  }
}

const AuthController = express.Router();
const Auth = new Handler();

AuthController.all('/login', Auth.login);
AuthController.all('/register', Auth.register);

export default AuthController;
