import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, Clock, Phone, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-light)',
      marginTop: 'auto',
      paddingTop: '3.5rem',
      paddingBottom: '2.5rem'
    }}>
      <div className="page-container">
        {/* Value Prop Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--border-light)',
          marginBottom: '2.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-primary-50)',
              color: 'var(--color-primary-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Truck size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>Free Delivery</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>On all orders above $50.00</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-success-bg)',
              color: 'var(--color-success-500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>Secure Checkout</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Mock tokenized auth & TLS</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-warning-bg)',
              color: 'var(--color-warning-500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Clock size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>Zero Prop Drilling</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>React Context API architecture</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#f1f5f9',
              color: 'var(--text-body)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Phone size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>Standup Check-In</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Contact your residency coordinator</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          paddingBottom: '2.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-primary-600)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShoppingBag size={16} />
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Shop<span style={{ color: 'var(--color-primary-600)' }}>Zone</span>
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Architected as a modern Single Page Application (SPA) demonstrating client-side routing, global state synchronization, and route protection.
            </p>
          </div>

          <div>
            <h5 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.85rem' }}>Quick Navigation</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <li><Link to="/" style={{ color: 'var(--text-body)' }}>Home Banner</Link></li>
              <li><Link to="/shop" style={{ color: 'var(--text-body)' }}>Shop Catalog</Link></li>
              <li><Link to="/cart" style={{ color: 'var(--text-body)' }}>Shopping Cart</Link></li>
              <li><Link to="/checkout" style={{ color: 'var(--text-body)' }}>Protected Checkout</Link></li>
              <li><Link to="/contact" style={{ color: 'var(--text-body)' }}>Contact & Support</Link></li>
            </ul>
          </div>

          <div>
            <h5 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.85rem' }}>Engineering Architecture</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <li>Router: <code>react-router-dom v6</code></li>
              <li>State: <code>CartContext + AuthContext</code></li>
              <li>Data Source: <code>dummyjson.com/products</code></li>
              <li>Persistence: <code>localStorage (Cart + Auth)</code></li>
              <li>Protection: <code>&lt;ProtectedRoute /&gt;</code></li>
            </ul>
          </div>

          <div>
            <h5 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.85rem' }}>Residency Protocol</h5>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.5rem' }}>
              Mandatory Mid-Pipeline 1-on-1 Sync:
            </p>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-main)', fontWeight: 600, margin: 0 }}>
              POC: Mr. Nakul
            </p>
            <p style={{ fontSize: '0.825rem', color: 'var(--color-primary-600)', fontWeight: 600, margin: 0 }}>
              Use your official residency contact channel
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.25rem' }}>
              Mon–Fri | 9:00 AM – 6:00 PM IST
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <p style={{ margin: 0 }}>
            &copy; {new Date().getFullYear()} ShopZone SPA Module. Engineering Residency Sprint 06.
          </p>
          <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Built with React &amp; client-side routing <Heart size={13} style={{ fill: 'var(--color-danger-500)', color: 'var(--color-danger-500)' }} />
          </p>
        </div>
      </div>
    </footer>
  );
}
