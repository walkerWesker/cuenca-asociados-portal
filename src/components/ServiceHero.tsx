
import React, { useState, useEffect, useRef } from 'react';
import { useDevice } from '@/hooks/use-device';
import { servicesData } from '@/data/services';
import LogoDisplay from './LogoDisplay';

interface ServiceHeroProps {
  serviceId: string;
}

/**
 * Componente ServiceHero - Sección principal de presentación de servicios
 * Implementa efectos parallax y diseño responsivo optimizado para todos los dispositivos
 */
const ServiceHero: React.FC<ServiceHeroProps> = ({ serviceId }) => {
  const device = useDevice();
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Buscar el servicio correspondiente en la base de datos
  const service = servicesData.find(s => s.id === serviceId);

  // Implementación de efecto parallax optimizado con requestAnimationFrame para mejor rendimiento
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sistema de precarga de imágenes con fallback de tiempo límite
  useEffect(() => {
    if (service?.image) {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setIsLoaded(true); // Mostrar contenido incluso si falla la imagen
      img.src = service.image;
      
      // Fallback de seguridad: mostrar después de 1 segundo máximo
      const fallbackTimer = setTimeout(() => setIsLoaded(true), 1000);
      
      return () => clearTimeout(fallbackTimer);
    } else {
      setIsLoaded(true);
    }
  }, [service]);

  // Función para navegación suave hacia la sección "Qué ofrecemos"
  const handleScrollToOffers = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('h2');
    if (element && element.textContent?.includes('Qué ofrecemos')) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Manejo de estado de error: servicio no encontrado
  if (!service) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="text-center space-y-4">
          <p className="text-gray-600">Servicio no encontrado</p>
        </div>
      </div>
    );
  }

  // Estado de carga con indicador visual
  if (!isLoaded) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-cuenca-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Cálculo del desplazamiento parallax optimizado
  const parallaxOffset = scrollY * 0.4;

  return (
    <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Imagen de fondo con efecto parallax para escritorio y tablet */}
      <div 
        className="absolute inset-0 w-full h-[120%]"
        style={{
          transform: `translate3d(0, ${parallaxOffset}px, 0)`,
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
      >
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      </div>

      {/* Contenido principal con diseño responsivo mejorado */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`
            grid gap-6 sm:gap-8 lg:gap-12 items-center h-full
            ${device.isMobile ? 'grid-cols-1 text-center py-16 sm:py-20' : ''}
            ${device.isTablet ? 'grid-cols-1 lg:grid-cols-2 text-center lg:text-left py-12 sm:py-16' : ''}
            ${device.isDesktop ? 'grid-cols-2 text-left' : ''}
          `}>
            {/* Sección de contenido textual */}
            <div className={`
              space-y-4 sm:space-y-6 
              ${device.isMobile ? 'order-1' : ''}
              ${device.isTablet ? 'order-1 max-w-2xl mx-auto lg:mx-0' : ''}
              ${device.isDesktop ? 'order-1' : ''}
            `}>
              <div className="space-y-3 sm:space-y-4">
                <span className="inline-block text-cuenca-gold font-medium text-sm sm:text-base tracking-wider">
                  Servicio Especializado
                </span>
                
                <h1 className={`
                  font-bold text-white leading-tight
                  ${device.isMobile ? 'text-2xl sm:text-3xl md:text-4xl' : ''}
                  ${device.isTablet ? 'text-3xl sm:text-4xl lg:text-5xl' : ''}
                  ${device.isDesktop ? 'text-4xl lg:text-5xl xl:text-6xl' : ''}
                `}>
                  {service.title}
                </h1>
                
                <p className={`
                  text-white/90 leading-relaxed max-w-2xl
                  ${device.isMobile ? 'text-base sm:text-lg' : ''}
                  ${device.isTablet ? 'text-lg' : ''}
                  ${device.isDesktop ? 'text-lg md:text-xl' : ''}
                `}>
                  {service.description}
                </p>
              </div>

              {/* Logo en dispositivos móviles */}
              {device.isMobile && (
                <div className="py-4">
                  <LogoDisplay />
                </div>
              )}

              {/* Botones de llamada a la acción */}
              <div className={`
                flex gap-3 sm:gap-4
                ${device.isMobile ? 'flex-col' : ''}
                ${device.isTablet ? 'flex-col sm:flex-row justify-center lg:justify-start' : ''}
                ${device.isDesktop ? 'flex-row' : ''}
              `}>
                <a
                  href="#contacto"
                  className={`
                    bg-cuenca-blue hover:bg-cuenca-blue/90 text-white rounded-lg 
                    transition-all duration-300 font-medium text-center 
                    transform hover:scale-105 hover:shadow-lg
                    ${device.isMobile ? 'px-6 py-3 text-sm' : ''}
                    ${device.isTablet ? 'px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base' : ''}
                    ${device.isDesktop ? 'px-8 py-4' : ''}
                  `}
                >
                  Solicitar Información
                </a>
                <button
                  onClick={handleScrollToOffers}
                  className={`
                    bg-transparent hover:bg-white/10 text-white border-2 border-white 
                    rounded-lg transition-all duration-300 font-medium text-center 
                    transform hover:scale-105 hover:shadow-lg
                    ${device.isMobile ? 'px-6 py-3 text-sm' : ''}
                    ${device.isTablet ? 'px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base' : ''}
                    ${device.isDesktop ? 'px-8 py-4' : ''}
                  `}
                >
                  Conocer Más
                </button>
              </div>
            </div>

            {/* Logo en dispositivos tablet y desktop */}
            {!device.isMobile && (
              <div className={`
                flex justify-center items-center
                ${device.isTablet ? 'order-2 mt-6 lg:mt-0' : 'order-2'}
              `}>
                <LogoDisplay />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHero;
