import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="page-container animate-fade-in" style={{ padding: '5rem 1.25rem', textAlign: 'center' }}>
      <div style={{
        maxWidth: '520px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-light)',
        padding: '3.5rem 2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: '#fee2e2',
          color: '#ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto'
        }}>
          <HelpCircle size={36} />
        </div>

        <span className="badge badge-danger" style={{ marginBottom: '0.75rem' }}>
          404 &bull; Page Not Found
        </span>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Lost in Navigation?
        </h1>
        <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
          The URL you requested does not map to any active route within the ShopZone client-side routing tree.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Return to Home</span>
          </Link>
          <Link to="/shop" className="btn btn-secondary">
            <ShoppingBag size={16} />
            <span>Browse Shop</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
