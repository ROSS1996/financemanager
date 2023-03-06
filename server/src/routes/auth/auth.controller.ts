import { AuthService } from "./auth.service";
import express from "express";
import { User } from "../models/user";

class Handler {
  private service = new AuthService();

  constructor() {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async login(req: express.Request, res: express.Response): Promise<void> {
    if (req.method === "POST") {
      const { email, password } = req.body;
      const result = await this.service.login(email, password, res);
      res.status(result.statusCode).json({ message: result.message });
    } else {
      res.status(405).send();
    }
  }

  async register(req: express.Request, res: express.Response): Promise<void> {
    if (req.method === "POST") {
      const {
        email,
        password,
        firstname,
        lastname,
        country,
        birthdate,
        phone,
        address,
        username,
      } = req.body;
      const user: User = {
        id: "",
        username: username,
        email: email,
        password_hash: password,
        country: country,
        firstname: firstname,
        lastname: lastname,
        birthdate: birthdate,
        phone: phone,
        address: address,
      };
      console.log(user);
      const result = await this.service.register(user);
      res.status(result.statusCode).json({ message: result.message });
    } else {
      res.status(405).send();
    }
  }
}

const AuthController = express.Router();
const Auth = new Handler();

AuthController.all("/login", Auth.login);
AuthController.all("/register", Auth.register);

export default AuthController;
