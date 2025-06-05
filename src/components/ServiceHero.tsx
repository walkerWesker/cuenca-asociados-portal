
import React, { useState, useEffect, useRef } from 'react';
import { useDevice } from '@/hooks/use-device';
import { servicesData } from '@/data/services';
import LogoDisplay from './LogoDisplay';

interface ServiceHeroProps {
  serviceId: string;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({ serviceId }) => {
  const device = useDevice();
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Encontrar el servicio correspondiente
  const service = servicesData.find(s => s.id === serviceId);

  // Efecto parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Precargar imagen
  useEffect(() => {
    if (service?.image) {
      const img = new Image();
      img.src = service.image;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setIsLoaded(true);
    }
  }, [service]);

  if (!service) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="text-center space-y-4">
          <p className="text-gray-600">Servicio no encontrado</p>
        </div>
      </div>
    );
  }

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

  const parallaxOffset = scrollY * 0.5;

  return (
    <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 w-full h-[120%]"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          willChange: 'transform'
        }}
      >
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className={`
            grid gap-8 items-center h-full
            ${device.isMobile ? 'grid-cols-1 text-center py-20' : ''}
            ${device.isTablet ? 'grid-cols-1 text-center py-16' : ''}
            ${device.isDesktop ? 'grid-cols-2 text-left' : ''}
          `}>
            {/* Text Content */}
            <div className={`
              space-y-6 
              ${device.isMobile ? 'order-1' : ''}
              ${device.isTablet ? 'order-1' : ''}
              ${device.isDesktop ? 'order-1' : ''}
            `}>
              <div className="space-y-4">
                <span className="inline-block text-cuenca-gold font-medium text-sm md:text-base tracking-wider opacity-0 animate-fade-in">
                  Servicio Especializado
                </span>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  {service.title}
                </h1>
                
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  {service.description}
                </p>
              </div>

              {/* Mobile Logo Display */}
              {device.isMobile && (
                <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <LogoDisplay />
                </div>
              )}

              {/* CTA Buttons */}
              <div className={`
                flex gap-4 opacity-0 animate-fade-in
                ${device.isMobile ? 'flex-col' : 'flex-row'}
              `} style={{ animationDelay: '0.8s' }}>
                <a
                  href="#contacto"
                  className="bg-cuenca-blue hover:bg-cuenca-blue/90 text-white px-8 py-4 rounded-lg transition-all duration-300 font-medium text-center transform hover:scale-105 hover:shadow-lg"
                >
                  Solicitar Información
                </a>
                <a
                  href="#nosotros"
                  className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 rounded-lg transition-all duration-300 font-medium text-center transform hover:scale-105 hover:shadow-lg"
                >
                  Conocer Más
                </a>
              </div>
            </div>

            {/* Desktop/Tablet Logo Display */}
            {!device.isMobile && (
              <div className={`
                flex justify-center items-center opacity-0 animate-fade-in
                ${device.isTablet ? 'order-2 mt-8' : 'order-2'}
              `} style={{ animationDelay: '1s' }}>
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
