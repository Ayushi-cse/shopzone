import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const {
    cart,
    totalItems,
    subtotal,
    shipping,
    tax,
    grandTotal,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useCart();

  const navigate = useNavigate();

  // If cart is empty, render friendly empty state
  if (cart.length === 0) {
    return (
      <div className="cart-page page-container animate-fade-in" style={{ padding: '4rem 1.25rem', textAlign: 'center' }}>
        <div style={{
          maxWidth: '520px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          padding: '3.5rem 2rem',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <div style={{
            width: '76px',
            height: '76px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-primary-50)',
            color: 'var(--color-primary-600)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <ShoppingBag size={36} />
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Your Shopping Bag is Empty
          </h2>
          <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
            Looks like you haven't added anything to your cart yet. Explore our curated catalog of electronics, fragrances, and groceries to start shopping.
          </p>

          <Link to="/shop" className="btn btn-primary btn-lg" style={{ display: 'inline-flex' }}>
            <ShoppingBag size={18} />
            <span>Browse Products &rarr;</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page page-container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--color-primary-600)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Sprint 06 Phase 2 • Global Cart
          </span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.25rem 0 0 0' }}>
            Shopping Bag ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure you want to remove all items from your bag?')) {
              clearCart();
            }
          }}
          className="btn btn-danger btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
        >
          <Trash2 size={14} />
          <span>Clear All Items</span>
        </button>
      </div>

      {/* Main Cart Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Left Column: List of Cart Items */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          gridColumn: '1 / span 2'
        }}>
          {cart.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{
                padding: '1.25rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '1.25rem',
                backgroundColor: '#ffffff'
              }}
            >
              {/* Product Thumbnail */}
              <Link
                to={`/product/${item.id}`}
                style={{
                  width: '90px',
                  height: '90px',
                  backgroundColor: '#f8fafc',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem',
                  border: '1px solid var(--border-light)',
                  flexShrink: 0
                }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';
                  }}
                />
              </Link>

              {/* Product Info */}
              <div style={{ flex: '1 1 200px', minWidth: 0 }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--color-primary-600)',
                  textTransform: 'uppercase'
                }}>
                  {item.category}
                </span>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  margin: '0.15rem 0 0.35rem 0',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  <Link to={`/product/${item.id}`} style={{ color: 'inherit' }}>
                    {item.title}
                  </Link>
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Unit Price: <strong>${Number(item.price).toFixed(2)}</strong>
                </span>
              </div>

              {/* Quantity Stepper */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1.5px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#ffffff'
              }}>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Decrease quantity"
                  style={{
                    padding: '0.35rem 0.65rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--text-main)'
                  }}
                >
                  -
                </button>
                <span style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  minWidth: '32px',
                  textAlign: 'center'
                }}>
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= (item.stock || 99)}
                  aria-label="Increase quantity"
                  style={{
                    padding: '0.35rem 0.65rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    opacity: item.quantity >= (item.stock || 99) ? 0.4 : 1
                  }}
                >
                  +
                </button>
              </div>

              {/* Item Subtotal */}
              <div style={{ textAlign: 'right', minWidth: '85px' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                title="Remove Item"
                aria-label={`Remove ${item.title} from cart`}
                style={{
                  color: 'var(--text-subtle)',
                  padding: '0.4rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color var(--transition-fast)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-danger-500)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-subtle)'; }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          {/* Continue Shopping Action */}
          <div style={{ marginTop: '0.5rem' }}>
            <Link
              to="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--color-primary-600)'
              }}
            >
              <ArrowLeft size={16} />
              <span>Continue Shopping Catalog</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary (Phase 2 Aggregate Price calculation) */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)',
          position: 'sticky',
          top: 'calc(var(--header-height) + 1.5rem)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
            Order Summary
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.925rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-body)' }}>
              <span>Subtotal ({totalItems} items)</span>
              <span style={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-body)' }}>
              <span>Shipping Fee</span>
              <span style={{ fontWeight: 600, color: shipping === 0 ? 'var(--color-success-500)' : 'inherit' }}>
                {shipping === 0 ? 'FREE ($50+ perk)' : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-body)' }}>
              <span>Estimated Tax (8%)</span>
              <span style={{ fontWeight: 600 }}>${tax.toFixed(2)}</span>
            </div>

            {shipping > 0 && (
              <div style={{
                backgroundColor: 'var(--color-primary-50)',
                color: 'var(--color-primary-700)',
                padding: '0.5rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                💡 Add ${(50 - subtotal).toFixed(2)} more to unlock Free Shipping!
              </div>
            )}

            <div style={{
              borderTop: '2px dashed var(--border-light)',
              marginTop: '0.75rem',
              paddingTop: '0.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline'
            }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Total Price
              </span>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary-600)' }}>
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Phase 3 Protected Route Transition */}
          <div style={{ marginTop: '1.5rem' }}>
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
            <p style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              textAlign: 'center',
              marginTop: '0.75rem',
              marginBottom: 0
            }}>
              Protected Route • Unauthenticated users will redirect to /login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
