
import { useEffect, useCallback, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import ServicesSlider from '@/components/ServicesSlider';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useNavigation } from '@/contexts/NavigationContext';

/**
 * Página principal de la aplicación
 * Implementa el patrón de página con gestión de scroll y animaciones optimizadas
 */
const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { clearSavedRoute, isInitialized } = useNavigation();
  
  /**
   * Efecto para gestión del título del documento y limpieza de rutas
   */
  useEffect(() => {
    document.title = 'Cuenca & Asociados | Sociedad de Auditoría';
    
    // Limpiar ruta guardada cuando estamos en la página principal
    if (isInitialized) {
      clearSavedRoute();
      console.log('Ruta guardada limpiada - estamos en página principal');
    }
    
    return () => {
      // El título se resetea en otras páginas
    };
  }, [isInitialized, clearSavedRoute]);
  
  /**
   * Efecto para tracking del progreso de scroll
   * Implementa throttling para optimizar el rendimiento
   */
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  /**
   * Handler optimizado para clicks en enlaces anchor
   * Implementa smooth scrolling con offset para el header
   */
  const handleAnchorClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const href = target.getAttribute('href');
    
    if (href && href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.offsetTop - headerOffset;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth',
        });
        
        console.log('Navegación suave a:', href);
      }
    }
  }, []);
  
  /**
   * Configuración del Intersection Observer para animaciones
   * Implementa animaciones on-scroll optimizadas
   */
  useEffect(() => {
    // Configurar event listeners para enlaces anchor
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick as EventListener);
    });
    
    // Configurar Intersection Observer para animaciones
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Aplicar animaciones específicas basadas en data attributes
          const animation = entry.target.getAttribute('data-animation');
          if (animation) {
            entry.target.classList.add(animation);
          }
          
          // Opcional: dejar de observar después de la primera animación
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observar elementos con pequeño delay para asegurar que el DOM esté listo
    const timer = setTimeout(() => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach((element) => observer.observe(element));
    }, 100);
    
    // Función de limpieza para prevenir memory leaks
    return () => {
      clearTimeout(timer);
      anchorLinks.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener);
      });
      
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach(element => {
        observer.unobserve(element);
      });
      observer.disconnect();
    };
  }, [handleAnchorClick]);
  
  return (
    <div className="min-h-screen w-full overflow-x-hidden max-w-full relative">
      {/* Indicador de progreso de scroll */}
      <div 
        className="fixed top-0 left-0 h-1 bg-cuenca-gold z-50 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-label="Progreso de scroll"
      ></div>
      
      <Header />
      <main className="w-full overflow-x-hidden">
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
