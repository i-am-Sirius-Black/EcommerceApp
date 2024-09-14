import Product from '../models/product.js';
import Cart from '../models/cart.js';
import { Op } from 'sequelize';



// Search Products
export const searchProducts = async (req, res) => {
  const { name, category } = req.query;
  try {
    const whereClause = {};
    
    if (name) {
      whereClause.name = { [Op.iLike]: `%${name}%` };
    }
    
    if (category) {
      whereClause.category = { [Op.iLike]: `%${category}%` };
    }

    // console.log('Where clause:', JSON.stringify(whereClause));

    const products = await Product.findAll({ where: whereClause });

    // console.log('Found products:', products.length);

    res.status(200).json(products);
  } catch (error) {
    console.error('Error in searchProducts:', error);
    res.status(500).json({ message: 'Error searching products', error: error.message });
  }
};


// Show Cart (Buyer)
export const viewCart = async (req, res) => {


    if (req.user.role !== 'buyer') {
      return res.status(403).json({ message: 'Only buyers can view their cart.' });
    }
    
    try {
      const cartItems = await Cart.findAll({
        where: { userId: req.user.id },
        include: [
          { model: Product, attributes: ['name', 'category', 'price', 'description', 'discount'] }
        ]
      });
    
      // Send response with cart items
      return res.json(cartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error); // Log the actual error
      return res.status(500).json({ message: 'An error occurred while fetching cart items.' });
    }
    
};


// Add to Cart (Buyer)
export const addToCart = async (req, res) => {
  const { productId } = req.body;
   
  try {
    if (req.user.role !== 'buyer') {
      return res.status(403).json({ message: 'Only buyers can add to cart.' });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

        // Check if the product is already in the cart
        const existingCartItem = await Cart.findOne({
          where: { userId: req.user.id, productId: productId }
        });
    
        if (existingCartItem) {
          // Increase the quantity if the product is already in the cart
          existingCartItem.quantity += 1;
          await existingCartItem.save();
          return res.status(200).json(existingCartItem);
        }
    
    // If product is not in the cart, create a new cart entry
    const cartItem = await Cart.create({
      userId: req.user.id,
      productId: product.id,
      quantity: 1,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    console.error('Error adding to cart:', error);  // <-- Log the actual error here
    res.status(500).json({ message: 'Error adding to cart' });
  }
};

// Remove from Cart (Buyer)
export const removeFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    const cartItem = await Cart.findOne({ where: { id, userId: req.user.id } });
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await cartItem.destroy();
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from cart' });
  }
};
