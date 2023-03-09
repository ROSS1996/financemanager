import { check, ValidationChain } from "express-validator";

export const revenueValidation: ValidationChain[] = [
  check("id").not().isEmpty().withMessage("ID is required"),
  check("description").not().isEmpty().withMessage("Description is required"),
  check("amount")
    .isNumeric()
    .withMessage("Amount must be a valid number")
    .not()
    .isEmpty()
    .withMessage("Amount is required"),
  check("due_date")
    .isISO8601()
    .toDate()
    .withMessage("Due date must be a valid date")
    .not()
    .isEmpty()
    .withMessage("Due date is required"),
  check("received")
    .isBoolean()
    .withMessage("Received must be a valid boolean")
    .not()
    .isEmpty()
    .withMessage("Paid status is required"),
  check("category").not().isEmpty().withMessage("Category is required"),
  check("account_id").not().isEmpty().withMessage("Account ID is required"),
  check("user_id").not().isEmpty().withMessage("User ID is required"),
  check("received_at")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Received date must be a valid date"),
  check("created_at")
    .isISO8601()
    .toDate()
    .withMessage("Created date must be a valid date"),
  check("updated_at")
    .isISO8601()
    .toDate()
    .withMessage("Updated date must be a valid date"),
];
