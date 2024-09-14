import Product from '../models/product.js';

// Add Product (Seller)
export const addProduct = async (req, res) => {
  const { name, category, description, price, discount } = req.body;
  try {
    if (req.user.role !== 'seller') {
      return res.status(403).json({ message: 'Only sellers can add products.' });
    }

    const product = await Product.create({
      name,
      category,
      description,
      price,
      discount,
      userId: req.user.id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product' });
  }
};

// Update Product (Seller)
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const { name, category, description, price, discount } = req.body;
  
  try {
    const product = await Product.findOne({ where: { id, userId: req.user.id } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    product.name = name || product.name;
    product.category = category || product.category;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discount = discount || product.discount;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Delete Product (Seller)
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ where: { id, userId: req.user.id } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    await product.destroy();
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};
