import { check } from 'express-validator';

export const productValidation = [
  check('name', 'Product name is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty(),
  check('price', 'Price must be a number').isFloat({ min: 0 }),
  check('discount', 'Discount must be a number').optional().isFloat({ min: 0 }),
];
