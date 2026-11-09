import { Link } from 'react-router-dom';
import { CheckCircle2, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast, dismissToast } = useCart();

  if (!toast.visible) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-dropdown)',
        border: '1px solid var(--border-light)',
        padding: '0.85rem 1.15rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        maxWidth: '420px',
        animation: 'slideUpFade 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'var(--color-success-bg)',
        color: 'var(--color-success-500)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <CheckCircle2 size={20} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--text-main)',
          margin: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {toast.message}
        </p>
        <Link
          to="/cart"
          onClick={dismissToast}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--color-primary-600)',
            marginTop: '0.2rem'
          }}
        >
          <ShoppingBag size={13} />
          <span>View Bag & Checkout &rarr;</span>
        </Link>
      </div>

      <button
        type="button"
        onClick={dismissToast}
        aria-label="Dismiss notification"
        style={{
          color: 'var(--text-muted)',
          padding: '0.25rem',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <X size={16} />
      </button>
    </aside>
  );
}
