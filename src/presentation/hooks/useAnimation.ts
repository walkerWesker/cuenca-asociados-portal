
import { useCallback, useEffect } from 'react';

interface AnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Custom hook for handling scroll-based animations
 */
export const useAnimation = (options: AnimationOptions = {}) => {
  const { 
    threshold = 0.1, 
    rootMargin = '0px', 
    once = false 
  } = options;

  const setupAnimations = useCallback(() => {
    const observerOptions = {
      root: null,
      rootMargin,
      threshold,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Get any specific animation attribute
          const animation = entry.target.getAttribute('data-animation');
          if (animation) {
            entry.target.classList.add(animation);
          }
          
          // If animation should only happen once, unobserve after it's triggered
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          // If not set to once, remove the class when out of view
          entry.target.classList.remove('visible');
          
          const animation = entry.target.getAttribute('data-animation');
          if (animation) {
            entry.target.classList.remove(animation);
          }
        }
      });
    }, observerOptions);

    // Find all elements with the animation class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Observe each element
    animatedElements.forEach(element => {
      observer.observe(element);
    });

    // Cleanup function
    return () => {
      animatedElements.forEach(element => {
        observer.unobserve(element);
      });
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  useEffect(() => {
    const cleanup = setupAnimations();
    return cleanup;
  }, [setupAnimations]);

  return {
    setupAnimations
  };
};
