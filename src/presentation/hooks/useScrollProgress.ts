
import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to track scroll progress through the page
 */
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);
  }, []);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  
  return scrollProgress;
};
