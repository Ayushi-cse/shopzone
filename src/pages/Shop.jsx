import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, RotateCcw, AlertCircle } from 'lucide-react';
import { fetchAllProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Read and sync category filter with URL query parameters for bookmarkable URLs
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    let isSubscribed = true;

    async function loadInventory() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAllProducts();
        if (isSubscribed) {
          setProducts(data);
        }
      } catch (err) {
        if (isSubscribed) {
          setError(err.message || 'Failed to fetch inventory from DummyJSON');
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    }

    loadInventory();

    return () => {
      isSubscribed = false;
    };
  }, []);

  // Compute available unique categories dynamically from the loaded products
  const categories = useMemo(() => {
    const unique = new Set(products.map(p => p.category).filter(Boolean));
    return ['all', ...Array.from(unique)];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter(
        p => p.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Search query filter (title, description, brand)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        p =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q)
      );
    }

    // Sort order
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  const handleCategorySelect = (category) => {
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSortBy('featured');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  return (
    <div className="shop-page page-container animate-fade-in" style={{ paddingBottom: '3rem' }}>
      {/* Header Banner */}
      <div style={{
        marginBottom: '2rem',
        padding: '2rem',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-xs)'
      }}>
        <div style={{ maxWidth: '640px' }}>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--color-primary-600)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            DummyJSON Inventory Feed
          </span>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: 'var(--text-main)',
            lineHeight: 1.2,
            margin: '0.35rem 0 0.5rem 0'
          }}>
            Shop All Products
          </h1>
          <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', margin: 0 }}>
            Browse our reactive multi-route catalog. Click any product card to inspect full specifications hydrated via <code>useParams()</code>.
          </p>
        </div>

        {/* Filter and Search Bar Controls */}
        <div style={{
          marginTop: '1.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '1rem',
          justifyContent: 'space-between'
        }}>
          {/* Search Input */}
          <div style={{
            position: 'relative',
            flex: '1 1 280px',
            maxWidth: '420px'
          }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-subtle)'
              }}
            />
            <input
              type="text"
              className="form-input"
              placeholder="Search products, brands, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '0.75rem',
                  color: 'var(--text-subtle)',
                  fontWeight: 600
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <SlidersHorizontal size={16} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Sort:</span>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ width: 'auto', padding: '0.5rem 2rem 0.5rem 0.85rem' }}
            >
              <option value="featured">Featured / Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Category Pills Strip */}
        <div style={{
          marginTop: '1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginRight: '0.25rem' }}>
            Departments:
          </span>
          {categories.map((cat) => {
            const isSelected = activeCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  border: isSelected ? '1px solid var(--color-primary-600)' : '1px solid var(--border-light)',
                  backgroundColor: isSelected ? 'var(--color-primary-600)' : 'var(--bg-surface)',
                  color: isSelected ? '#ffffff' : 'var(--text-body)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {cat === 'all' ? 'All Departments' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Status Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        fontSize: '0.875rem',
        color: 'var(--text-muted)'
      }}>
        <span>
          Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'item' : 'items'}
          {activeCategory !== 'all' && ` in department "${activeCategory}"`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>

        {(activeCategory !== 'all' || searchQuery || sortBy !== 'featured') && (
          <button
            type="button"
            onClick={resetFilters}
            className="btn btn-sm btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <RotateCcw size={13} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Product Grid Area */}
      {loading ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem'
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
            <div key={n} className="card" style={{ height: '380px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ height: '220px', backgroundColor: '#f1f5f9', borderRadius: 'var(--radius-md)' }} />
              <div style={{ height: '18px', width: '40%', backgroundColor: '#f1f5f9', borderRadius: '4px' }} />
              <div style={{ height: '22px', width: '85%', backgroundColor: '#f1f5f9', borderRadius: '4px' }} />
              <div style={{ marginTop: 'auto', height: '36px', backgroundColor: '#f1f5f9', borderRadius: 'var(--radius-md)' }} />
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          padding: '4rem 2rem',
          textAlign: 'center',
          maxWidth: '520px',
          margin: '2rem auto'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: '#fee2e2',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto'
          }}>
            <AlertCircle size={28} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            No Matching Products Found
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            We couldn't find any inventory matching your current search or category criteria. Try broadening your keywords or resetting filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="btn btn-primary"
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
