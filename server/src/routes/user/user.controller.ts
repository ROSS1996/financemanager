import { UserService } from './user.service';
import express from 'express';

class Handler {
  private service = new UserService();

  constructor() {
    this.userInfo = this.userInfo.bind(this);
  }

  async userInfo(req: express.Request, res: express.Response): Promise<void> {
    if (req.method === 'GET') {
      const token = req.headers.authorization;
      if (token) {
        const result = await this.service.getUserInfo(token);
        if (result.statusCode === 200) {
          res.status(result.statusCode).json({
            message: result.message,
            info: {
              name: result.name,
              email: result.email,
              nickname: result.nickname
            }
          });
        } else {
          res.status(result.statusCode).json({ message: result.message });
        }
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      res.status(405).send();
    }
  }
}

const UserController = express.Router();
const User = new Handler();

UserController.all('/userInfo', User.userInfo);

export default UserController;
