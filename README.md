# Ecommerce API

Welcome to the E-commerce API! This API serves as the backend for an e-commerce platform, enabling operations such as product management, user authentication, cart management, and order processing. The API is built with Node.js and MongoDB and is designed to be robust, scalable, and secure.




## Features

- User Authentication: Secure authentication using JWT.
- Product Management: CRUD operations for products using SKU-based identification.
- Cart Management: Add, update, or remove products from the cart.
- Order Processing: Checkout functionality to process user orders.
- Error Handling: Comprehensive error handling and validation.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Install my-project with npm

```bash
  git clone https://github.com/your-username/ecommerce-api.git
```
2. Navigate to the project directory:

```bash
  cd ecommerce-api
```
3. Install depedence:

```bash
  npm install
```
4. Set up environment variables by creating a `.env` file in the root directory:

```bash
  MONGO_URI=your_mongodb_uri
  JWT_SECRET=your_jwt_secret
```
5. Start the development server:
```bash
  npm run dev
```
The API will be available at `http://localhost:3000.`

# Usage
<b>Running the Server</b>

To start the server in production mode:

```bash
  npm start
```
# Routes Overview
- <b>/api/products</b>: Manage products (CRUD operations).
- <b>/api/users</b>: User registration and authentication.
- <b>/api/cart</b>: Manage user cart (add/remove products).
- <b>/api/orders</b>: Checkout and order processing.

For detailed API documentation, refer to the [API Documentation](#api-documentation) section.

# API Documentation
You can find the detailed API documentation, including all available endpoints, parameters, and response formats, in the `docs` directory of this repository.

Alternatively, you can use tools like Postman or Swagger to explore the API interactively.

# Testing
To run tests:
```bash
  npm test
```

# Contributing
We welcome contributions! Here’s how you can help:
- Report bugs and issues.
- Suggest new features.
- Submit pull requests to enhance functionality.

# License
This project is licensed under the [MIT License](https://github.com/ilhamgalileo).

