# E-Commerce Product Listing System

A full-stack e-commerce application built with React (TypeScript) and Node.js, featuring a modern UI and comprehensive product management system.

## Features

### Frontend
- 🛍️ Product listing with grid view
- 🔍 Advanced filtering system
  - Category filters (multi-select)
  - Price range slider
  - Sort functionality
- 🛒 Shopping cart functionality
- 💖 Wishlist feature
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔄 State management with Redux Toolkit
- 📝 TypeScript for better type safety

### Backend
- 🚀 RESTful API endpoints
- 📦 MongoDB integration
- ✅ Input validation using Joi
- 🔍 Product search and filtering
- 🛒 Cart management
- 📂 Category management

## Tech Stack

### Frontend
- React 18
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express
- MongoDB
- Joi (validation)
- CORS

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB Community Edition
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ecommerce-product-listing.git
cd ecommerce-product-listing
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:

Backend (.env):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
```

Frontend (.env):
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Initialize the database with sample data:
```bash
cd backend
npm run init-db
```

## Running the Application

1. Start both frontend and backend:
```bash
# From the root directory
npm start
```

Or start them separately:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

The frontend will be available at http://localhost:3000 and the backend at http://localhost:5000.

## API Documentation

### Products
- `GET /api/products` - Get paginated products with filters
- `GET /api/products/:id` - Get single product details

### Categories
- `GET /api/categories` - Get all categories

### Cart
- `POST /api/cart/add` - Add product to cart
- `GET /api/cart` - Get cart contents
- `DELETE /api/cart/remove/:productId` - Remove item from cart

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 