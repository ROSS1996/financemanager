import { ExpensesService } from "./expenses.service";
import express from "express";
import { Expense } from "../models/expense";

class Handler {
  private service = new ExpensesService();

  constructor() {
    this.multi = this.multi.bind(this);
    this.single = this.single.bind(this);
  }

  async multi(req: express.Request, res: express.Response): Promise<void> {
    if (req.method === "GET") {
      const userid = req.body.id;
      if (userid) {
        const result = await this.service.getExpenses(userid);
        if (result.statusCode === 200) {
          res.status(result.statusCode).json({
            message: result.message,
            expenses: result.expenses,
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
      const expenseId = req.body.id;
      if (expenseId) {
        const result = await this.service.getExpenseById(expenseId);
        if (result.statusCode === 200) {
          res.status(result.statusCode).json({
            message: result.message,
            expense: result.expense,
          });
        } else {
          res.status(result.statusCode).json({ message: result.message });
        }
      }
    } else if (req.method === "DELETE") {
      const expenseId = req.body.id;
      if (expenseId) {
        const result = await this.service.deleteExpenseById(expenseId);
        res.status(result.statusCode).json({ message: result.message });
      }
    } else if (req.method === "PATCH") {
      const {
        id,
        description,
        amount,
        due_date,
        paid,
        category,
        account_id,
        paid_at,
      } = req.body;
      if (id) {
        const expense: Expense = {
          id: id,
          description: description,
          amount: amount,
          due_date: due_date,
          paid: paid,
          category: category,
          account_id: account_id,
          user_id: "",
          paid_at: paid_at,
          created_at: "",
          updated_at: "",
        };
        const result = await this.service.updateExpense(id, expense);
        res.status(result.statusCode).json({ message: result.message });
      }
    } else if (req.method === "POST") {
      const userid = req.body.id;
      if (userid) {
        const {
          description,
          amount,
          due_date,
          paid,
          category,
          account_id,
          paid_at,
        } = req.body;
        const expense: Expense = {
          id: "",
          description: description,
          amount: amount,
          due_date: due_date,
          paid: paid,
          category: category,
          account_id: account_id,
          user_id: userid,
          paid_at: paid_at,
          created_at: "",
          updated_at: "",
        };
        const result = await this.service.addExpense(expense);
        res.status(result.statusCode).json({ message: result.message });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}

const ExpensesController = express.Router();
const Expenses = new Handler();

ExpensesController.all("/multi", Expenses.multi);
ExpensesController.all("/single", Expenses.single);

export default ExpensesController;
