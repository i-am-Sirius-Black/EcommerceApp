import express from 'express';
import { addToCart, removeFromCart, searchProducts, viewCart } from '../controllers/cartController.js';
import { protect } from '../middlewares/authMiddleware.js'; // Import auth middleware

const router = express.Router();

//Routes for buyers to search for products, add to their cart, and manage their cart.

router.get('/products/search', searchProducts); // ?Does it need to be protected?

router.get('/cart', protect, viewCart);

router.post('/cart', protect, addToCart);

router.delete('/cart/:id', protect, removeFromCart);

export default router;
