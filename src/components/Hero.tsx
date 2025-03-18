import React, { FC, useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { servicesData } from '@/data/services';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

/* ================= Tipos e Interfaces ================= */
interface SlideData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  serviceId: string;
}

interface SlideProps {
  slide: SlideData;
  isActive: boolean;
  isMobile: boolean;
}

interface SliderControlsProps {
  slides: SlideData[];
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  prevSlide: () => void;
  nextSlide: () => void;
}

/* ================= Custom Hooks ================= */

// Hook para precargar imágenes
function useImagePreloader(images: string[]): boolean {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;
    Promise.all(
      images.map(src =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        })
      )
    ).then(() => {
      if (!isCancelled) setLoaded(true);
    });
    return () => { isCancelled = true; };
  }, [images]);

  return loaded;
}

// Hook para manejar intervalos de forma declarativa
function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => { savedCallback.current = callback; }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

/* ================= Componentes de Presentación ================= */

// Componente que renderiza cada slide
const Slide: FC<SlideProps> = React.memo(({ slide, isActive, isMobile }) => (
  <div
    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
      isActive ? 'opacity-100 z-20 transform scale-100' : 'opacity-0 z-10 transform scale-105'
    }`}
    style={{ transitionProperty: 'opacity, transform', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
    <img
      src={slide.image}
      alt={slide.title}
      className="h-full w-full object-cover object-center transform transition-transform duration-10000 ease-out scale-100 hover:scale-105"
    />
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className={`max-w-xl mx-auto ${isMobile ? 'text-center' : 'md:mx-0 md:text-left'}`}>
          <span
            className="inline-block text-cuenca-gold font-medium mb-2 tracking-wider opacity-0 animate-slide-in-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards', animationDuration: '0.8s' }}
          >
            {slide.subtitle}
          </span>
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 opacity-0 animate-slide-in-up"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards', animationDuration: '0.8s' }}
          >
            {slide.title}
          </h1>
          <p
            className="text-base md:text-lg text-white/90 mb-6 md:mb-8 opacity-0 animate-slide-in-up"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards', animationDuration: '0.8s' }}
          >
            {slide.description}
          </p>
          <div
            className={`flex ${isMobile ? 'flex-col space-y-3' : 'md:flex-row md:space-x-4'} md:justify-start opacity-0 animate-slide-in-up`}
            style={{ animationDelay: '0.8s', animationFillMode: 'forwards', animationDuration: '0.8s' }}
          >
            <a
              href="#servicios"
              className="bg-cuenca-blue hover:bg-opacity-90 text-white px-6 py-3 rounded-md transition-all duration-300 text-center transform hover:-translate-y-2 hover:shadow-lg"
            >
              Nuestros Servicios
            </a>
            <Link
              to={`/servicios/${slide.serviceId}`}
              className="bg-transparent hover:bg-white/10 text-white border border-white px-6 py-3 rounded-md transition-all duration-300 text-center transform hover:-translate-y-2 hover:shadow-lg"
            >
              Ver Detalles
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
));

// Componente para los controles del slider
const SliderControls: FC<SliderControlsProps> = ({ slides, currentSlide, setCurrentSlide, prevSlide, nextSlide }) => (
  <div className="absolute bottom-8 z-30 w-full">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <div className="flex space-x-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 max-w-[70%] md:max-w-none">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'w-8 bg-cuenca-gold animate-pulse-subtle' : 'w-2 bg-white/60'
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
);

/* ================= Componente Principal ================= */

const Hero: FC = () => {
  const isMobile = useIsMobile();

  // Transformamos y memorizamos los datos de los servicios
  const slides: SlideData[] = useMemo(
    () =>
      servicesData.map((service: any) => ({
        id: service.id,
        title: service.title,
        subtitle: service.id === 'auditoria-financiera'
          ? 'Expertos en Auditoría'
          : 'Servicios Especializados',
        description: service.description,
        image: service.image,
        serviceId: service.id,
      })),
    []
  );

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  // Extraemos las URLs de las imágenes para el precargado
  const imageUrls: string[] = useMemo(() => slides.map(slide => slide.image), [slides]);
  const imagesLoaded = useImagePreloader(imageUrls);

  // Handlers para la navegación de slides
  const prevSlide = useCallback((): void => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const nextSlide = useCallback((): void => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  // Intervalo automático para cambiar de slide cada 6 segundos
  useInterval(nextSlide, 6000);

  // Handlers para eventos táctiles (swipe)
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback((): void => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    } else if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  }, [touchStart, touchEnd, nextSlide, prevSlide]);

  if (!imagesLoaded) {
    return (
      <div id="home" className="relative h-screen md:h-screen w-full flex items-center justify-center bg-gray-100">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-48 bg-gray-300 rounded mb-4" />
          <div className="h-6 w-36 bg-gray-300 rounded mb-8" />
          <div className="h-4 w-64 bg-gray-300 rounded" />
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
        <Slide key={slide.id} slide={slide} isActive={index === currentSlide} isMobile={isMobile} />
      ))}
      <SliderControls
        slides={slides}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
      />
    </div>
  );
};

export default Hero;
