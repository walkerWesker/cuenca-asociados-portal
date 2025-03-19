
import { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { Slider } from "@/components/ui/slider";
import { ChevronRight } from 'lucide-react';
import { useServices } from '../hooks/useServices';
import { Service } from '@/domain/entities/Service';

// Memoized ServiceCard component to avoid unnecessary re-renders
const ServiceCard = memo(({ service, onCardClick }: { service: Service, onCardClick: (id: string) => void }) => {
  return (
    <div 
      className="service-card h-[400px] flex flex-col cursor-pointer"
      onClick={() => onCardClick(service.id)}
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
        <img 
          src={service.image} 
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute bottom-4 left-4 z-20">
          <span className="bg-cuenca-gold text-white text-xs font-medium px-2.5 py-1 rounded">
            Servicio
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start mb-3">
          <div className="p-2 bg-cuenca-blue/10 rounded-lg">
            {service.icon && <service.icon className="h-6 w-6 text-cuenca-blue" />}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2 text-cuenca-blue line-clamp-2">{service.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{service.description}</p>
        <div className="mt-auto">
          <Button 
            variant="outline" 
            className="text-cuenca-blue border-cuenca-blue hover:bg-cuenca-blue hover:text-white transition-all group"
            onClick={(e) => {
              e.stopPropagation();
              onCardClick(service.id);
            }}
          >
            Ver Detalles
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

/**
 * ServicesSlider component with modern React practices
 */
const ServicesSlider = () => {
  const navigate = useNavigate();
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const { getAllServices } = useServices();
  const services = getAllServices;

  // Set up carousel event listeners
  useEffect(() => {
    if (!api) return;
    
    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on('select', handleSelect);
    
    return () => {
      api.off('select', handleSelect);
    };
  }, [api]);

  // Memoized navigation handler to avoid recreation on each render
  const handleServiceClick = useCallback((serviceId: string) => {
    navigate(`/servicios/${serviceId}`);
  }, [navigate]);

  // Memoized scroll handler to avoid recreation on each render
  const handleViewAllServices = useCallback(() => {
    document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="w-full py-12 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-8 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-cuenca-blue mb-4">
            Nuestros Servicios Destacados
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore nuestra gama completa de servicios especializados en auditoría, 
            consultoría y asesoría financiera para empresas y organizaciones.
          </p>
        </div>

        <Carousel 
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {services.map((service) => (
              <CarouselItem 
                key={service.id} 
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <ServiceCard 
                  service={service} 
                  onCardClick={handleServiceClick} 
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center items-center gap-2 mt-8">
            <CarouselPrevious className="static transform-none mx-2" />
            <div className="w-full max-w-xs">
              <Slider
                value={[current]}
                max={services.length - 1}
                step={1}
                className="w-full"
                onValueChange={(v) => {
                  if (api) {
                    api.scrollTo(v[0]);
                  }
                }}
              />
            </div>
            <CarouselNext className="static transform-none mx-2" />
          </div>
        </Carousel>

        <div className="flex justify-center mt-10">
          <Button 
            className="bg-cuenca-blue hover:bg-cuenca-blue/90 text-white"
            onClick={handleViewAllServices}
          >
            Ver Todos Los Servicios
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesSlider;
