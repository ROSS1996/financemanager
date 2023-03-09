import { check, ValidationChain } from "express-validator";

export const accountValidation: ValidationChain[] = [
  check("id").not().isEmpty().withMessage("ID is required"),
  check("name").not().isEmpty().withMessage("Name is required"),
  check("starting_balance")
    .isNumeric()
    .withMessage("Starting balance must be a valid number")
    .not()
    .isEmpty()
    .withMessage("Starting balance is required"),
  check("category").not().isEmpty().withMessage("Category is required"),
  check("user_id")
    .optional()
    .not()
    .isEmpty()
    .withMessage("User ID must not be empty"),
];
