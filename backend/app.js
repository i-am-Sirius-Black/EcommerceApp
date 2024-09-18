import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import { errorHandler, notFoundHandler } from './middlewares/errorMiddleware.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Test the database connection and automatically create tables if they don’t exist
sequelize.sync().then(() => {
  console.log('Database connected and tables created');
}).catch(err => {
  console.error('Error connecting to the database:', err);
});

// API Routes
app.use('/api/auth', authRoutes);        // Authentication routes (signup, login)
app.use('/api', productRoutes);          // Seller and Buyer product routes
app.use('/api', cartRoutes);             // Buyer cart routes

// 404 Not Found Middleware
app.use(notFoundHandler);

// Start the server
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
