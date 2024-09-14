import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { signupValidation, loginValidation } from '../validators/authValidator.js';
import { validationResult } from 'express-validator';

const router = express.Router();

// Signup route - no protection needed
router.post('/signup', signupValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  signup(req, res);
});

// Login route - no protection needed
router.post('/login', loginValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  login(req, res);
});

export default router;
