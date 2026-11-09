import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Menu, X, Sparkles, PhoneCall } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      height: 'var(--header-height)',
      backgroundColor: 'var(--bg-header)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-light)',
      transition: 'all var(--transition-normal)'
    }}>
      <div className="page-container" style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem'
      }}>
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none'
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--color-primary-600), #2563eb)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 2px 8px rgba(79, 70, 229, 0.35)'
          }}>
            <ShoppingBag size={20} strokeWidth={2.3} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
              lineHeight: 1.1
            }}>
              Shop<span style={{ color: 'var(--color-primary-600)' }}>Zone</span>
            </span>
            <span style={{
              fontSize: '0.675rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>
              Sprint 06 • SPA
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '2rem'
        }} className="desktop-nav">
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              fontSize: '0.925rem',
              fontWeight: 600,
              color: isActive ? 'var(--color-primary-600)' : 'var(--text-body)',
              position: 'relative',
              padding: '0.35rem 0',
              transition: 'color var(--transition-fast)'
            })}
          >
            {({ isActive }) => (
              <>
                Home
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '2.5px',
                    borderRadius: '2px',
                    backgroundColor: 'var(--color-primary-600)'
                  }} />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/shop"
            style={({ isActive }) => ({
              fontSize: '0.925rem',
              fontWeight: 600,
              color: isActive ? 'var(--color-primary-600)' : 'var(--text-body)',
              position: 'relative',
              padding: '0.35rem 0',
              transition: 'color var(--transition-fast)'
            })}
          >
            {({ isActive }) => (
              <>
                Shop Inventory
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '2.5px',
                    borderRadius: '2px',
                    backgroundColor: 'var(--color-primary-600)'
                  }} />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/contact"
            style={({ isActive }) => ({
              fontSize: '0.925rem',
              fontWeight: 600,
              color: isActive ? 'var(--color-primary-600)' : 'var(--text-body)',
              position: 'relative',
              padding: '0.35rem 0',
              transition: 'color var(--transition-fast)'
            })}
          >
            {({ isActive }) => (
              <>
                Contact Support
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '2.5px',
                    borderRadius: '2px',
                    backgroundColor: 'var(--color-primary-600)'
                  }} />
                )}
              </>
            )}
          </NavLink>
        </nav>

        {/* Action Controls: Cart Badge + Auth Widget */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Cart Icon with Live Re-rendering Badge (Sprint 06 Phase 2 Deliverable) */}
          <Link
            to="/cart"
            aria-label={`Shopping Cart with ${totalItems} items`}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface-alt)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-light)',
              transition: 'all var(--transition-fast)'
            }}
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span
                key={totalItems} // Key change triggers CSS spring animation on re-render
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  minWidth: '22px',
                  height: '22px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-primary-600)',
                  color: '#ffffff',
                  fontSize: '0.725rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px',
                  boxShadow: '0 2px 5px rgba(79, 70, 229, 0.4)',
                  animation: 'pulseGlow 1.2s ease',
                  border: '2px solid #ffffff'
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>

          {/* User Auth Pill / Login CTA */}
          {isAuthenticated ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.3rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-surface-alt)',
              border: '1px solid var(--border-light)'
            }}>
              <img
                src={user.avatar}
                alt={user.name}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: 'var(--radius-full)',
                  objectFit: 'cover'
                }}
              />
              <span style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                maxWidth: '100px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }} className="user-name-display">
                {user.name.split(' ')[0]}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                title="Log Out"
                aria-label="Log Out"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  padding: '0.2rem',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-primary btn-sm"
              style={{ display: 'inline-flex' }}
            >
              <User size={15} />
              <span>Sign In</span>
            </Link>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface-alt)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-light)'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: 'var(--header-height)',
          left: 0,
          right: 0,
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-light)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: 'var(--shadow-lg)',
          animation: 'slideDown 200ms ease'
        }}>
          <Link
            to="/"
            onClick={closeMenu}
            style={{
              padding: '0.6rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              color: 'var(--text-main)'
            }}
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={closeMenu}
            style={{
              padding: '0.6rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              color: 'var(--text-main)'
            }}
          >
            Shop Inventory
          </Link>
          <Link
            to="/contact"
            onClick={closeMenu}
            style={{
              padding: '0.6rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              color: 'var(--text-main)'
            }}
          >
            Contact Support
          </Link>
          <Link
            to="/cart"
            onClick={closeMenu}
            style={{
              padding: '0.6rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              color: 'var(--color-primary-600)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'var(--color-primary-50)'
            }}
          >
            <span>Shopping Cart</span>
            <span className="badge badge-primary">{totalItems} items</span>
          </Link>
          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.8rem',
              color: 'var(--text-muted)'
            }}>
              <PhoneCall size={14} />
              <span>For residency check-ins, contact your coordinator</span>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Responsive Media Queries for Navbar */}
      <style>{`
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
          .user-name-display {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
