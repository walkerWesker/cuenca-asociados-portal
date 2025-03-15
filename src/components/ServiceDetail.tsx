
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { servicesData } from '@/data/services';
import { Button } from '@/components/ui/button';
import About from '@/components/About';
import Contact from '@/components/Contact';

// Clean Architecture pattern - Creating a domain entity interface
interface ServiceEntity {
  id: string;
  title: string;
  description: string;
  image: string;
  details: string[];
  icon: React.ElementType;
}

// Service component following the presentation layer in Clean Architecture
const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // This represents the use case / interactor in Clean Architecture
  const getServiceById = (id: string): ServiceEntity | undefined => {
    return servicesData.find(s => s.id === id);
  };
  
  const service = getServiceById(serviceId || '');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Enhanced animation handler with better performance
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolling(scrollPosition > 50);
      
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        const animateElements = document.querySelectorAll('.animate-on-scroll:not(.visible)');
        animateElements.forEach(el => {
          const rect = el.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight - 100;
          if (isVisible) {
            el.classList.add('visible');
          }
        });
      });
    };
    
    // Improved initial animations with staggered effect
    const animateInitialElements = () => {
      const elements = document.querySelectorAll('.animate-on-load');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('visible');
        }, 100 * index);
      });
      
      handleScroll();
    };
    
    animateInitialElements();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [serviceId]);
  
  if (!service) {
    return (
      <div className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Servicio no encontrado</h1>
          <p className="mb-8">Lo sentimos, el servicio que buscas no existe o ha sido movido.</p>
          <Link to="/">
            <Button>Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <>
      {/* Hero Section with enhanced animations */}
      <div 
        className="relative h-[40vh] sm:h-[50vh] flex items-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(${service.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 py-10 text-white">
          <Link 
            to="/" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-all duration-300 animate-on-load opacity-0 hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight animate-on-load opacity-0 animate-slide-in-left">
            {service.title}
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl text-white/90 animate-on-load opacity-0 animate-slide-in-right">
            {service.description}
          </p>
        </div>
      </div>
      
      {/* Content Section with improved animations */}
      <div className="container mx-auto px-4 py-16" ref={contentRef}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 animate-on-scroll opacity-0 transition-all duration-700">
            <h2 className="text-3xl font-bold mb-6 text-cuenca-blue animate-on-scroll opacity-0 transition-all duration-500">
              Qué ofrecemos
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6 leading-relaxed animate-on-scroll opacity-0 transition-all duration-700">
                En Cuenca & Asociados, nos especializamos en proporcionar soluciones integrales 
                y personalizadas para satisfacer las necesidades específicas de su empresa. 
                Nuestro equipo de profesionales altamente calificados está comprometido con 
                la excelencia y la entrega de resultados excepcionales.
              </p>
              
              <h3 className="text-xl font-bold mb-4 mt-8 text-cuenca-dark animate-on-scroll opacity-0 transition-all duration-500">
                Características del servicio
              </h3>
              
              <ul className="space-y-4 mb-8">
                {service.details.map((detail, index) => (
                  <li key={index} className="flex items-start animate-on-scroll opacity-0 transition-all" 
                      style={{transitionDelay: `${index * 100}ms`}}>
                    <div className="flex-shrink-0 p-1 bg-cuenca-blue/10 rounded-full text-cuenca-blue mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700">{detail}</p>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-xl font-bold mb-4 text-cuenca-dark animate-on-scroll opacity-0 transition-all duration-500">
                ¿Por qué elegirnos?
              </h3>
              
              <p className="text-gray-700 mb-6 leading-relaxed animate-on-scroll opacity-0 transition-all duration-700">
                Nuestra combinación única de experiencia, conocimiento y compromiso con la 
                calidad nos distingue en el mercado. Trabajamos estrechamente con cada cliente 
                para comprender sus objetivos y desarrollar estrategias efectivas que generen 
                resultados tangibles y sostenibles.
              </p>
            </div>
            
            <div className="mt-12 animate-on-scroll opacity-0 transition-all duration-500">
              <a href="#contacto">
                <Button size="lg" className="bg-cuenca-blue hover:bg-cuenca-blue/90 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Solicitar información
                </Button>
              </a>
            </div>
          </div>
          
          {/* Sidebar with enhanced animations */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-sm animate-on-scroll opacity-0 transition-all duration-700 hover:shadow-md transform hover:scale-[1.01] transition-transform">
              <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-r from-cuenca-blue to-cuenca-blue/80 text-white mb-6 mx-auto animate-pulse-subtle">
                <service.icon className="h-8 w-8" />
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-center text-cuenca-dark">Información adicional</h3>
              
              <div className="space-y-4 mb-6 stagger-animation">
                <div className="p-4 bg-white rounded border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-on-scroll opacity-0" style={{transitionDelay: '100ms'}}>
                  <h4 className="font-medium text-cuenca-blue mb-2">Experiencia</h4>
                  <p className="text-sm text-gray-600">Más de 15 años ofreciendo soluciones contables y financieras de alta calidad</p>
                </div>
                
                <div className="p-4 bg-white rounded border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-on-scroll opacity-0" style={{transitionDelay: '200ms'}}>
                  <h4 className="font-medium text-cuenca-blue mb-2">Profesionales calificados</h4>
                  <p className="text-sm text-gray-600">Equipo multidisciplinario con experiencia en diferentes sectores económicos</p>
                </div>
                
                <div className="p-4 bg-white rounded border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-on-scroll opacity-0" style={{transitionDelay: '300ms'}}>
                  <h4 className="font-medium text-cuenca-blue mb-2">Soluciones personalizadas</h4>
                  <p className="text-sm text-gray-600">Adaptamos nuestros servicios a las necesidades específicas de cada cliente</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h4 className="font-medium text-cuenca-dark mb-3">¿Necesitas más información?</h4>
                <p className="text-sm text-gray-600 mb-4">Contáctanos directamente para una consulta personalizada sobre este servicio.</p>
                
                <div className="flex flex-col space-y-2">
                  <a 
                    href="https://wa.me/51992854449" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors duration-300 transform hover:scale-105 transition-transform"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    WhatsApp
                  </a>
                  
                  <a 
                    href="mailto:gerencia@consultoracuenca.com" 
                    className="inline-flex items-center justify-center bg-gradient-to-r from-cuenca-blue to-cuenca-blue/90 text-white py-2 px-4 rounded transition-all duration-300 transform hover:scale-105 transition-transform"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Correo electrónico
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* About section */}
      <section id="nosotros">
        <About />
      </section>
      
      {/* Contact section */}
      <section id="contacto">
        <Contact />
      </section>
    </>
  );
};

export default ServiceDetail;
