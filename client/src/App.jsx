import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Shipping from './pages/Shipping';
import FunFacts from './pages/FunFacts';

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/fun-facts" element={<FunFacts />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/order-success" element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
          <Route path="/order/:id" element={
            <ProtectedRoute>
              <OrderDetail />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          } />
        </Routes>
      </main>
      {!isAdminPath && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppContent />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 1000,
                style: {
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#2D241E',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '12px 24px',
                  borderRadius: '16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  letterSpacing: '-0.01em',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                },
                success: {
                  icon: null,
                  style: {
                    borderLeft: '4px solid #5F7453',
                  },
                },
                error: {
                  icon: null,
                  style: {
                    borderLeft: '4px solid #A64B2A',
                  },
                },
              }}
            />
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;