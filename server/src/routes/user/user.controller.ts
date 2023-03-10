import { UserService } from "./user.service";
import express from "express";

class Handler {
  private service = new UserService();

  constructor() {
    this.userInfo = this.userInfo.bind(this);
  }

  async userInfo(req: express.Request, res: express.Response): Promise<void> {
    if (req.method === "GET") {
      const token = req.headers.authorization;
      if (token) {
        const result = await this.service.getUserInfo(token);
        if (result.statusCode === 200) {
          res.status(result.statusCode).json({
            message: result.message,
            info: {
              username: result.username,
              email: result.email,
              firstname: result.firstname,
              lastname: result.lastname,
            },
          });
        } else {
          res.status(result.statusCode).json({ message: result.message });
        }
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    }
    if (req.method === "DELETE") {
      const token = req.headers.authorization;
      if (token) {
        const result = await this.service.deleteUserInfo(token);
        res.status(result.statusCode).json({ message: result.message });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else if (req.method === "PATCH") {
      const token = req.headers.authorization;
      if (token) {
        const {
          username,
          firstname,
          lastname,
          email,
          password,
          country,
          birthdate,
          phone,
          address,
        } = req.body;

        const result = await this.service.editUserInfo(
          token,
          username,
          firstname,
          lastname,
          email,
          password,
          country,
          birthdate,
          phone,
          address
        );

        res.status(result.statusCode).json({ message: result.message });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(405).send();
    }
  }
}

const UserController = express.Router();
const User = new Handler();

UserController.all("/userInfo", User.userInfo);

export default UserController;
