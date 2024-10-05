## Setup and Installation

Follow these steps to set up the backend on your local machine:

### Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node.js)
- MongoDB (v4.4 or later)

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/your_database_name
   JWT_SECRET=your_secret_key_here
   ```
   Replace `your_database_name` with your preferred database name and `your_secret_key_here` with a secure random string.

3. Start MongoDB:
   Ensure your MongoDB server is running. The exact command may vary depending on your installation method.

4. Start the server:
   ```
   npm start
   ```

   The server should now be running on `http://localhost:5000`.

### Development

For development with auto-restart on file changes, you can use:
```
npm run dev
```

This command requires `nodemon` to be installed globally or as a dev dependency.

## Testing

To run tests (if implemented):
```
npm test
```

## Deployment

For deployment to a production environment:

1. Ensure all production environment variables are set correctly.
2. Build the project (if there's a build step):
   ```
   npm run build
   ```
3. Start the server in production mode:
   ```
   npm run start:prod
   ```

Remember to set up appropriate security measures, such as using HTTPS, setting secure headers, and implementing rate limiting for a production environment.




# E-commerce API Documentation

This document provides an overview of the API endpoints for our e-commerce platform.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_token_here>
```

## Endpoints

### Products

#### Get all products
- **GET** `/products`
- Public access
- Returns an array of all products

#### Get a single product
- **GET** `/products/:id`
- Public access
- Returns details of a specific product

#### Create a product (Admin only)
- **POST** `/products`
- Requires admin authentication
- Body:
  ```json
  {
    "name": "Product Name",
    "description": "Product Description",
    "price": 99.99,
    "imageUrl": "http://example.com/image.jpg"
  }
  ```

#### Update a product (Admin only)
- **PUT** `/products/:id`
- Requires admin authentication
- Body: Same as create product

#### Delete a product (Admin only)
- **DELETE** `/products/:id`
- Requires admin authentication

### Users

#### Register a new user
- **POST** `/users/register`
- Public access
- Body:
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- Returns JWT token

#### Login user
- **POST** `/users/login`
- Public access
- Body:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- Returns JWT token

#### Get user profile
- **GET** `/users/profile`
- Requires authentication
- Returns user details (excluding password)

### Cart

#### Get user's cart
- **GET** `/cart`
- Requires authentication
- Returns the user's cart with product details

#### Add product to cart
- **POST** `/cart`
- Requires authentication
- Body:
  ```json
  {
    "productId": "product_id_here",
    "quantity": 1
  }
  ```

#### Remove product from cart
- **DELETE** `/cart/:productId`
- Requires authentication

#### Update product quantity in cart
- **PUT** `/cart/:productId`
- Requires authentication
- Body:
  ```json
  {
    "quantity": 2
  }
  ```

### Orders

#### Create a new order
- **POST** `/orders`
- Requires authentication
- Body:
  ```json
  {
    "products": [
      {
        "product": "product_id_here",
        "quantity": 2
      }
    ],
    "total": 199.98
  }
  ```

#### Get all orders (Admin only)
- **GET** `/orders`
- Requires admin authentication
- Returns all orders with user details

#### Get user's orders
- **GET** `/orders/myorders`
- Requires authentication
- Returns the authenticated user's orders

#### Update order status (Admin only)
- **PUT** `/orders/:id`
- Requires admin authentication
- Body:
  ```json
  {
    "status": "shipped"
  }
  ```

## Error Responses

All endpoints may return the following error responses:

- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: User does not have necessary permissions
- `404 Not Found`: Requested resource not found
- `500 Internal Server Error`: Server-side error

Each error response will include a JSON object with a `message` field describing the error.
