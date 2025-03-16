
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { servicesData } from '@/data/services';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

// Define important services that must be included
const importantServiceIds = [
  'auditoria-financiera',
  'tributario',
  'reestructuracion',
  'niif',
  'outsourcing'
];

// Create slides with priority services first
const slides = importantServiceIds.map(serviceId => {
  const service = servicesData.find(s => s.id === serviceId);
  if (!service) return null;
  
  return {
    id: serviceId,
    title: service.title,
    subtitle: serviceId === 'auditoria-financiera' ? 'Expertos en Auditoría' : 'Servicios Especializados',
    description: service.description,
    image: service.image,
    serviceId: service.id
  };
}).filter(Boolean);

// Add other services if needed to reach desired count
servicesData.forEach(service => {
  if (!slides.some(slide => slide?.serviceId === service.id) && slides.length < 6) {
    slides.push({
      id: service.id,
      title: service.title,
      subtitle: 'Servicios Especializados',
      description: service.description,
      image: service.image,
      serviceId: service.id
    });
  }
});

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const promises = slides.map((slide) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = slide.image;
            img.onload = resolve;
            img.onerror = resolve; // Handle any loading errors gracefully
          });
        });
        
        await Promise.all(promises);
      } catch (error) {
        console.error("Error preloading images:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    preloadImages();
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }
    
    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };
  
  if (isLoading) {
    return (
      <div id="home" className="relative h-screen md:h-screen w-full flex items-center justify-center bg-gray-100">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-48 bg-gray-300 rounded mb-4"></div>
          <div className="h-6 w-36 bg-gray-300 rounded mb-8"></div>
          <div className="h-4 w-64 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      id="home" 
      className="relative h-[85vh] md:h-screen w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-20' : 'opacity-0 z-10'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="container mx-auto px-4">
              <div className={`max-w-xl mx-auto ${isMobile ? 'text-center' : 'md:mx-0 md:text-left'}`}>
                <span className="inline-block text-cuenca-gold font-medium mb-2 tracking-wider animate-fade-in">
                  {slide.subtitle}
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-base md:text-lg text-white/90 mb-6 md:mb-8 animate-slide-in-up">
                  {slide.description}
                </p>
                <div className={`flex ${isMobile ? 'flex-col' : 'md:flex-row'} gap-4 justify-center md:justify-start animate-scale-in`}>
                  <a 
                    href="#servicios" 
                    className="bg-cuenca-blue hover:bg-opacity-90 text-white px-6 py-3 rounded-md transition-all duration-300 text-center"
                  >
                    Nuestros Servicios
                  </a>
                  <Link 
                    to={`/servicios/${slide.serviceId}`}
                    className="bg-transparent hover:bg-white/10 text-white border border-white px-6 py-3 rounded-md transition-all duration-300 text-center"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Slider Controls */}
      <div className="absolute bottom-8 z-30 w-full">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'w-8 bg-cuenca-gold' : 'w-2 bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
