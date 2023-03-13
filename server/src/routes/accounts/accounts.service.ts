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

  async getBalance(userId: string): Promise<AccountsResponse> {
    try {
      const result = await db.query(
        `
        SELECT 
        accounts.id, 
        accounts.name, 
        accounts.starting_balance, 
        accounts.category,
        COALESCE(SUM(CASE WHEN revenues.received = true THEN revenues.amount ELSE 0 END), 0) 
          - COALESCE(SUM(CASE WHEN transfers.origin_account_id = accounts.id AND transfers.done = true THEN transfers.amount ELSE 0 END), 0) 
          + COALESCE(SUM(CASE WHEN transfers.destination_account_id = accounts.id AND transfers.done = true THEN transfers.amount ELSE 0 END), 0) 
          - COALESCE(SUM(CASE WHEN expenses.paid = true THEN expenses.amount ELSE 0 END), 0) 
          + accounts.starting_balance AS balance,
        COALESCE(SUM(CASE WHEN revenues.received = true THEN revenues.amount ELSE 0 END), 0) AS revenues_total,
        COALESCE(SUM(CASE WHEN expenses.paid = true THEN expenses.amount ELSE 0 END), 0) AS expenses_total,
        COALESCE(SUM(CASE WHEN transfers.destination_account_id = accounts.id AND transfers.done = true THEN transfers.amount ELSE 0 END), 0) AS transfers_received_total,
        COALESCE(SUM(CASE WHEN transfers.origin_account_id = accounts.id AND transfers.done = true THEN transfers.amount ELSE 0 END), 0) AS transfers_sent_total
      FROM accounts 
      LEFT JOIN revenues ON revenues.account_id = accounts.id AND revenues.received = true
      LEFT JOIN expenses ON expenses.account_id = accounts.id AND expenses.paid = true
      LEFT JOIN transfers ON (transfers.origin_account_id = accounts.id OR transfers.destination_account_id = accounts.id) AND transfers.done = true
      WHERE accounts.user_id = $1 
      GROUP BY accounts.id;
        `,
        [userId]
      );
      const accountsList = result.rows.map((row) => ({
        id: row.id,
        userid: userId,
        name: row.name,
        starting_balance: parseFloat(row.starting_balance),
        category: row.category,
        total_revenues: parseFloat(row.revenues_total),
        total_expenses: parseFloat(row.expenses_total),
        total_transfers_received: parseFloat(row.transfers_received_total),
        total_transfers_sent: parseFloat(row.transfers_sent_total),
        balance: parseFloat(row.balance),
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
