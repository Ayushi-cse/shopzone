import { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * AuthContext provides global authentication state for Phase 3 route protection.
 * Supports "Login as Guest" 1-click mocking and session persistence in localStorage.
 */
const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'shopzone_auth_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.error('Failed to parse auth user from localStorage:', err);
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Sync auth state to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (err) {
      console.error('Failed to update auth in localStorage:', err);
    }
  }, [user]);

  /**
   * Phase 3 Deliverable: Login as Guest action
   * Instantly grants authenticated status for review and checkout flow testing.
   */
  const loginAsGuest = useCallback(() => {
    setIsLoading(true);
    const guestUser = {
      id: 'guest_resident_01',
      name: 'Residency Guest',
      email: 'guest.resident@shopzone.dev',
      role: 'guest_tester',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      loginTime: new Date().toISOString(),
    };
    setUser(guestUser);
    setIsLoading(false);
    return guestUser;
  }, []);

  /**
   * Login with custom mock credentials
   */
  const login = useCallback((email, name) => {
    setIsLoading(true);
    const regularUser = {
      id: `user_${Date.now()}`,
      name: name?.trim() || email.split('@')[0] || 'ShopZone User',
      email: email.trim(),
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      loginTime: new Date().toISOString(),
    };
    setUser(regularUser);
    setIsLoading(false);
    return regularUser;
  }, []);

  /**
   * Terminates active session and clears persisted state
   */
  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    loginAsGuest,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to safely consume AuthContext
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an <AuthProvider>');
  }
  return context;
}
