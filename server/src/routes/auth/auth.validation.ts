import { check, ValidationChain } from 'express-validator';

export const loginValidation: ValidationChain[] = [
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
];

export const registerValidation: ValidationChain[] = [
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
  check('nickname').not().isEmpty(),
  check('name').not().isEmpty(),
];

