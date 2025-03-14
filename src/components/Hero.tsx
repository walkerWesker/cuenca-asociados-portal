
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { servicesData } from '@/data/services';

// Create slides from the top services
const slides = [
  {
    id: 1,
    title: 'Soluciones Financieras',
    subtitle: 'Confiables & Profesionales',
    description: 'Expertos en auditoría financiera, contable y tributaria con más de 20 años de experiencia.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    serviceId: 'auditoria-financiera'
  },
  {
    id: 2,
    title: 'Asesoría Tributaria',
    subtitle: 'Optimiza tus Obligaciones',
    description: 'Cumplimiento eficiente de declaraciones, reclamaciones y solicitudes ante SUNAT.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2011&q=80',
    serviceId: 'tributario'
  },
  {
    id: 3,
    title: 'Reestructuración Empresarial',
    subtitle: 'Mejora tu Organización',
    description: 'Reorganización de obligaciones y determinación de viabilidad comercial y operacional.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    serviceId: 'reestructuracion'
  },
];

// Add other key services from servicesData
servicesData.forEach(service => {
  if (!slides.some(slide => slide.serviceId === service.id) && slides.length < 6) {
    slides.push({
      id: slides.length + 1,
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
  
  useEffect(() => {
    const preloadImages = async () => {
      const promises = slides.map((slide) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = slide.image;
          img.onload = resolve;
        });
      });
      
      await Promise.all(promises);
      setIsLoading(false);
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
      <div id="home" className="relative h-screen w-full flex items-center justify-center bg-gray-100">
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
      className="relative h-screen w-full overflow-hidden"
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
              <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
                <span className="inline-block text-cuenca-gold font-medium mb-2 tracking-wider animate-slide-in">
                  {slide.subtitle}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-lg text-white/90 mb-8 animate-slide-up">
                  {slide.description}
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start animate-scale-up">
                  <a 
                    href="#servicios" 
                    className="bg-cuenca-blue hover:bg-opacity-90 text-white px-6 py-3 rounded-md transition-all duration-300"
                  >
                    Nuestros Servicios
                  </a>
                  <a 
                    href={`/servicios/${slide.serviceId}`}
                    className="bg-transparent hover:bg-white/10 text-white border border-white px-6 py-3 rounded-md transition-all duration-300"
                  >
                    Ver Detalles
                  </a>
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
