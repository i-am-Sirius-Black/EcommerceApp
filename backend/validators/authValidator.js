import { check } from 'express-validator';

// Signup Validation
export const signupValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('role', 'Role must be either buyer or seller').isIn(['buyer', 'seller']),
];

// Login Validation
export const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];
