import { AccountsService } from "./accounts.service";
import express from "express";
import { Account } from "../models/account";

class Handler {
  private service = new AccountsService();

  constructor() {
    this.multi = this.multi.bind(this);
    this.balance = this.balance.bind(this);
    this.single = this.single.bind(this);
  }

  async multi(req: express.Request, res: express.Response): Promise<void> {
    if (req.method === "GET") {
      const userId = req.params.userId;
      if (!userId) res.status(401).json({ message: "Unauthorized" });
      if (userId) {
        const result = await this.service.getAccounts(userId);
        if (result.statusCode === 200) {
          res.status(result.statusCode).json({
            message: result.message,
            accounts: result.accounts,
          });
        } else {
          res.status(result.statusCode).json({ message: result.message });
        }
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }

  async balance(req: express.Request, res: express.Response): Promise<void> {
    if (req.method === "GET") {
      const userId = req.params.userId;
      if (!userId) res.status(401).json({ message: "Unauthorized" });
      if (userId) {
        const result = await this.service.getBalance(userId);
        if (result.statusCode === 200) {
          res.status(result.statusCode).json({
            message: result.message,
            accounts: result.accounts,
          });
        } else {
          res.status(result.statusCode).json({ message: result.message });
        }
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }

  async single(req: express.Request, res: express.Response): Promise<void> {
    if (req.method === "GET") {
      const accountId = req.params.accountId;
      if (!accountId) res.status(401).json({ message: "Unauthorized" });
      if (accountId) {
        const result = await this.service.getAccountById(accountId);
        if (result.statusCode === 200) {
          res.status(result.statusCode).json({
            message: result.message,
            account: result.account,
          });
        } else {
          res.status(result.statusCode).json({ message: result.message });
        }
      }
    } else if (req.method === "DELETE") {
      const accountId = req.params.accountId;
      if (!accountId) res.status(401).json({ message: "Unauthorized" });
      if (accountId) {
        const result = await this.service.deleteAccountById(accountId);
        res.status(result.statusCode).json({ message: result.message });
      }
    } else if (req.method === "PATCH") {
      const { id, name, starting_balance, category } = req.body;
      if (id) {
        const account: Account = {
          id: id,
          name: name,
          starting_balance: starting_balance,
          category: category,
        };
        const result = await this.service.updateAccount(account);
        res.status(result.statusCode).json({ message: result.message });
      }
    } else if (req.method === "POST") {
      const userid = req.body.id;
      if (userid) {
        const { name, starting_balance, category } = req.body;
        const account: Account = {
          name: name,
          starting_balance: starting_balance,
          category: category,
          user_id: userid,
        };
        const result = await this.service.addAccount(account);
        res.status(result.statusCode).json({ message: result.message });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}

const AccountsController = express.Router();
const Accounts = new Handler();

AccountsController.all("/multi/:userId?", Accounts.multi);
AccountsController.all("/single/:accountId?", Accounts.single);
AccountsController.all("/balance/:userId?", Accounts.balance);

export default AccountsController;
