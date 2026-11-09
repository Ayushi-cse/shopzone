import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronRight,
  Package
} from 'lucide-react';
import { fetchProductById } from '../services/productService';
import { useCart } from '../context/CartContext';
import RatingStars from '../components/RatingStars';

export default function ProductDetails() {
  // Phase 1 Deliverable: Extract dynamic :id param from URL
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  // Check if item is already in global cart to show current count
  const existingCartItem = cart.find(item => item.id === Number(id));

  // Phase 1 Deliverable: Data Hydration via useParams()
  useEffect(() => {
    let isSubscribed = true;
    async function loadProduct() {
      setLoading(true);
      setError(null);
      setQuantity(1);
      try {
        const data = await fetchProductById(id);
        if (isSubscribed) {
          setProduct(data);
          const initialImg = (data.images && data.images[0]) || data.thumbnail || '';
          setSelectedImage(initialImg);
        }
      } catch (err) {
        if (isSubscribed) {
          setError(err.message || 'Unable to retrieve product details.');
        }
      } finally {
        if (isSubscribed) setLoading(false);
      }
    }

    loadProduct();

    return () => {
      isSubscribed = false;
    };
  }, [id]);

  // Phase 2 Deliverable: Add to Cart Dispatch
  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleQtyDecrement = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleQtyIncrement = () => {
    const maxStock = product?.stock || 99;
    setQuantity(prev => Math.min(maxStock, prev + 1));
  };

  if (loading) {
    return (
      <div className="page-container animate-fade-in" style={{ padding: '3rem 1.25rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          backgroundColor: '#ffffff',
          padding: '2.5rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ height: '400px', backgroundColor: '#f1f5f9', borderRadius: 'var(--radius-lg)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ height: '24px', width: '30%', backgroundColor: '#f1f5f9', borderRadius: '4px' }} />
            <div style={{ height: '36px', width: '80%', backgroundColor: '#f1f5f9', borderRadius: '4px' }} />
            <div style={{ height: '20px', width: '40%', backgroundColor: '#f1f5f9', borderRadius: '4px' }} />
            <div style={{ height: '80px', width: '100%', backgroundColor: '#f1f5f9', borderRadius: '4px' }} />
            <div style={{ height: '48px', width: '50%', backgroundColor: '#f1f5f9', borderRadius: 'var(--radius-md)' }} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page-container" style={{ padding: '4rem 1.25rem', textAlign: 'center' }}>
        <div style={{
          maxWidth: '500px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          padding: '3rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)'
        }}>
          <h2>Product Not Found</h2>
          <p style={{ color: 'var(--text-muted)', margin: '1rem 0 1.5rem 0' }}>
            We could not hydrate product ID <code>{id}</code>. It might not exist in the DummyJSON catalog.
          </p>
          <button onClick={() => navigate('/shop')} className="btn btn-primary">
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  const originalPrice = product.discountPercentage
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <div className="product-details-page page-container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumbs" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        marginBottom: '1.5rem'
      }}>
        <Link to="/" style={{ color: 'var(--text-muted)', transition: 'color var(--transition-fast)' }}>
          Home
        </Link>
        <ChevronRight size={14} />
        <Link to="/shop" style={{ color: 'var(--text-muted)', transition: 'color var(--transition-fast)' }}>
          Shop
        </Link>
        <ChevronRight size={14} />
        <Link
          to={`/shop?category=${product.category}`}
          style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}
        >
          {product.category}
        </Link>
        <ChevronRight size={14} />
        <span style={{
          color: 'var(--text-main)',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '260px'
        }}>
          {product.title}
        </span>
      </nav>

      {/* Back to Shop Link */}
      <div style={{ marginBottom: '1.25rem' }}>
        <button
          type="button"
          onClick={() => navigate('/shop')}
          className="btn btn-secondary btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <ArrowLeft size={15} />
          <span>Back to Catalog</span>
        </button>
      </div>

      {/* Main Hydrated Product Section */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        padding: 'clamp(1.5rem, 3vw, 2.75rem)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        marginBottom: '2.5rem'
      }}>
        {/* Gallery Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Main Selected Image */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '380px',
            backgroundColor: '#f8fafc',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            overflow: 'hidden'
          }}>
            <img
              src={selectedImage || product.thumbnail}
              alt={product.title}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';
              }}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                transition: 'transform 300ms ease'
              }}
            />
            {product.discountPercentage && Math.round(product.discountPercentage) > 0 && (
              <span
                className="badge badge-danger"
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  fontSize: '0.8rem',
                  padding: '0.35rem 0.75rem'
                }}
              >
                Save {Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>

          {/* Thumbnail Gallery Row */}
          {product.images && product.images.length > 1 && (
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              overflowX: 'auto',
              paddingBottom: '0.5rem'
            }}>
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(imgUrl)}
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: 'var(--radius-md)',
                    border: selectedImage === imgUrl ? '2px solid var(--color-primary-600)' : '1px solid var(--border-light)',
                    backgroundColor: '#f8fafc',
                    padding: '4px',
                    flexShrink: 0,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'border-color var(--transition-fast)'
                  }}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Actions Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Brand & Department Meta */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <span style={{
              fontSize: '0.825rem',
              fontWeight: 700,
              color: 'var(--color-primary-600)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              {product.brand || 'ShopZone Essentials'} • SKU: {product.sku || `SKU-${product.id}`}
            </span>
            <span className="badge badge-primary" style={{ textTransform: 'capitalize' }}>
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
            fontWeight: 800,
            color: 'var(--text-main)',
            lineHeight: 1.25,
            margin: 0
          }}>
            {product.title}
          </h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <RatingStars rating={product.rating} reviewCount={product.reviews ? product.reviews.length : 24} size={18} />
            <span style={{ color: 'var(--text-subtle)' }}>•</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-success-500)', fontWeight: 600 }}>
              {product.availabilityStatus || (product.stock > 0 ? 'Verified In Stock' : 'Out of Stock')}
            </span>
          </div>

          {/* Price Block */}
          <div style={{
            padding: '1.15rem 1.5rem',
            backgroundColor: 'var(--bg-surface-alt)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.85rem'
          }}>
            <span style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
              ${Number(product.price).toFixed(2)}
            </span>
            {originalPrice && (
              <span style={{
                fontSize: '1.1rem',
                color: 'var(--text-subtle)',
                textDecoration: 'line-through'
              }}>
                ${originalPrice}
              </span>
            )}
            {product.discountPercentage && (
              <span className="badge badge-success">
                Save ${(originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              About This Item
            </h4>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-body)', lineHeight: 1.65, margin: 0 }}>
              {product.description}
            </p>
          </div>

          {/* Quantity Selector & Add to Cart Controls */}
          <div style={{
            borderTop: '1px solid var(--border-light)',
            paddingTop: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Quantity:
              </span>

              {/* Stepper */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1.5px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#ffffff'
              }}>
                <button
                  type="button"
                  onClick={handleQtyDecrement}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  style={{
                    padding: '0.5rem 0.85rem',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    opacity: quantity <= 1 ? 0.4 : 1
                  }}
                >
                  -
                </button>
                <span style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  minWidth: '40px',
                  textAlign: 'center'
                }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleQtyIncrement}
                  disabled={quantity >= (product.stock || 99)}
                  aria-label="Increase quantity"
                  style={{
                    padding: '0.5rem 0.85rem',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    opacity: quantity >= (product.stock || 99) ? 0.4 : 1
                  }}
                >
                  +
                </button>
              </div>

              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                ({product.stock || 15} available)
              </span>
            </div>

            {/* Action Buttons Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button
                type="button"
                onClick={handleAddToCart}
                className="btn btn-primary btn-lg"
                style={{ flex: '1 1 200px' }}
              >
                {isAdded ? (
                  <>
                    <Check size={18} />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    <span>Add {quantity} to Bag</span>
                  </>
                )}
              </button>

              <Link
                to="/cart"
                className="btn btn-secondary btn-lg"
                style={{ flex: '1 1 140px' }}
              >
                <span>View Bag ({existingCartItem ? existingCartItem.quantity : 0})</span>
              </Link>
            </div>
          </div>

          {/* Service Promises */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.75rem',
            paddingTop: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              <Truck size={16} style={{ color: 'var(--color-primary-600)' }} />
              <span>{product.shippingInformation || 'Standard 2-3 Day Delivery'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={16} style={{ color: 'var(--color-success-500)' }} />
              <span>{product.warrantyInformation || '1-Year Official Warranty'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              <RotateCcw size={16} style={{ color: 'var(--color-warning-500)' }} />
              <span>{product.returnPolicy || '30-Day Money Back Guarantee'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          padding: '2rem',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
            Customer Feedback ({product.reviews.length} reviews)
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem'
          }}>
            {product.reviews.map((rev, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--bg-surface-alt)',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    {rev.reviewerName}
                  </span>
                  <RatingStars rating={rev.rating} size={13} showNumber={false} />
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5, margin: 0 }}>
                  "{rev.comment}"
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.5rem', display: 'block' }}>
                  Reviewed on {rev.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
