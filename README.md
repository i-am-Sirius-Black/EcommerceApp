
# E-commerce API

This project is a simple e-commerce application built as part of the Backend Developer Intern assignment. It provides REST APIs for user authentication and product management, with separate functionalities for buyers and sellers. The application is developed using **Node.js** and **Express.js**, with **PostgreSQL** as the database.

## Screenshots:

### Signup
<img width="1440" alt="Screenshot 2024-09-14 at 7 46 36 PM" src="https://github.com/user-attachments/assets/acce2aec-7393-41d3-9b4a-1923afade78b">



### Login
<img width="1440" alt="Screenshot 2024-09-14 at 7 46 42 PM" src="https://github.com/user-attachments/assets/705b0805-d731-4b05-a4d6-2278fce57714">


### Home
<img width="1440" alt="Screenshot 2024-09-14 at 7 43 56 PM" src="https://github.com/user-attachments/assets/47bdb97a-92a3-47fd-a776-f5b3a252a63c">



### Products
<img width="1440" alt="Screenshot 2024-09-14 at 7 44 03 PM" src="https://github.com/user-attachments/assets/320b5435-39d7-468c-a3a5-364c53aec075">



### Add Pro
<img width="1440" alt="Screenshot 2024-09-14 at 7 46 07 PM" src="https://github.com/user-attachments/assets/1eac62a4-ea14-4551-a305-9e8d94fca920">
ducts



### Cart
<img width="1440" alt="Screenshot 2024-09-14 at 7 46 17 PM" src="https://github.com/user-attachments/assets/2d42f21f-618b-457a-9b59-7860fd687a5f">



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
