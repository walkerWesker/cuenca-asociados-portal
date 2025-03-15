
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '@/data/services';
import { Button } from '@/components/ui/button';

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
    
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { ...observerOptions, threshold: 0.2 });
    
    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }
    
    cardRefs.current.forEach((card) => {
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
    <section id="servicios" className="py-20 bg-cuenca-light" ref={sectionRef}>
      <div className="container mx-auto">
        <div className="text-center mb-16 opacity-0 animate-on-scroll" ref={(el) => cardRefs.current[0] = el}>
          <span className="text-sm uppercase tracking-wider text-cuenca-blue font-medium">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Servicios Profesionales
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Ofrecemos una amplia gama de servicios para ayudar a su empresa a crecer y optimizar sus operaciones financieras, contables y tributarias.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div key={service.id} className="opacity-0 animate-on-scroll" ref={(el) => cardRefs.current[index + 1] = el}>
              <Link 
                to={`/servicios/${service.id}`}
                className="service-card flex flex-col h-full hover:no-underline block"
              >
                <div className="relative h-44 mb-4 rounded-t-xl overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-3 left-4 flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cuenca-blue text-white mr-3">
                      <service.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{service.title}</h3>
                  </div>
                </div>
                
                <div className="p-5 flex-grow">
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    {service.details.slice(0, 2).map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-cuenca-blue mr-2">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-cuenca-blue font-medium hover:underline">
                    Ver más detalles
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center opacity-0 animate-on-scroll" ref={(el) => cardRefs.current[servicesData.length + 1] = el}>
          <a 
            href="#contacto" 
            className="inline-flex items-center bg-cuenca-blue hover:bg-opacity-90 text-white px-6 py-3 rounded-md transition-all duration-300"
          >
            Consulta Nuestros Servicios
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
