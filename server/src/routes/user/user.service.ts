import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db from "../../db";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

interface UserInfoResponse {
  statusCode: number;
  message: string;
  name: string;
  email: string;
  nickname: string;
}

export class UserService {
  async getUserInfo(token: string): Promise<UserInfoResponse> {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const userId = (decodedToken as { id: number }).id;
      const result = await db.query(
        "SELECT name, email, nickname FROM users WHERE id = $1",
        [userId]
      );
      if (result.rowCount === 0) {
        return {
          statusCode: 404,
          message: "User not found",
          name: "",
          email: "",
          nickname: "",
        };
      }
      const userInfo = result.rows[0];
      return {
        statusCode: 200,
        message: "User info retrieved successfully",
        name: userInfo.name,
        email: userInfo.email,
        nickname: userInfo.nickname,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 401,
        message: "Invalid token",
        name: "",
        email: "",
        nickname: "",
      };
    }
  }

  async deleteUserInfo(token: string): Promise<UserInfoResponse> {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const userId = (decodedToken as { id: number }).id;
      const result = await db.query(
        "DELETE FROM users WHERE id = $1 RETURNING name, email, nickname",
        [userId]
      );
      if (result.rowCount === 0) {
        return {
          statusCode: 404,
          message: "User not found",
          name: "",
          email: "",
          nickname: "",
        };
      }
      const userInfo = result.rows[0];
      return {
        statusCode: 200,
        message: "User deleted successfully",
        name: userInfo.name,
        email: userInfo.email,
        nickname: userInfo.nickname,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 401,
        message: "Invalid token",
        name: "",
        email: "",
        nickname: "",
      };
    }
  }

  async editUserInfo(
    token: string,
    name: string,
    nickname: string,
    email: string,
    password: string
  ): Promise<UserInfoResponse> {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const userId = (decodedToken as { id: number }).id;

      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user's info in the database
      const result = await db.query(
        "UPDATE users SET name = $1, nickname = $2, email = $3, password = $4 WHERE id = $5 RETURNING name, email, nickname",
        [name, nickname, email, hashedPassword, userId]
      );

      if (result.rowCount === 0) {
        return {
          statusCode: 404,
          message: "User not found",
          name: "",
          email: "",
          nickname: "",
        };
      }
      const userInfo = result.rows[0];
      return {
        statusCode: 200,
        message: "User info updated successfully",
        name: userInfo.name,
        email: userInfo.email,
        nickname: userInfo.nickname,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 401,
        message: "Invalid token",
        name: "",
        email: "",
        nickname: "",
      };
    }
  }
}
