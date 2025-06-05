
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDevice } from '@/hooks/use-device';
import { serviceHeroSlides, ServiceHeroSlide } from '@/data/serviceHero';
import LogoDisplay from './LogoDisplay';

interface ServiceHeroProps {
  serviceTitle?: string;
  serviceDescription?: string;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({ 
  serviceTitle, 
  serviceDescription 
}) => {
  const device = useDevice();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = serviceHeroSlides.map(slide => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = slide.image;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      });

      await Promise.all(imagePromises);
      setIsLoaded(true);
    };

    preloadImages();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (isLoaded) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % serviceHeroSlides.length);
      }, 6000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLoaded]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % serviceHeroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => prev === 0 ? serviceHeroSlides.length - 1 : prev - 1);
  }, []);

  // Touch handlers for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    } else if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  }, [touchStart, touchEnd, nextSlide, prevSlide]);

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

  const currentSlideData = serviceHeroSlides[currentSlide];

  return (
    <div 
      className="relative h-screen w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image and Overlay */}
      <div className="absolute inset-0">
        <img
          src={currentSlideData.image}
          alt={currentSlideData.title}
          className="h-full w-full object-cover transition-all duration-1000 ease-in-out"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${currentSlideData.gradientFrom} ${currentSlideData.gradientTo}`} />
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
                  {serviceTitle ? 'Servicio Especializado' : currentSlideData.subtitle}
                </span>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  {serviceTitle || currentSlideData.title}
                </h1>
                
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  {serviceDescription || currentSlideData.description}
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

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {serviceHeroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`
                    h-2 rounded-full transition-all duration-300
                    ${currentSlide === index 
                      ? 'w-8 bg-cuenca-gold' 
                      : 'w-2 bg-white/60 hover:bg-white/80'
                    }
                  `}
                  aria-label={`Ir al slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 transform hover:scale-110"
                aria-label="Slide anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 transform hover:scale-110"
                aria-label="Siguiente slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHero;
