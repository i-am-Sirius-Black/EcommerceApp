import express from 'express';
import { addProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { productValidation } from '../validators/productValidator.js';
import { validationResult } from 'express-validator';
import { protect } from '../middlewares/authMiddleware.js'; // Import auth middleware

const router = express.Router();

// Route to add a product (Seller functionality) - protected by authMiddleware
router.post('/products', protect, productValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  addProduct(req, res);
});

// Route to update a product (Seller functionality) - protected by authMiddleware
router.put('/products/:id', protect, productValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  updateProduct(req, res);
});

// Route to delete a product (Seller functionality) - protected by authMiddleware
router.delete('/products/:id', protect, (req, res) => {
  deleteProduct(req, res);
});

export default router;
