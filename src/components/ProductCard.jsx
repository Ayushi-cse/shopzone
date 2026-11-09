import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import RatingStars from './RatingStars';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleQuickAdd = (e) => {
    // Prevent the parent card Link navigation from triggering
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const originalPrice = product.discountPercentage
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <article className="card card-hoverable" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative'
    }}>
      {/* Product Image & Badges */}
      <Link
        to={`/product/${product.id}`}
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '80%', // 4:3 Aspect ratio container
          backgroundColor: '#f8fafc',
          overflow: 'hidden',
          display: 'block'
        }}
      >
        <img
          src={product.thumbnail || (product.images && product.images[0])}
          alt={product.title}
          loading="lazy"
          onError={(e) => {
            // Graceful fallback for broken image URLs
            e.currentTarget.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: '1rem',
            transition: 'transform 300ms ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        />

        {/* Discount Badge */}
        {product.discountPercentage && Math.round(product.discountPercentage) > 0 && (
          <span
            className="badge badge-danger"
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            -{Math.round(product.discountPercentage)}%
          </span>
        )}

        {/* Category Pill */}
        <span
          className="badge"
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(4px)',
            color: 'var(--text-muted)',
            border: '1px solid var(--border-light)'
          }}
        >
          <Tag size={10} />
          <span>{product.category}</span>
        </span>
      </Link>

      {/* Product Content Details */}
      <div style={{
        padding: '1.15rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: '0.5rem'
      }}>
        {/* Brand / Rating Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--color-primary-600)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            {product.brand || 'ShopZone'}
          </span>
          <RatingStars rating={product.rating} size={14} showNumber />
        </div>

        {/* Title linked to dynamic route /product/:id */}
        <h3 style={{
          fontSize: '0.975rem',
          fontWeight: 700,
          color: 'var(--text-main)',
          lineHeight: 1.35,
          margin: 0,
          minHeight: '2.7em',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          <Link
            to={`/product/${product.id}`}
            style={{ color: 'inherit', transition: 'color var(--transition-fast)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-primary-600)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-main)'; }}
          >
            {product.title}
          </Link>
        </h3>

        {/* Price & Action Row */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                ${Number(product.price).toFixed(2)}
              </span>
              {originalPrice && (
                <span style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-subtle)',
                  textDecoration: 'line-through'
                }}>
                  ${originalPrice}
                </span>
              )}
            </div>
            <span style={{
              fontSize: '0.725rem',
              color: product.stock < 10 ? 'var(--color-danger-500)' : 'var(--color-success-500)',
              fontWeight: 600
            }}>
              {product.stock < 10 ? `Only ${product.stock} left` : 'In Stock'}
            </span>
          </div>

          {/* Quick Add to Cart Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className="btn btn-primary btn-sm"
            title="Add to Cart"
            aria-label={`Add ${product.title} to Cart`}
            style={{
              padding: '0.45rem 0.75rem',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <ShoppingCart size={15} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}
