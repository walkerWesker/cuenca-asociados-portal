
import { useEffect, useRef } from 'react';
import { Check, MessageSquare } from 'lucide-react';

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
              <div className="absolute inset-0 rounded-2xl bg-cuenca-blue/10 translate-x-4 translate-y-4 transition-all duration-700 animate-pulse-subtle"></div>
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                alt="Equipo de Cuenca & Asociados" 
                className="relative z-10 rounded-2xl shadow-xl w-full h-auto object-cover animate-float transition-transform duration-700 hover:scale-[1.02] hover:shadow-2xl"
              />
            </div>
          </div>
          
          <div className="opacity-0 animate-on-scroll" ref={(el) => contentRefs.current[1] = el}>
            <span className="text-sm uppercase tracking-wider text-cuenca-blue font-medium inline-block relative overflow-hidden before:w-full before:h-[1px] before:bg-cuenca-blue/30 before:absolute before:bottom-0 before:left-0 before:origin-right before:scale-x-0 before:transition-transform before:duration-700 animate-slide-in-right before:animate-scale-in-left">
              Sobre Nosotros
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 animate-slide-in-right relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-16 after:h-1 after:bg-cuenca-gold after:rounded-full">
              Cuenca & Asociados
            </h2>
            <p className="text-gray-600 mb-6 animate-fade-in">
              Somos una sociedad de auditoría financiera, contable y tributaria con amplia experiencia en servicios profesionales para empresas de todos los sectores. Nuestro compromiso es ofrecer soluciones personalizadas que se adapten a las necesidades específicas de cada cliente.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start animate-slide-in-left transform hover:translate-x-1 transition-transform duration-300" style={{ animationDelay: '100ms' }}>
                <div className="flex-shrink-0 p-1 bg-cuenca-blue/10 rounded-full text-cuenca-blue mr-3 transition-all duration-300 hover:bg-cuenca-blue/20 hover:scale-110">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Experiencia y Profesionalismo</h3>
                  <p className="text-gray-600 text-sm">Nuestro equipo cuenta con profesionales altamente calificados y con amplia experiencia en sus respectivas áreas.</p>
                </div>
              </div>
              
              <div className="flex items-start animate-slide-in-left transform hover:translate-x-1 transition-transform duration-300" style={{ animationDelay: '200ms' }}>
                <div className="flex-shrink-0 p-1 bg-cuenca-blue/10 rounded-full text-cuenca-blue mr-3 transition-all duration-300 hover:bg-cuenca-blue/20 hover:scale-110">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Atención Personalizada</h3>
                  <p className="text-gray-600 text-sm">Entendemos las necesidades específicas de cada cliente para ofrecer soluciones adaptadas a su realidad empresarial.</p>
                </div>
              </div>
              
              <div className="flex items-start animate-slide-in-left transform hover:translate-x-1 transition-transform duration-300" style={{ animationDelay: '300ms' }}>
                <div className="flex-shrink-0 p-1 bg-cuenca-blue/10 rounded-full text-cuenca-blue mr-3 transition-all duration-300 hover:bg-cuenca-blue/20 hover:scale-110">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Actualización Constante</h3>
                  <p className="text-gray-600 text-sm">Nos mantenemos al día con las últimas normativas y tendencias del sector para ofrecer el mejor servicio.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <a 
                href="#contacto" 
                className="inline-flex items-center bg-cuenca-blue hover:bg-opacity-90 text-white px-6 py-3 rounded-md transition-all duration-300 transform hover:translate-y-[-3px] hover:shadow-lg"
              >
                Contáctanos
              </a>
              
              <a 
                href="https://wa.me/51999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-all duration-300 transform hover:translate-y-[-3px] hover:shadow-lg"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
