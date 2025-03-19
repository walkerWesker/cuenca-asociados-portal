
import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/presentation/components/Hero';
import Services from '@/presentation/components/Services';
import ServicesSlider from '@/presentation/components/ServicesSlider';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useScrollProgress } from '@/presentation/hooks/useScrollProgress';
import { useAnchorNavigation } from '@/presentation/hooks/useAnchorNavigation';
import { useAnimation } from '@/presentation/hooks/useAnimation';

/**
 * Main index page component following modern React practices
 */
const Index = () => {
  // Custom hooks - extract reusable logic
  const scrollProgress = useScrollProgress();
  useAnchorNavigation();
  useAnimation();
  
  // Document title effect
  useEffect(() => {
    document.title = 'Cuenca & Asociados | Sociedad de Auditoría';
    return () => {
      // Title is reset in other pages' cleanup functions
    };
  }, []);
  
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
