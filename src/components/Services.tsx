
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '@/data/services';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);
    
    // Staggered animation for cards
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100); // Stagger the animation by 100ms per card
        }
      });
    }, { ...observerOptions, threshold: 0.2 });
    
    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }
    
    cardRefs.current.forEach((card, index) => {
      if (card) {
        cardObserver.observe(card);
      }
    });
    
    return () => {
      sectionObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);
  
  return (
    <section id="servicios" className="py-24 bg-cuenca-light" ref={sectionRef}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-20 opacity-0 animate-on-scroll" ref={(el) => cardRefs.current[0] = el}>
          <Badge variant="outline" className="text-sm uppercase tracking-wider text-cuenca-blue font-medium mb-3 px-4 py-1.5 border-cuenca-blue/30">
            Nuestros Servicios
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-6 relative inline-block">
            <span className="relative">
              Servicios Profesionales
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-cuenca-gold rounded animate-pulse-subtle"></span>
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 mt-8 text-lg">
            Ofrecemos una amplia gama de servicios para ayudar a su empresa a crecer y optimizar sus operaciones financieras, contables y tributarias.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesData.map((service, index) => (
            <div 
              key={service.id} 
              className="opacity-0 animate-on-scroll" 
              ref={(el) => cardRefs.current[index + 1] = el}
            >
              <Link 
                to={`/servicios/${service.id}`}
                className="block h-full hover:no-underline"
              >
                <Card 
                  className="h-full flex flex-col overflow-hidden bg-white hover:shadow-lg transition-all duration-500 ease-in-out border-none"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className={`w-full h-full object-cover transition-all duration-500 ${activeIndex === index ? 'scale-110' : 'scale-100'}`}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${activeIndex === index ? 'opacity-80' : 'opacity-70'}`}></div>
                    <div className="absolute bottom-4 left-4 flex items-center">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-cuenca-blue text-white mr-3 transition-all duration-300 ${activeIndex === index ? 'scale-110 bg-cuenca-gold' : 'scale-100'}`}>
                        <service.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-white animate-fade-in">{service.title}</h3>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 flex-grow">
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="space-y-3 mt-2">
                      {service.details.slice(0, 2).map((detail, i) => (
                        <div key={i} className="flex items-start">
                          <span className={`text-cuenca-blue mr-3 text-lg transition-all duration-300 ${activeIndex === index ? 'translate-x-1 text-cuenca-gold' : 'translate-x-0'}`}>•</span>
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-2 pb-4 px-6 mt-auto">
                    <div className={`font-medium transition-all duration-300 flex items-center ${activeIndex === index ? 'text-cuenca-gold translate-x-1' : 'text-cuenca-blue'}`}>
                      Ver más detalles
                      <span className={`ml-1 inline-block transition-transform duration-300 ${activeIndex === index ? 'translate-x-1' : 'translate-x-0'}`}>→</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
