import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../../db";
import { Account } from "../models/account";
import { validationResult } from "express-validator";
import { accountValidation } from "./accounts.validation";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

interface AccountsResponse {
  statusCode: number;
  message: string;
  accounts: Account[];
}

interface SingleAccounts {
  statusCode: number;
  message: string;
  account?: Account | null | undefined;
}

export class AccountsService {
  async getAccounts(userId: string): Promise<AccountsResponse> {
    try {
      const result = await db.query(
        "SELECT * FROM accounts WHERE user_id = $1",
        [userId]
      );
      const accountsList = result.rows.map((row) => ({
        id: row.id,
        name: row.name,
        starting_balance: row.starting_balance,
        category: row.category,
      }));
      return {
        statusCode: 200,
        message: "Accounts retrieved successfully",
        accounts: accountsList,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 401,
        message: "Invalid token",
        accounts: [],
      };
    }
  }

  async getAccountById(accountId: string): Promise<SingleAccounts> {
    const errors = validationResult(accountValidation);
    if (!errors.isEmpty()) {
      return { statusCode: 401, message: "Invalid account data" };
    }
    try {
      const result = await db.query("SELECT * FROM accounts WHERE id = $1", [
        accountId,
      ]);
      const accountInfo = result.rows[0];
      if (!accountInfo) {
        return {
          statusCode: 404,
          message: "Account not found",
          account: null,
        };
      }
      const account: Account = {
        id: accountInfo.id,
        name: accountInfo.name,
        starting_balance: accountInfo.starting_balance,
        category: accountInfo.category,
      };
      return {
        statusCode: 200,
        message: "Account retrieved successfully",
        account: account,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        message: "Internal server error",
        account: null,
      };
    }
  }

  async deleteAccountById(
    accountId: string
  ): Promise<{ statusCode: number; message: string }> {
    const errors = validationResult(accountValidation);
    if (!errors.isEmpty()) {
      return { statusCode: 401, message: "Invalid account data" };
    }
    try {
      const result = await db.query("DELETE FROM accounts WHERE id = $1", [
        accountId,
      ]);
      if (result.rowCount === 0) {
        return {
          statusCode: 404,
          message: "Account not found",
        };
      }
      return {
        statusCode: 200,
        message: "Account deleted successfully",
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }

  async addAccount(
    account: Account
  ): Promise<{ statusCode: number; message: string }> {
    const errors = validationResult(accountValidation);
    if (!errors.isEmpty()) {
      return { statusCode: 401, message: "Invalid account data" };
    }
    try {
      await db.query(
        `INSERT INTO accounts
          (name, starting_balance, category, user_id)
         VALUES ($1, $2, $3, $4)`,
        [
          account.name,
          account.starting_balance,
          account.category,
          account.user_id,
        ]
      );
      return {
        statusCode: 200,
        message: "Account added successfully",
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 401,
        message: "Invalid token",
      };
    }
  }

  async updateAccount(
    account: Account
  ): Promise<{ statusCode: number; message: string }> {
    const errors = validationResult(accountValidation);
    if (!errors.isEmpty()) {
      return { statusCode: 401, message: "Invalid account data" };
    }
    try {
      const result = await db.query(
        `UPDATE accounts SET name = $1, starting_balance = $2, category = $3 WHERE id = $4`,
        [account.name, account.starting_balance, account.category, account.id]
      );
      if (result.rowCount === 0) {
        return {
          statusCode: 404,
          message: "Account not found",
        };
      }
      return {
        statusCode: 200,
        message: "Account updated successfully",
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }
}

export default new AccountsService();
