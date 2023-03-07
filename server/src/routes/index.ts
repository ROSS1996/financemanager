import express from "express";
import AuthController from "./auth/auth.controller";
import UserController from "./user/user.controller";
import ExpensesController from "./expenses/expenses.controller";
import RevenuesController from "./revenues/revenues.controller";
import AccountsController from "./accounts/accounts.controller";
import TransfersController from "./transfers/transfers.controller";

const router = express.Router();
router.get("", (req, res) => {
  res.send("Hello World!");
});
router.use("", AuthController);
router.use("", UserController);
router.use("/expenses", ExpensesController);
router.use("/revenues", RevenuesController);
router.use("/accounts", AccountsController);
router.use("/transfers", TransfersController);

export default router;
