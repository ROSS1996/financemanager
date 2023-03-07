import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../../db";
import { Expense } from "../models/expense";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

interface ExpenseInfo {
  id: string;
  description: string;
  amount: string;
  due_date: string;
  paid: string;
  category: string;
  user_id: string;
  paid_at: string;
  created_at: string;
  updated_at: string;
}

interface ExpensesResponse {
  statusCode: number;
  message: string;
  expenses: ExpenseInfo[];
}

interface SingleExpenses {
  statusCode: number;
  message: string;
  expense?: ExpenseInfo | null | undefined;
}

export class ExpensesService {
  async getExpenses(userid: string): Promise<ExpensesResponse> {
    try {
      const result = await db.query(
        "SELECT * FROM expenses WHERE user_id = $1",
        [userid]
      );
      const expensesInfo = result.rows.map((row) => ({
        id: row.id,
        description: row.description,
        amount: row.amount,
        due_date: row.due_date,
        paid: row.paid,
        category: row.category,
        user_id: row.user_id,
        paid_at: row.paid_at,
        created_at: row.created_at,
        updated_at: row.updated_at,
      }));
      return {
        statusCode: 200,
        message: "Expenses retrieved successfully",
        expenses: expensesInfo,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 401,
        message: "Invalid token",
        expenses: [],
      };
    }
  }

  async getExpenseById(expenseId: string): Promise<SingleExpenses> {
    try {
      const result = await db.query("SELECT * FROM expenses WHERE id = $1", [
        expenseId,
      ]);
      const expenseInfo = result.rows[0];
      if (!expenseInfo) {
        return {
          statusCode: 404,
          message: "Expense not found",
          expense: null,
        };
      }
      const expense: Expense = {
        id: expenseInfo.id,
        description: expenseInfo.description,
        amount: expenseInfo.amount,
        due_date: expenseInfo.due_date,
        paid: expenseInfo.paid,
        category: expenseInfo.category,
        account_id: expenseInfo.account_id,
        user_id: expenseInfo.user_id,
        paid_at: expenseInfo.paid_at,
        created_at: expenseInfo.created_at,
        updated_at: expenseInfo.updated_at,
      };
      return {
        statusCode: 200,
        message: "Expense retrieved successfully",
        expense: expense,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        message: "Internal server error",
        expense: null,
      };
    }
  }

  async deleteExpenseById(
    expenseId: string
  ): Promise<{ statusCode: number; message: string }> {
    try {
      const result = await db.query("DELETE FROM expenses WHERE id = $1", [
        expenseId,
      ]);
      if (result.rowCount === 0) {
        return {
          statusCode: 404,
          message: "Expense not found",
        };
      }
      return {
        statusCode: 200,
        message: "Expense deleted successfully",
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }

  async addExpense(
    expense: Expense
  ): Promise<{ statusCode: number; message: string }> {
    try {
      await db.query(
        `INSERT INTO expenses
          (description, amount, due_date, paid, category, account_id, user_id, paid_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          expense.description,
          expense.amount,
          expense.due_date,
          expense.paid,
          expense.category,
          expense.account_id,
          expense.user_id,
          expense.paid_at,
        ]
      );
      return {
        statusCode: 200,
        message: "Expense added successfully",
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 401,
        message: "Invalid token",
      };
    }
  }

  async updateExpense(
    expenseId: string,
    expense: Expense
  ): Promise<{ statusCode: number; message: string }> {
    try {
      const result = await db.query(
        `UPDATE expenses SET description = $1, amount = $2, due_date = $3, paid = $4, category = $5, account_id = $6, paid_at = $7, updated_at = NOW() WHERE id = $8`,
        [
          expense.description,
          expense.amount,
          expense.due_date,
          expense.paid,
          expense.category,
          expense.account_id,
          expense.paid_at,
          expenseId,
        ]
      );
      if (result.rowCount === 0) {
        return {
          statusCode: 404,
          message: "Expense not found",
        };
      }
      return {
        statusCode: 200,
        message: "Expense updated successfully",
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

export default new ExpensesService();
