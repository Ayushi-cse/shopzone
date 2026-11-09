import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  Truck,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Lock,
  Package
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const { cart, totalItems, subtotal, shipping, tax, grandTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '42 Silicon Lane, Suite 400',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560001',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '•••'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate asynchronous order processing
    setTimeout(() => {
      const orderPayload = {
        orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...cart],
        itemCount: totalItems,
        subtotal,
        shipping,
        tax,
        grandTotal,
        shippingAddress: {
          name: formData.fullName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
        },
        paymentMethod: formData.paymentMethod,
        orderDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      };

      // Clear the cart upon successful order placement
      clearCart();
      setCompletedOrder(orderPayload);
      setIsSubmitting(false);
    }, 1200);
  };

  // Order Confirmation Success View
  if (completedOrder) {
    return (
      <div className="checkout-success page-container animate-fade-in" style={{ padding: '3rem 1.25rem 5rem 1.25rem' }}>
        <div style={{
          maxWidth: '680px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          padding: 'clamp(2rem, 4vw, 3rem)',
          boxShadow: 'var(--shadow-md)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '76px',
            height: '76px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-success-bg)',
            color: 'var(--color-success-500)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto'
          }}>
            <CheckCircle2 size={42} />
          </div>

          <span className="badge badge-success" style={{ marginBottom: '0.75rem' }}>
            Payment Verified &amp; Confirmed
          </span>

          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Thank You for Your Order!
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
            Order confirmation identifier: <strong>{completedOrder.orderId}</strong>
          </p>

          {/* Order Details Receipt Box */}
          <div style={{
            backgroundColor: 'var(--bg-surface-alt)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            textAlign: 'left',
            marginBottom: '2rem',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Recipient</span>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, margin: '0.2rem 0 0 0' }}>{completedOrder.shippingAddress.name}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Order Date</span>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, margin: '0.2rem 0 0 0' }}>{completedOrder.orderDate}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
              {completedOrder.items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--text-main)' }}>
                    {item.title} <strong style={{ color: 'var(--text-muted)' }}>&times; {item.quantity}</strong>
                  </span>
                  <span style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '1rem', fontWeight: 800 }}>Total Paid:</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary-600)' }}>
                ${completedOrder.grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/shop" className="btn btn-primary btn-lg">
              <ShoppingBag size={18} />
              <span>Continue Shopping</span>
            </Link>
            <Link to="/" className="btn btn-secondary btn-lg">
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty, redirect prompt
  if (cart.length === 0) {
    return (
      <div className="page-container animate-fade-in" style={{ padding: '4rem 1.25rem', textAlign: 'center' }}>
        <div style={{
          maxWidth: '500px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          padding: '3rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <ShoppingBag size={40} style={{ color: 'var(--color-primary-600)', margin: '0 auto 1rem auto' }} />
          <h2>Your Cart is Empty</h2>
          <p style={{ color: 'var(--text-muted)', margin: '0.75rem 0 1.5rem 0' }}>
            You cannot proceed to checkout without any items in your bag.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Explore Inventory &rarr;
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page page-container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-success">
            <Lock size={12} />
            <span>Protected Route (Authenticated)</span>
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Logged in as <strong>{user?.name}</strong>
          </span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
          Checkout &amp; Order Placement
        </h1>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        alignItems: 'start'
      }}>
        {/* Left Column: Checkout Shipping & Payment Form */}
        <form onSubmit={handlePlaceOrder} style={{ gridColumn: '1 / span 2', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Shipping Address Card */}
          <div className="card" style={{ padding: '1.75rem', backgroundColor: '#ffffff' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={18} style={{ color: 'var(--color-primary-600)' }} />
              <span>1. Shipping Destination</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  className="form-input"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '1rem', marginBottom: 0 }}>
              <label className="form-label">Street Address</label>
              <input
                type="text"
                name="address"
                required
                className="form-input"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  className="form-input"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">State / Province</label>
                <input
                  type="text"
                  name="state"
                  required
                  className="form-input"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Postal / ZIP Code</label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  className="form-input"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="card" style={{ padding: '1.75rem', backgroundColor: '#ffffff' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CreditCard size={18} style={{ color: 'var(--color-primary-600)' }} />
              <span>2. Payment Simulation</span>
            </h3>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <label style={{
                flex: '1 1 140px',
                padding: '0.85rem',
                border: formData.paymentMethod === 'card' ? '2px solid var(--color-primary-600)' : '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                backgroundColor: formData.paymentMethod === 'card' ? 'var(--color-primary-50)' : 'var(--bg-surface)'
              }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleInputChange}
                />
                <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Credit Card (Mock)</span>
              </label>

              <label style={{
                flex: '1 1 140px',
                padding: '0.85rem',
                border: formData.paymentMethod === 'cod' ? '2px solid var(--color-primary-600)' : '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                backgroundColor: formData.paymentMethod === 'cod' ? 'var(--color-primary-50)' : 'var(--bg-surface)'
              }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleInputChange}
                />
                <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Cash on Delivery</span>
              </label>
            </div>

            {formData.paymentMethod === 'card' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0, gridColumn: '1 / -1' }}>
                  <label className="form-label">Card Number (Mock)</label>
                  <input
                    type="text"
                    name="cardNumber"
                    className="form-input"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Expiry</label>
                  <input
                    type="text"
                    name="cardExpiry"
                    className="form-input"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Security CVC</label>
                  <input
                    type="text"
                    name="cardCvc"
                    className="form-input"
                    value={formData.cardCvc}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Place Order CTA Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', padding: '1rem', fontSize: '1.05rem' }}
          >
            {isSubmitting ? (
              <span>Authorizing Transaction...</span>
            ) : (
              <>
                <ShieldCheck size={20} />
                <span>Place Order &bull; Pay ${grandTotal.toFixed(2)}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Right Column: Order Review Sidebar */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Order Review
            </h2>
            <Link to="/cart" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary-600)' }}>
              Edit Cart
            </Link>
          </div>

          {/* Items Preview */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            maxHeight: '260px',
            overflowY: 'auto',
            paddingRight: '0.5rem',
            marginBottom: '1.25rem',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '1rem'
          }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{
                    width: '44px',
                    height: '44px',
                    objectFit: 'contain',
                    backgroundColor: '#f8fafc',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)'
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {item.title}
                  </p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Qty: {item.quantity} &times; ${item.price.toFixed(2)}
                  </span>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Aggregates */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Subtotal:</span>
              <span style={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Shipping:</span>
              <span style={{ fontWeight: 600, color: shipping === 0 ? 'var(--color-success-500)' : 'inherit' }}>
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Estimated Tax (8%):</span>
              <span style={{ fontWeight: 600 }}>${tax.toFixed(2)}</span>
            </div>

            <div style={{
              borderTop: '2px dashed var(--border-light)',
              paddingTop: '0.75rem',
              marginTop: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline'
            }}>
              <span style={{ fontSize: '1rem', fontWeight: 800 }}>Total:</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary-600)' }}>
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
