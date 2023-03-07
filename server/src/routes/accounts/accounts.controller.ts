import { AccountsService } from "./accounts.service";
import express from "express";
import { Account } from "../models/account";

class Handler {
  private service = new AccountsService();

  constructor() {
    this.multi = this.multi.bind(this);
    this.single = this.single.bind(this);
  }

  async multi(req: express.Request, res: express.Response): Promise<void> {
    if (req.method === "GET") {
      const userId = req.body.id;
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

  async single(req: express.Request, res: express.Response): Promise<void> {
    if (req.method === "GET") {
      const accountId = req.body.id;
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
      const expenseId = req.body.id;
      if (expenseId) {
        const result = await this.service.deleteAccountById(expenseId);
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
        const { name, starting_balance, category, user_id } = req.body;
        const account: Account = {
          id: "",
          name: name,
          starting_balance: starting_balance,
          category: category,
          user_id: user_id,
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

AccountsController.all("/multi", Accounts.multi);
AccountsController.all("/single", Accounts.single);

export default AccountsController;
