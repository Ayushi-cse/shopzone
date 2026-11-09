import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Ensures SPA route changes always scroll smoothly to the top of the viewport.
 * Standard SPA practice to prevent inheriting scroll offsets from previous pages.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
}
