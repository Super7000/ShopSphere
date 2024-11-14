This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Authentication

All protected routes require a valid JWT token in the `x-auth-token` header.

## Endpoints

### Products

- **Get All Products**

  - **URL**: `/products`
  - **Method**: `GET`
  - **Description**: Retrieve a list of all products.
  - **Response**:
    ```json
    [
      {
        "_id": "product_id",
        "name": "Product Name",
        "description": "Product Description",
        "price": 100,
        "imageUrl": "http://example.com/image.jpg"
      }
    ]
    ```

- **Get Product by ID**

  - **URL**: `/products/:id`
  - **Method**: `GET`
  - **Description**: Retrieve a product by its ID.
  - **Response**:
    ```json
    {
      "_id": "product_id",
      "name": "Product Name",
      "description": "Product Description",
      "price": 100,
      "imageUrl": "http://example.com/image.jpg"
    }
    ```

- **Create Product**

  - **URL**: `/products`
  - **Method**: `POST`
  - **Description**: Create a new product.
  - **Request Body**:
    ```json
    {
      "name": "Product Name",
      "description": "Product Description",
      "price": 100,
      "imageUrl": "http://example.com/image.jpg"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "product_id",
      "name": "Product Name",
      "description": "Product Description",
      "price": 100,
      "imageUrl": "http://example.com/image.jpg"
    }
    ```

- **Update Product**

  - **URL**: `/products/:id`
  - **Method**: `PUT`
  - **Description**: Update an existing product.
  - **Request Body**:
    ```json
    {
      "name": "Updated Product Name",
      "description": "Updated Product Description",
      "price": 150,
      "imageUrl": "http://example.com/updated_image.jpg"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "product_id",
      "name": "Updated Product Name",
      "description": "Updated Product Description",
      "price": 150,
      "imageUrl": "http://example.com/updated_image.jpg"
    }
    ```

- **Delete Product**
  - **URL**: `/products/:id`
  - **Method**: `DELETE`
  - **Description**: Delete a product by its ID.
  - **Response**:
    ```json
    {
      "message": "Product deleted successfully"
    }
    ```

### Users

- **Get User Profile**

  - **URL**: `/users/profile`
  - **Method**: `GET`
  - **Description**: Retrieve the profile of the authenticated user.
  - **Response**:
    ```json
    {
      "_id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "isAdmin": false
    }
    ```

- **Register User**

  - **URL**: `/users/register`
  - **Method**: `POST`
  - **Description**: Register a new user.
  - **Request Body**:
    ```json
    {
      "name": "User Name",
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "isAdmin": false,
      "token": "jwt_token"
    }
    ```

- **Login User**
  - **URL**: `/users/login`
  - **Method**: `POST`
  - **Description**: Authenticate a user and return a JWT token.
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "isAdmin": false,
      "token": "jwt_token"
    }
    ```

### Orders

- **Get All Orders**

  - **URL**: `/orders`
  - **Method**: `GET`
  - **Description**: Retrieve a list of all orders.
  - **Response**:
    ```json
    [
      {
        "_id": "order_id",
        "user": "user_id",
        "products": [
          {
            "product": "product_id",
            "quantity": 2
          }
        ],
        "totalPrice": 200,
        "status": "Pending"
      }
    ]
    ```

- **Get Order by ID**

  - **URL**: `/orders/:id`
  - **Method**: `GET`
  - **Description**: Retrieve an order by its ID.
  - **Response**:
    ```json
    {
      "_id": "order_id",
      "user": "user_id",
      "products": [
        {
          "product": "product_id",
          "quantity": 2
        }
      ],
      "totalPrice": 200,
      "status": "Pending"
    }
    ```

- **Create Order**

  - **URL**: `/orders`
  - **Method**: `POST`
  - **Description**: Create a new order.
  - **Request Body**:
    ```json
    {
      "products": [
        {
          "product": "product_id",
          "quantity": 2
        }
      ],
      "totalPrice": 200
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "order_id",
      "user": "user_id",
      "products": [
        {
          "product": "product_id",
          "quantity": 2
        }
      ],
      "totalPrice": 200,
      "status": "Pending"
    }
    ```

- **Update Order**

  - **URL**: `/orders/:id`
  - **Method**: `PUT`
  - **Description**: Update an existing order.
  - **Request Body**:
    ```json
    {
      "status": "Shipped"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "order_id",
      "user": "user_id",
      "products": [
        {
          "product": "product_id",
          "quantity": 2
        }
      ],
      "totalPrice": 200,
      "status": "Shipped"
    }
    ```

- **Delete Order**
  - **URL**: `/orders/:id`
  - **Method**: `DELETE`
  - **Description**: Delete an order by its ID.
  - **Response**:
    ```json
    {
      "message": "Order deleted successfully"
    }
    ```

### Cart

- **Get Cart**

  - **URL**: `/cart`
  - **Method**: `GET`
  - **Description**: Retrieve the cart of the authenticated user.
  - **Response**:
    ```json
    {
      "_id": "cart_id",
      "user": "user_id",
      "products": [
        {
          "product": "product_id",
          "quantity": 2
        }
      ],
      "totalPrice": 200
    }
    ```

- **Add to Cart**

  - **URL**: `/cart`
  - **Method**: `POST`
  - **Description**: Add a product to the cart.
  - **Request Body**:
    ```json
    {
      "product": "product_id",
      "quantity": 2
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "cart_id",
      "user": "user_id",
      "products": [
        {
          "product": "product_id",
          "quantity": 2
        }
      ],
      "totalPrice": 200
    }
    ```

- **Update Cart**

  - **URL**: `/cart/:id`
  - **Method**: `PUT`
  - **Description**: Update the quantity of a product in the cart.
  - **Request Body**:
    ```json
    {
      "quantity": 3
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "cart_id",
      "user": "user_id",
      "products": [
        {
          "product": "product_id",
          "quantity": 3
        }
      ],
      "totalPrice": 300
    }
    ```

- **Remove from Cart**

  - **URL**: `/cart/:id`
  - **Method**: `DELETE`
  - **Description**: Remove a product from the cart.
  - **Response**:
    ```json
    {
      "message": "Product removed from cart successfully"
    }
    ```

### Blogs

- **Get All Blogs**

  - **URL**: `/blogs`
  - **Method**: `GET`
  - **Description**: Retrieve a list of all blogs.
  - **Response**:
    ```json
    [
      {
        "_id": "blog_id",
        "title": "Blog Title",
        "content": "Blog Content",
        "author": "Author Name",
        "createdAt": "2023-10-01T00:00:00.000Z"
      }
    ]
    ```

- **Get Blog by ID**

  - **URL**: `/blogs/:id`
  - **Method**: `GET`
  - **Description**: Retrieve a blog by its ID.
  - **Response**:
    ```json
    {
      "_id": "blog_id",
      "title": "Blog Title",
      "content": "Blog Content",
      "author": "Author Name",
      "createdAt": "2023-10-01T00:00:00.000Z"
    }
    ```

- **Create Blog**

  - **URL**: `/blogs`
  - **Method**: `POST`
  - **Description**: Create a new blog.
  - **Request Body**:
    ```json
    {
      "title": "Blog Title",
      "content": "Blog Content",
      "author": "Author Name"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "blog_id",
      "title": "Blog Title",
      "content": "Blog Content",
      "author": "Author Name",
      "createdAt": "2023-10-01T00:00:00.000Z"
    }
    ```

- **Update Blog**

  - **URL**: `/blogs/:id`
  - **Method**: `PUT`
  - **Description**: Update an existing blog.
  - **Request Body**:
    ```json
    {
      "title": "Updated Blog Title",
      "content": "Updated Blog Content"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "blog_id",
      "title": "Updated Blog Title",
      "content": "Updated Blog Content",
      "author": "Author Name",
      "createdAt": "2023-10-01T00:00:00.000Z"
    }
    ```

- **Delete Blog**
  - **URL**: `/blogs/:id`
  - **Method**: `DELETE`
  - **Description**: Delete a blog by its ID.
  - **Response**:
    ```json
    {
      "message": "Blog deleted successfully"
    }
    ```

### Admin

- **Get Top Users**

  - **URL**: `/api/admin/analysis/top-users`
  - **Method**: `GET`
  - **Description**: Retrieve the top 10 users based on the number of orders.
  - **Response**:
    ```json
    [
      {
        "_id": "user_id",
        "user": {
          "_id": "user_id",
          "name": "User Name",
          "email": "user@example.com"
        },
        "total": 10
      }
    ]
    ```

- **Get Most Sold Products**

  - **URL**: `/api/admin/analysis/most-sold-products`
  - **Method**: `GET`
  - **Description**: Retrieve the top 10 most sold products.
  - **Response**:
    ```json
    [
      {
        "_id": "product_id",
        "product": {
          "_id": "product_id",
          "name": "Product Name",
          "description": "Product Description",
          "price": 100,
          "imageUrl": "http://example.com/image.jpg",
          "category": "Category",
          "stock": 50
        },
        "totalSold": 100
      }
    ]
    ```

- **Get Top Products by Price**

  - **URL**: `/api/admin/analysis/top-products-by-price`
  - **Method**: `GET`
  - **Description**: Retrieve the top 10 products sorted by price in descending order.
  - **Response**:
    ```json
    [
      {
        "_id": "product_id",
        "name": "Product Name",
        "description": "Product Description",
        "price": 200,
        "imageUrl": "http://example.com/image.jpg"
      }
    ]
    ```

- **Get Least Products by Price**

  - **URL**: `/api/admin/analysis/least-products-by-price`
  - **Method**: `GET`
  - **Description**: Retrieve the top 10 products sorted by price in ascending order.
  - **Response**:
    ```json
    [
      {
        "_id": "product_id",
        "name": "Product Name",
        "description": "Product Description",
        "price": 50,
        "imageUrl": "http://example.com/image.jpg"
      }
    ]
    ```

- **Get All Users**

  - **URL**: `/admin/users`
  - **Method**: `GET`
  - **Description**: Retrieve a list of all users.
  - **Response**:
    ```json
    [
      {
        "_id": "user_id",
        "name": "User Name",
        "email": "user@example.com",
        "isAdmin": false
      }
    ]
    ```

- **Get User by ID**

  - **URL**: `/admin/users/:id`
  - **Method**: `GET`
  - **Description**: Retrieve a user by their ID.
  - **Response**:
    ```json
    {
      "_id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "isAdmin": false
    }
    ```

- **Update User**

  - **URL**: `/admin/users/:id`
  - **Method**: `PUT`
  - **Description**: Update a user's details.
  - **Request Body**:
    ```json
    {
      "name": "Updated User Name",
      "email": "updated_user@example.com",
      "isAdmin": true
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "user_id",
      "name": "Updated User Name",
      "email": "updated_user@example.com",
      "isAdmin": true
    }
    ```

- **Delete User**

  - **URL**: `/admin/users/:id`
  - **Method**: `DELETE`
  - **Description**: Delete a user by their ID.
  - **Response**:
    ```json
    {
      "message": "User deleted successfully"
    }
    ```

## Middleware

The middleware handles authentication and authorization for protected routes.

- **Protected Paths**:

  - `/api/users/profile`
  - `/api/cart`
  - `/api/orders`

- **Admin Paths**:

  - `/api/admin`

- **Middleware Logic**:
  - Checks if the request path is protected.
  - Verifies the JWT token from the `x-auth-token` header.
  - Attaches user data to the request if the token is valid.
  - Checks if the user has admin privileges for admin paths.

## Environment Variables

- `JWT_SECRET`: Secret key for JWT token verification.

## Example Request Headers

```json
{
  "x-auth-token": "jwt_token"
}
```
