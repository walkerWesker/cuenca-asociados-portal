
import { useCallback, useEffect } from 'react';

interface AnchorNavigationOptions {
  offset?: number;
}

/**
 * Custom hook for smooth anchor link navigation
 */
export const useAnchorNavigation = (options: AnchorNavigationOptions = {}) => {
  const { offset = 80 } = options;
  
  const handleAnchorClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const href = target.getAttribute('href');
    
    if (href && href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      
      if (element) {
        window.scrollTo({
          top: element.offsetTop - offset,
          behavior: 'smooth',
        });
      }
    }
  }, [offset]);
  
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick as EventListener);
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener);
      });
    };
  }, [handleAnchorClick]);
  
  return { handleAnchorClick };
};
