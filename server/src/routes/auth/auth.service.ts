import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../../db";
import { User } from "../models/user";
import { validationResult } from "express-validator";
import { loginValidation, registerValidation } from "./auth.validation";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

export class AuthService {
  async login(
    email: string,
    password: string,
    res: any
  ): Promise<{
    statusCode: number;
    message: string;
    id?: string;
    username?: string;
    firstname?: string;
    email?: string;
  }> {
    const errors = validationResult(loginValidation);
    if (!errors.isEmpty()) {
      return { statusCode: 401, message: "Invalid email or password" };
    }
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rowCount === 0) {
      return { statusCode: 401, message: "Invalid email or password" };
    }
    const user: User = result.rows[0];

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return { statusCode: 401, message: "Invalid email or password" };
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.set("authorization", token);
    return {
      statusCode: 200,
      message: "Login successful",
      id: user.id,
      username: user.username,
      firstname: user.first_name,
      email: user.email,
    };
  }
  async register(user: User): Promise<{ statusCode: number; message: string }> {
    const errors = validationResult(registerValidation);
    if (!errors.isEmpty()) {
      return { statusCode: 422, message: "Invalid registration data" };
    }
    const hashedPassword = await bcrypt.hash(user.password_hash, 10);
    try {
      await db.query(
        "INSERT INTO users (username, email, password_hash, country, first_name, last_name, birthdate, phone, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id",
        [
          user.username,
          user.email,
          hashedPassword,
          user.country,
          user.firstname,
          user.lastname,
          user.birthdate,
          user.phone,
          user.address,
        ]
      );
      return { statusCode: 201, message: "Registration successful" };
    } catch (error) {
      console.log(error);
      return { statusCode: 500, message: "Internal server error" };
    }
  }
}
