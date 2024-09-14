
# E-commerce API

This project is a simple e-commerce application built as part of the Backend Developer Intern assignment. It provides REST APIs for user authentication and product management, with separate functionalities for buyers and sellers. The application is developed using **Node.js** and **Express.js**, with **PostgreSQL** as the database.

## Screenshots:

### Home
<img width="1440" alt="Screenshot 2024-09-14 at 7 43 56 PM" src="https://github.com/user-attachments/assets/85b2e230-7517-4a7d-b996-b51bc990c886">

### Products
<img width="1440" alt="Screenshot 2024-09-14 at 7 44 03 PM" src="https://github.com/user-attachments/assets/231949dd-b27d-4306-9da1-27f6c46341ab">


### Add Products
<img width="1440" alt="Screenshot 2024-09-14 at 7 46 07 PM" src="https://github.com/user-attachments/assets/55e57778-3781-4741-9e7d-562793df9804">


### Signup
<img width="1440" alt="Screenshot 2024-09-14 at 7 46 17 PM" src="https://github.com/user-attachments/assets/0cae74c3-6913-465e-9a13-18e133093d39">

### Login
<img width="1440" alt="Screenshot 2024-09-14 at 7 46 36 PM" src="https://github.com/user-attachments/assets/2e06ceb0-3496-45a7-bad0-d35c83504e22">


### Cart
<img width="1440" alt="Screenshot 2024-09-14 at 7 46 42 PM" src="https://github.com/user-attachments/assets/cdb71b71-8e29-4430-8e2f-09dff3f21c36">


## Features
- User signup and login functionality
- Seller functionality: Add, update, and delete products
- Buyer functionality: Search for products, add/remove products from the cart
- User roles: Seller or Buyer
- Proper validation, sanitization, and error handling

## Tech Stack
- **Node.js** & **Express.js** - Backend development
- **PostgreSQL** - Database
- **Libraries**: JWT for authentication, bcrypt for password hashing, and Sequelize for ORM

## Deployed Links
- **Backend Deployed on AWS**: [AWS Backend Link]
- **Live Frontend Application**: [Live Frontend Link] (if applicable)

## API Endpoints

### 1. User Signup
Registers a new user as either a seller or buyer.

**Endpoint:**
```
POST /api/auth/signup
```

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123",
  "role": "seller"
}
```

### 2. User Login
Logs in a user and returns a JWT token.

**Endpoint:**
```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "seller@example.com",
  "password": "password123"
}
```

**Response:**
- `token`: The JWT token to be used for authenticated requests.

### 3. Add Product (Seller Only)
Allows sellers to add new products.

**Endpoint:**
```
POST /api/products
```

**Authorization:**
- Bearer token (`{{sellerToken}}`)

**Request Body:**
```json
{
  "name": "Wireless Headphones",
  "category": "electronics",
  "description": "Noise-cancelling wireless headphones",
  "price": 199.99,
  "discount": 25.0,
  "seller_id": 2
}
```

### 4. Update Product (Seller Only)
Allows sellers to update their products.

**Endpoint:**
```
PUT /api/products/{productId}
```

**Authorization:**
- Bearer token (`{{sellerToken}}`)

**Request Body:**
```json
{
  "name": "Apple Airpods",
  "category": "Electronics",
  "description": "Noise-cancelling Airpods made to last",
  "price": 400,
  "discount": 10
}
```

### 5. Delete Product (Seller Only)
Allows sellers to delete their products.

**Endpoint:**
```
DELETE /api/products/{productId}
```

**Authorization:**
- Bearer token (`{{sellerToken}}`)

### 6. Search Products (Buyer Functionality)
Allows buyers to search for products by category or name.

**Endpoint:**
```
GET /api/products/search
```

**Query Parameters:**
- `category`: The product category (e.g., electronics)

### 7. Add to Cart (Buyer Functionality)
Allows buyers to add products to their cart.

**Endpoint:**
```
POST /api/cart
```

**Authorization:**
- Bearer token (`{{buyerToken}}`)

**Request Body:**
```json
{
  "productId": "13e2cc6a-7599-4d0d-8018-a3f525f7e92c"
}
```

### 8. Remove from Cart (Buyer Functionality)
Allows buyers to remove products from their cart.

**Endpoint:**
```
DELETE /api/cart/{cartItemId}
```

**Authorization:**
- Bearer token (`{{buyerToken}}`)

### 9. Show Cart (Buyer Functionality)
Retrieves the items in the buyer's cart.

**Endpoint:**
```
GET /api/cart
```

**Authorization:**
- Bearer token (`{{buyerToken}}`)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-github-repo/ecommerce-backend.git
```

### 2. Install Dependencies
```bash
cd ecommerce-backend
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory with the following variables:

```
PORT=3000
DB_HOST=your-postgresql-host
DB_USER=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
JWT_SECRET=your-jwt-secret
```

### 4. Run the Application
```bash
npm start
```

The application will be running at `http://localhost:3000`.

## Database Setup
1. Make sure you have PostgreSQL installed and running.
2. Create a database for the project and configure the credentials in the `.env` file.
3. The database schema will be automatically generated based on the Sequelize models.

## API Documentation
API documentation can be found in the Postman collection [here](#) (provide link if applicable).

## Error Handling
- Invalid input or missing fields will return a `400 Bad Request`.
- Unauthorized access will return a `401 Unauthorized`.
- Invalid resources will return a `404 Not Found`.

## Code Structure
- `models/` - Contains Sequelize models for Users, Products, and Carts.
- `controllers/` - Contains the business logic for authentication, product management, and cart functionality.
- `routes/` - Defines all the API endpoints and maps them to the respective controllers.

## Conclusion
This API provides a complete backend solution for an e-commerce platform, with role-based functionalities for sellers and buyers. The application is built with a focus on scalability, security, and clean code practices.

---
