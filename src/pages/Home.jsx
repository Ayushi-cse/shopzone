import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Zap,
  PhoneCall,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { fetchAllProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      try {
        const data = await fetchAllProducts();
        if (isMounted) {
          // Display top 4 products with highest ratings or featured selection
          const sorted = [...data].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4);
          setFeaturedProducts(sorted);
        }
      } catch (err) {
        console.error('Error loading featured items:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Welcome Banner (Phase 1 Deliverable) */}
      <section style={{
        position: 'relative',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border-light)',
        paddingTop: '3.5rem',
        paddingBottom: '4.5rem',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative background gradient circles */}
        <div style={{
          position: 'absolute',
          top: '-120px',
          right: '-100px',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-150px',
          left: '-80px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none'
        }} />

        <div className="page-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            {/* Engineering Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.95rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary-50)',
              color: 'var(--color-primary-700)',
              fontSize: '0.825rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              border: '1px solid var(--color-primary-200)',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <Sparkles size={14} />
              <span>Sprint 06 Architecture • Single Page Application (SPA)</span>
            </div>

            {/* Main Hero Headline */}
            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: 'var(--text-main)',
              marginBottom: '1.25rem'
            }}>
              Enterprise E-Commerce,{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--color-primary-600), #2563eb)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Seamlessly Connected.
              </span>
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: '2.25rem',
              maxWidth: '680px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Browse live inventory from DummyJSON, manage your reactive shopping bag across routes with Zero Prop Drilling, and experience protected checkout flows without page reloads.
            </p>

            {/* Primary Action CTAs */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '3rem'
            }}>
              <Link to="/shop" className="btn btn-primary btn-lg">
                <ShoppingBag size={18} />
                <span>Explore Shop Inventory</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-lg">
                <PhoneCall size={18} />
                <span>Contact &amp; Standup Sync</span>
              </Link>
            </div>

            {/* Architectural Highlights Checklist */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              fontSize: '0.85rem',
              color: 'var(--text-body)',
              fontWeight: 600
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-success-500)' }} />
                <span>Client-Side Routing (React Router v6)</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-success-500)' }} />
                <span>Global CartContext (No Redux)</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-success-500)' }} />
                <span>LocalStorage State Persistence</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase Strip */}
      <section style={{ padding: '3.5rem 0', backgroundColor: 'var(--bg-body)' }}>
        <div className="page-container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
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
                Curated Inventory
              </span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
                Browse by Department
              </h2>
            </div>
            <Link
              to="/shop"
              style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--color-primary-600)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <span>View full catalog</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem'
          }}>
            {[
              {
                name: 'Beauty & Skincare',
                category: 'beauty',
                count: '5+ items',
                icon: '✨',
                desc: 'Mascara, powders, luxury lipsticks'
              },
              {
                name: 'Fine Fragrances',
                category: 'fragrances',
                count: '3+ items',
                icon: '🌸',
                desc: 'Dior, Chanel, Calvin Klein perfumes'
              },
              {
                name: 'Modern Furniture',
                category: 'furniture',
                count: '2+ items',
                icon: '🛋️',
                desc: 'Ergonomic conference chairs & artisan beds'
              },
              {
                name: 'Fresh Groceries',
                category: 'groceries',
                count: '2+ items',
                icon: '🥑',
                desc: 'Organic produce & pure raw honey'
              }
            ].map((cat) => (
              <Link
                key={cat.category}
                to={`/shop?category=${cat.category}`}
                className="card card-hoverable"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  backgroundColor: '#ffffff'
                }}
              >
                <div style={{
                  fontSize: '2rem',
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface-alt)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {cat.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
                    {cat.desc}
                  </p>
                </div>
                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--color-primary-600)'
                }}>
                  <span>Browse Category</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Grid Preview */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#ffffff', borderTop: '1px solid var(--border-light)' }}>
        <div className="page-container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
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
                Customer Favorites
              </span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
                Top-Rated Products
              </h2>
            </div>
            <Link
              to="/shop"
              className="btn btn-outline btn-sm"
            >
              <span>See All In Shop &rarr;</span>
            </Link>
          </div>

          {loading ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}>
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="card" style={{ height: '360px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ height: '200px', backgroundColor: '#f1f5f9', borderRadius: 'var(--radius-md)' }} />
                  <div style={{ height: '20px', width: '60%', backgroundColor: '#f1f5f9', borderRadius: '4px' }} />
                  <div style={{ height: '16px', width: '80%', backgroundColor: '#f1f5f9', borderRadius: '4px' }} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}>
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Mandatory 1-on-1 Standup Banner (Residency Context) */}
      <section style={{ padding: '3.5rem 0', backgroundColor: 'var(--bg-body)' }}>
        <div className="page-container">
          <div style={{
            background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            color: '#ffffff',
            boxShadow: 'var(--shadow-xl)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem'
              }}>
                <PhoneCall size={13} />
                <span>Mandatory Action Item • Mid-Pipeline Sync</span>
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '0.75rem' }}>
                Residency Check-In with Mr. Nakul
              </h3>
              <p style={{ color: '#c7d2fe', fontSize: '0.925rem', lineHeight: 1.6, margin: 0 }}>
                We are 1/3 of the way through your engineering residency. Ensure your career trajectory is aligned by dialing into your concise 3-minute technical standup. Formally evaluated for your "Technical Communication" KPI.
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#a5b4fc', textTransform: 'uppercase', fontWeight: 700 }}>Residency Contact Channel</span>
                <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: '0.2rem 0' }}>
                  Contact your coordinator
                </p>
                <span style={{ fontSize: '0.8rem', color: '#c7d2fe' }}>
                  Mon – Fri | 9:00 AM – 6:00 PM IST
                </span>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: '0.75rem' }}>
                <Link
                  to="/contact"
                  className="btn"
                  style={{
                    width: '100%',
                    backgroundColor: '#ffffff',
                    color: '#312e81',
                    fontWeight: 700
                  }}
                >
                  <span>Open Contact & Standup Desk</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
