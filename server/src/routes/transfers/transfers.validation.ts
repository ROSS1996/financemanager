import { check, ValidationChain } from "express-validator";

export const transferValidation: ValidationChain[] = [
  check("description").not().isEmpty().withMessage("Description is required"),
  check("amount")
    .isNumeric()
    .withMessage("Amount must be a valid number")
    .not()
    .isEmpty()
    .withMessage("Amount is required"),
  check("due_date")
    .isDate()
    .withMessage("Due date must be a valid date")
    .not()
    .isEmpty()
    .withMessage("Due date is required"),
  check("done").isBoolean().withMessage("Done must be a boolean"),
  check("origin_account_id")
    .not()
    .isEmpty()
    .withMessage("Origin account ID is required"),
  check("destination_account_id")
    .not()
    .isEmpty()
    .withMessage("Destination account ID is required"),
  check("user_id")
    .optional()
    .not()
    .isEmpty()
    .withMessage("User ID must not be empty"),
];
