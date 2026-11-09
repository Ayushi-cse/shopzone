import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

/**
 * CartContext manages the global shopping cart state,
 * handles duplicate item prevention, calculates aggregate pricing,
 * and maintains synchronous persistence with browser localStorage.
 */
const CartContext = createContext(null);

const CART_STORAGE_KEY = 'shopzone_cart_v1';

export function CartProvider({ children }) {
  // Lazy state initialization ensures localStorage is read only once on initial mount
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Failed to parse cart from localStorage:', err);
    }
    return [];
  });

  // Toast feedback state for smooth non-blocking notifications
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    product: null,
  });

  // Synchronize cart mutations with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to persist cart to localStorage:', err);
    }
  }, [cart]);

  // Auto-dismiss toast after 3.5 seconds
  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast.visible]);

  const dismissToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  /**
   * Adds an item to the cart or increments its quantity if it already exists.
   * Addresses Sprint 06 Technical FAQ #4.
   */
  const addToCart = useCallback((product, qty = 1) => {
    if (!product || !product.id) return;
    const addQuantity = Math.max(1, Number(qty) || 1);

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id);

      if (existingIndex > -1) {
        // Product already in cart: mutate the quantity key immutably
        return prevCart.map((item, index) => {
          if (index === existingIndex) {
            const nextQuantity = item.quantity + addQuantity;
            const cappedQuantity = item.stock ? Math.min(nextQuantity, item.stock) : nextQuantity;
            return { ...item, quantity: cappedQuantity };
          }
          return item;
        });
      }

      // New product: push standardized payload into cart array
      const newItem = {
        id: product.id,
        title: product.title,
        price: Number(product.price) || 0,
        thumbnail: product.thumbnail || (product.images && product.images[0]) || '',
        category: product.category || 'General',
        brand: product.brand || '',
        stock: product.stock ?? 99,
        quantity: addQuantity,
      };

      return [...prevCart, newItem];
    });

    // Trigger visual toast feedback
    setToast({
      visible: true,
      message: `Added "${product.title}" (${addQuantity}x) to your bag`,
      product: {
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail || (product.images && product.images[0]) || '',
      },
    });
  }, []);

  /**
   * Removes an item entirely from the cart by its product ID
   */
  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  /**
   * Updates an item's quantity directly. If quantity drops below 1, removes the item.
   */
  const updateQuantity = useCallback((productId, nextQty) => {
    const qty = Number(nextQty);
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === productId) {
          const validQty = item.stock ? Math.min(qty, item.stock) : qty;
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  }, [removeFromCart]);

  /**
   * Clears all items from the cart (e.g. on order completion or manual empty)
   */
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Compute aggregated derived statistics efficiently with useMemo
  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    const amount = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    return Math.round(amount * 100) / 100;
  }, [cart]);

  // Shipping is free above $50, else flat $9.99 (or $0 if cart is completely empty)
  const shipping = useMemo(() => {
    if (cart.length === 0) return 0;
    return subtotal >= 50 ? 0 : 9.99;
  }, [cart.length, subtotal]);

  // Estimated tax: 8%
  const tax = useMemo(() => {
    if (cart.length === 0) return 0;
    return Math.round(subtotal * 0.08 * 100) / 100;
  }, [cart.length, subtotal]);

  const grandTotal = useMemo(() => {
    if (cart.length === 0) return 0;
    return Math.round((subtotal + shipping + tax) * 100) / 100;
  }, [cart.length, subtotal, shipping, tax]);

  const contextValue = {
    cart,
    totalItems,
    subtotal,
    shipping,
    tax,
    grandTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toast,
    dismissToast,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Custom hook to safely consume CartContext
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a <CartProvider>');
  }
  return context;
}
