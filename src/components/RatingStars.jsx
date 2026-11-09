import { Star } from 'lucide-react';

export default function RatingStars({ rating = 0, reviewCount, size = 16, showNumber = true }) {
  const rounded = Math.round(Number(rating) * 10) / 10;
  const stars = [1, 2, 3, 4, 5];

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        {stars.map((index) => {
          const isFilled = index <= Math.floor(rounded);
          const isHalf = !isFilled && index === Math.ceil(rounded) && rounded % 1 >= 0.4;

          return (
            <Star
              key={index}
              size={size}
              style={{
                fill: isFilled ? 'var(--color-warning-500)' : isHalf ? 'var(--color-warning-500)' : '#e2e8f0',
                color: isFilled ? 'var(--color-warning-500)' : isHalf ? 'var(--color-warning-500)' : '#cbd5e1',
                opacity: isHalf ? 0.8 : 1,
              }}
            />
          );
        })}
      </div>

      {showNumber && (
        <span style={{
          fontSize: '0.825rem',
          fontWeight: 700,
          color: 'var(--text-main)',
          marginLeft: '0.15rem'
        }}>
          {rounded.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
