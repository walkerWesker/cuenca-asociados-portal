
import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
    
    const contentObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { ...observerOptions, threshold: 0.2 });
    
    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }
    
    contentRefs.current.forEach((content) => {
      if (content) {
        contentObserver.observe(content);
      }
    });
    
    return () => {
      sectionObserver.disconnect();
      contentObserver.disconnect();
    };
  }, []);
  
  return (
    <section id="nosotros" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="opacity-0 animate-on-scroll" ref={(el) => contentRefs.current[0] = el}>
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-cuenca-blue/10 translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                alt="Equipo de Cuenca & Asociados" 
                className="relative z-10 rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </div>
          </div>
          
          <div className="opacity-0 animate-on-scroll" ref={(el) => contentRefs.current[1] = el}>
            <span className="text-sm uppercase tracking-wider text-cuenca-blue font-medium">
              Sobre Nosotros
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
              Cuenca & Asociados
            </h2>
            <p className="text-gray-600 mb-6">
              Somos una sociedad de auditoría financiera, contable y tributaria con amplia experiencia en servicios profesionales para empresas de todos los sectores. Nuestro compromiso es ofrecer soluciones personalizadas que se adapten a las necesidades específicas de cada cliente.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-cuenca-blue/10 rounded-full text-cuenca-blue mr-3">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Experiencia y Profesionalismo</h3>
                  <p className="text-gray-600 text-sm">Nuestro equipo cuenta con profesionales altamente calificados y con amplia experiencia en sus respectivas áreas.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-cuenca-blue/10 rounded-full text-cuenca-blue mr-3">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Atención Personalizada</h3>
                  <p className="text-gray-600 text-sm">Entendemos las necesidades específicas de cada cliente para ofrecer soluciones adaptadas a su realidad empresarial.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-cuenca-blue/10 rounded-full text-cuenca-blue mr-3">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Actualización Constante</h3>
                  <p className="text-gray-600 text-sm">Nos mantenemos al día con las últimas normativas y tendencias del sector para ofrecer el mejor servicio.</p>
                </div>
              </div>
            </div>
            
            <a 
              href="#contacto" 
              className="inline-flex items-center bg-cuenca-blue hover:bg-opacity-90 text-white px-6 py-3 rounded-md transition-all duration-300"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
