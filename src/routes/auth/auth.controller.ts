import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
  private service = new AuthService();

  async login(req: Request, res: Response): Promise<void> {
    // TODO: Implement login logic
  }

  async register(req: Request, res: Response): Promise<void> {
    // TODO: Implement registration logic
  }
}
