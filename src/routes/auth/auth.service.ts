import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../db';
import { User } from '../models/user';
import { validationResult } from 'express-validator';
import { loginValidation, registerValidation } from './auth.validation';


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';

export class AuthService {
  async login(email: string, password: string, res: any): Promise<{ statusCode: number, message: string }> {
    const errors = validationResult(loginValidation);
    if (!errors.isEmpty()) {
      return { statusCode: 401, message: 'Invalid email or password' };
    }
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rowCount === 0) {
      return { statusCode: 401, message: 'Invalid email or password' };
    }
    const user: User = result.rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return { statusCode: 401, message: 'Invalid email or password' };
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.set('Authorization', `Bearer ${token}`);
    return { statusCode: 200, message: 'Login successful', };
  }

  async register(email: string, password: string, name: string, nickname: string): Promise<{ statusCode: number, message: string }> {
    const errors = validationResult(registerValidation);
    if (!errors.isEmpty()) {
      return { statusCode: 422, message: 'Invalid registration data' };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await db.query('INSERT INTO users (nickname, name, email, password) VALUES ($1, $2, $3, $4) RETURNING id', [nickname, name, email, hashedPassword]);
      return { statusCode: 201, message: 'Registration successful', };
    } catch (error) {
      return { statusCode: 500, message: 'Internal server error' };
    }
  }
}
