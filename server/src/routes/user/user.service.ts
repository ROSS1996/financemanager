import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db from "../../db";
import { validationResult } from "express-validator";
import { updateValidation } from "./user.validation";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

interface UserInfoResponse {
  statusCode: number;
  message: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
}

export class UserService {
  async getUserInfo(token: string): Promise<UserInfoResponse> {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const userId = (decodedToken as { id: number }).id;
      const result = await db.query(
        "SELECT username, email, first_name, last_name FROM users WHERE id = $1",
        [userId]
      );
      if (result.rowCount === 0) {
        return {
          statusCode: 404,
          message: "User not found",
          username: "",
          firstname: "",
          lastname: "",
          email: "",
        };
      }
      const userInfo = result.rows[0];
      return {
        statusCode: 200,
        message: "User info retrieved successfully",
        username: userInfo.username,
        firstname: userInfo.first_name,
        lastname: userInfo.last_name,
        email: userInfo.email,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 401,
        message: "Invalid token",
        username: "",
        firstname: "",
        lastname: "",
        email: "",
      };
    }
  }

  async deleteUserInfo(token: string): Promise<UserInfoResponse> {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const userId = (decodedToken as { id: number }).id;
      const result = await db.query(
        "DELETE FROM users WHERE id = $1 RETURNING username, email, first_name, last_name",
        [userId]
      );
      if (result.rowCount === 0) {
        return {
          statusCode: 404,
          message: "User not found",
          username: "",
          firstname: "",
          lastname: "",
          email: "",
        };
      }
      const userInfo = result.rows[0];
      return {
        statusCode: 200,
        message: "User deleted successfully",
        username: userInfo.username,
        firstname: userInfo.first_name,
        lastname: userInfo.last_name,
        email: userInfo.email,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 401,
        message: "Invalid token",
        username: "",
        firstname: "",
        lastname: "",
        email: "",
      };
    }
  }

  async editUserInfo(
    token: string,
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    country: string,
    birthdate: string,
    phone: string,
    address: string
  ): Promise<UserInfoResponse> {
    const errors = validationResult(updateValidation);
    if (!errors.isEmpty()) {
      return {
        statusCode: 422,
        message: "Invalid data provided",
        username: "",
        firstname: "",
        lastname: "",
        email: "",
      };
    }
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const userId = (decodedToken as { id: number }).id;

      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user's info in the database
      const result = await db.query(
        "UPDATE users SET username = $1, email = $  2, first_name = $3, last_name = $4, password_hash = $5, country = $6, birthdate = $7, phone = $8, address = $9, updated_at = CURRENT_TIMESTAMP WHERE id = $10 RETURNING username, email, first_name, last_name",
        [
          username,
          email,
          firstname,
          lastname,
          hashedPassword,
          country,
          birthdate,
          phone,
          address,
          userId,
        ]
      );

      if (result.rowCount === 0) {
        return {
          statusCode: 404,
          message: "User not found",
          username: "",
          firstname: "",
          lastname: "",
          email: "",
        };
      }

      const userInfo = result.rows[0];
      return {
        statusCode: 200,
        message: "User info updated successfully",
        username: userInfo.username,
        firstname: userInfo.first_name,
        lastname: userInfo.last_name,
        email: userInfo.email,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 401,
        message: "Invalid token",
        username: "",
        firstname: "",
        lastname: "",
        email: "",
      };
    }
  }
}

export default new UserService();
