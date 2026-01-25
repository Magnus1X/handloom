# House of Homegrown - D2C Ecommerce Platform

A full-stack D2C ecommerce website for sustainable, premium Indian products built with React, Node.js, Express, and MongoDB.

## Features

### Frontend
- **React + Vite** with modern UI components
- **shadcn/ui + Tailwind CSS** for premium design
- **Responsive design** with mobile-first approach
- **Earthy color palette** (cream, beige, sage, terracotta)
- **Product catalog** with search, filters, and sorting
- **Shopping cart** with localStorage persistence
- **User authentication** with JWT
- **Order management** and history
- **Static pages** (About, Contact, FAQ, Privacy, Terms, Shipping)

### Backend
- **Node.js + Express** with strict MVC architecture
- **MongoDB** for user and order data
- **JWT authentication** with bcrypt password hashing
- **Products from JSON file** (no admin panel)
- **RESTful API** with proper error handling
- **CORS enabled** for frontend communication

### Pages
- Home (hero, categories, featured products)
- Shop (product listing with filters)
- Product Details (image gallery, add to cart)
- Cart (item management, quantity updates)
- Checkout (address form, COD payment)
- Orders (order history and details)
- Authentication (login/signup)
- Static pages (About, Contact, FAQ, etc.)

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, shadcn/ui, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Styling**: Tailwind CSS with custom earthy theme
- **Icons**: Lucide React

## Project Structure

```
ecommerce/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React contexts
│   │   ├── utils/         # API utilities
│   │   └── lib/           # Utility functions
│   └── package.json
├── server/                # Express backend
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Utility functions
│   │   └── data/          # Products JSON file
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone and Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Configuration

**Server (.env)**
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/house-of-homegrown
JWT_SECRET=your-super-secret-jwt-key-here
```

**Client (.env)**
```bash
cd client
cp .env.example .env
```

Edit `client/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:
```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas cloud connection
```

### 4. Run the Application

**Start Backend Server:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Start Frontend (in new terminal):**
```bash
cd client
npm run dev
# Client runs on http://localhost:5173
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories` - Get all categories

### Orders (Protected)
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order

## Product Data

Products are stored in `server/src/data/products.json` and include:
- Organic cotton clothing
- Bamboo home products
- Copper wellness items
- Natural beauty products
- Eco-friendly accessories

Each product has: id, title, price, category, imageUrl, description, rating, stock

## Key Features

### Authentication
- JWT-based authentication
- Protected routes for cart/checkout/orders
- Persistent login state

### Shopping Cart
- localStorage persistence
- Only works for logged-in users
- Quantity management
- Real-time total calculation

### Order Management
- COD (Cash on Delivery) only
- Order history with details
- Status tracking (static)
- Shipping address storage

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions
- Accessible components

## Design System

### Colors
- **Cream**: #F5F1EB (backgrounds)
- **Beige**: #E8DCC0 (secondary backgrounds)
- **Sage**: #9CAF88 (accents)
- **Terracotta**: #C17B5A (primary actions)
- **Brown**: #8B4513 (text, headers)

### Typography
- Clean, minimal fonts
- Proper hierarchy
- Readable line heights
- Responsive sizing

## Development

### Code Standards
- No comments in code
- Clean, readable implementations
- Proper error handling
- MVC architecture separation
- RESTful API design

### Build Commands
```bash
# Frontend build
cd client
npm run build

# Backend production
cd server
npm start
```

## Deployment Notes

1. Set production environment variables
2. Build frontend assets
3. Configure MongoDB connection
4. Set up proper CORS origins
5. Use process manager (PM2) for backend
6. Serve frontend through web server (Nginx)

## Support

For questions or issues, contact: hello@houseofhomegrown.com

---

Built with ❤️ for sustainable living and traditional craftsmanship.