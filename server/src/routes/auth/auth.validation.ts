import { check, ValidationChain } from "express-validator";

export const loginValidation: ValidationChain[] = [
  check("email").isEmail(),
  check("password").isLength({ min: 6 }),
];

export const registerValidation: ValidationChain[] = [
  check("email").isEmail().withMessage("Email is invalid"),
  check("username").not().isEmpty().withMessage("Username is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  check("name").not().isEmpty().withMessage("Name is required"),
  check("country").not().isEmpty().withMessage("Country is required"),
  check("firstname").not().isEmpty().withMessage("First name is required"),
  check("lastname").not().isEmpty().withMessage("Last name is required"),
  check("birthdate").not().isEmpty().withMessage("Birthdate is required"),
  check("phone").isMobilePhone("any").withMessage("Phone number is invalid"),
  check("address")
    .isLength({ max: 200 })
    .withMessage("Address must be no more than 200 characters"),
];
