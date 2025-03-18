
import { useEffect, useCallback, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import ServicesSlider from '@/components/ServicesSlider';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Set document title
  useEffect(() => {
    document.title = 'Cuenca & Asociados | Sociedad de Auditoría';
    
    // Clean up function
    return () => {
      // Title is reset in other pages' cleanup functions
    };
  }, []);
  
  // Track scroll progress for animations
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Optimized handler for anchor clicks
  const handleAnchorClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const href = target.getAttribute('href');
    
    if (href && href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80, // Offset for the header
          behavior: 'smooth',
        });
      }
    }
  }, []);
  
  // Set up intersection observer for animations
  useEffect(() => {
    // Add click event listeners to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick as EventListener);
    });
    
    // Initialize animation for elements that should animate on scroll
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15, // Lower threshold to trigger animations earlier
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add visible class for basic animation
          entry.target.classList.add('visible');
          
          // Get data attribute to apply specific animations
          const animation = entry.target.getAttribute('data-animation');
          if (animation) {
            entry.target.classList.add(animation);
          }
        }
      });
    }, observerOptions);
    
    // Efficiently query elements only once
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((element) => observer.observe(element));
    
    // Cleanup to prevent memory leaks
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener);
      });
      
      animatedElements.forEach(element => {
        observer.unobserve(element);
      });
      observer.disconnect();
    };
  }, [handleAnchorClick]);
  
  return (
    <div className="min-h-screen relative">
      {/* Scroll progress indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-cuenca-gold z-50 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      ></div>
      
      <Header />
      <main>
        <Hero />
        <ServicesSlider />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
