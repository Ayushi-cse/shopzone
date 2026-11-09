import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  UserCheck,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { user, isAuthenticated, loginAsGuest, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [formError, setFormError] = useState('');

  // Destination intended by user before route protection intercept
  const redirectDestination = location.state?.from?.pathname || '/shop';

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate(redirectDestination, { replace: true });
  };

  const handleCustomLogin = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setFormError('Please enter a valid email address.');
      return;
    }
    setFormError('');
    login(email, name);
    navigate(redirectDestination, { replace: true });
  };

  // If already authenticated, show status card
  if (isAuthenticated) {
    return (
      <div className="login-page page-container animate-fade-in" style={{ padding: '4rem 1.25rem' }}>
        <div style={{
          maxWidth: '480px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-md)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-success-bg)',
            color: 'var(--color-success-500)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto'
          }}>
            <UserCheck size={36} />
          </div>

          <span className="badge badge-success" style={{ marginBottom: '0.75rem' }}>
            Active Session Verified
          </span>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Welcome, {user.name}
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
            Signed in as <code>{user.email}</code> ({user.role})
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/checkout" className="btn btn-primary btn-lg">
              <span>Continue to Checkout</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/shop" className="btn btn-secondary">
              <span>Browse Catalog</span>
            </Link>
            <button
              type="button"
              onClick={logout}
              className="btn btn-outline"
              style={{ color: 'var(--color-danger-500)', borderColor: '#fca5a5' }}
            >
              <LogOut size={16} />
              <span>Log Out of Session</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page page-container animate-fade-in" style={{ padding: '3rem 1.25rem 4rem 1.25rem' }}>
      <div style={{
        maxWidth: '460px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-light)',
        padding: 'clamp(1.75rem, 4vw, 2.5rem)',
        boxShadow: 'var(--shadow-md)'
      }}>
        {/* Protected Route Redirection Notice */}
        {location.state?.from && (
          <div style={{
            backgroundColor: 'var(--color-warning-bg)',
            border: '1px solid #fde68a',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.65rem'
          }}>
            <AlertCircle size={18} style={{ color: 'var(--color-warning-500)', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.825rem', color: '#92400e' }}>
              <strong>Protected Route Intercept:</strong> You attempted to access <code>{location.state.from.pathname}</code>. Please authenticate below to continue.
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-primary-50)',
            color: 'var(--color-primary-600)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            <Lock size={26} />
          </div>

          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.4rem 0' }}>
            Account Authentication
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
            Sprint 06 Phase 3 • Mock Authentication &amp; Route Guarding
          </p>
        </div>

        {/* Phase 3 Deliverable: 1-Click "Login as Guest" Button */}
        <div style={{
          backgroundColor: 'var(--bg-surface-alt)',
          border: '1.5px dashed var(--color-primary-200)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--color-primary-600)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            Residency Fast-Track
          </span>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-body)', margin: '0.35rem 0 0.85rem 0' }}>
            Instantly set global user authentication state to <code>true</code>.
          </p>

          <button
            type="button"
            onClick={handleGuestLogin}
            className="btn btn-primary"
            style={{
              width: '100%',
              backgroundColor: 'var(--color-primary-600)',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
            }}
          >
            <Sparkles size={16} />
            <span>Login as Guest (1-Click)</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          margin: '1.5rem 0',
          color: 'var(--text-subtle)',
          fontSize: '0.8rem'
        }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-light)' }} />
          <span>or sign in manually</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-light)' }} />
        </div>

        {/* Manual Mock Credentials Form */}
        <form onSubmit={handleCustomLogin}>
          {formError && (
            <div className="badge badge-danger" style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}>
              {formError}
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="name-input">
              Full Name (Optional)
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
              <input
                id="name-input"
                type="text"
                className="form-input"
                placeholder="Jane Developer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email-input">
              Email Address *
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
              <input
                id="email-input"
                type="email"
                required
                className="form-input"
                placeholder="developer@residency.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-secondary"
            style={{ width: '100%', marginTop: '0.75rem' }}
          >
            <span>Sign In with Custom Profile</span>
          </button>
        </form>

        <div style={{
          marginTop: '1.75rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          fontSize: '0.775rem',
          color: 'var(--text-muted)'
        }}>
          <ShieldCheck size={14} style={{ color: 'var(--color-success-500)' }} />
          <span>Session persisted to <code>localStorage</code></span>
        </div>
      </div>
    </div>
  );
}
