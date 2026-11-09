import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

/**
 * ShopZone Root Application Component
 * Configures BrowserRouter routing architecture with global Cart and Auth Contexts.
 */
export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          {/* Global persistent Navbar across all routes */}
          <Navbar />

          {/* Main routed viewport */}
          <main className="main-content">
            <Routes>
              {/* Phase 1: Static Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/contact" element={<Contact />} />

              {/* Phase 1: Dynamic Route with URL parameter hydration */}
              <Route path="/product/:id" element={<ProductDetails />} />

              {/* Phase 2: Cart Route with aggregate pricing */}
              <Route path="/cart" element={<Cart />} />

              {/* Phase 3: Auth & Protected Routes */}
              <Route path="/login" element={<Login />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Toast Notification Container */}
          <Toast />

          {/* Global persistent Footer */}
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
