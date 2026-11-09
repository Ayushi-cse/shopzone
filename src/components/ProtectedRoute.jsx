import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute component for Phase 3 route security.
 * Intercepts unauthenticated users attempting to access protected views (/checkout)
 * and redirects them to /login, preserving their intended destination in location.state.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: '0.75rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          border: '3px solid var(--border-light)',
          borderTopColor: 'var(--color-primary-600)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <span>Verifying authentication status...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to /login and record where the user was trying to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
