
import { useEffect, useRef } from 'react';
import { Check, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-cuenca-blue/20 to-transparent opacity-70"></div>
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                alt="Equipo de Cuenca & Asociados" 
                className="w-full h-auto object-cover shadow-lg transition-all duration-700 transform hover:scale-[1.02]"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-4">
                <div className="px-6">
                  <h3 className="text-white font-semibold text-lg">Equipo profesional</h3>
                  <p className="text-white/90 text-sm">Comprometidos con la excelencia</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="opacity-0 animate-on-scroll" ref={(el) => contentRefs.current[1] = el}>
            <span className="text-sm uppercase tracking-wider text-cuenca-blue font-medium inline-block relative overflow-hidden before:w-full before:h-[1px] before:bg-cuenca-blue/30 before:absolute before:bottom-0 before:left-0 before:origin-left before:scale-x-0 before:animate-scale-in-left">
              Sobre Nosotros
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 animate-slide-in-right relative">
              <span className="relative z-10">Cuenca & Asociados</span>
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-cuenca-gold rounded-full transform transition-all duration-500 animate-pulse-subtle"></span>
            </h2>
            <p className="text-gray-600 mb-6 animate-fade-in">
              Somos una sociedad de auditoría financiera, contable y tributaria con amplia experiencia en servicios profesionales para empresas de todos los sectores. Nuestro compromiso es ofrecer soluciones personalizadas que se adapten a las necesidades específicas de cada cliente.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start transform hover:translate-x-1 transition-transform duration-300 bg-white/80 hover:bg-white p-3 rounded-lg shadow-sm hover:shadow-md" style={{ animationDelay: '100ms' }}>
                <div className="flex-shrink-0 p-1.5 bg-cuenca-blue/10 rounded-full text-cuenca-blue mr-3 transition-all duration-300 hover:bg-cuenca-blue/20 hover:scale-110">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Experiencia y Profesionalismo</h3>
                  <p className="text-gray-600 text-sm">Nuestro equipo cuenta con profesionales altamente calificados y con amplia experiencia en sus respectivas áreas.</p>
                </div>
              </div>
              
              <div className="flex items-start transform hover:translate-x-1 transition-transform duration-300 bg-white/80 hover:bg-white p-3 rounded-lg shadow-sm hover:shadow-md" style={{ animationDelay: '200ms' }}>
                <div className="flex-shrink-0 p-1.5 bg-cuenca-blue/10 rounded-full text-cuenca-blue mr-3 transition-all duration-300 hover:bg-cuenca-blue/20 hover:scale-110">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Atención Personalizada</h3>
                  <p className="text-gray-600 text-sm">Entendemos las necesidades específicas de cada cliente para ofrecer soluciones adaptadas a su realidad empresarial.</p>
                </div>
              </div>
              
              <div className="flex items-start transform hover:translate-x-1 transition-transform duration-300 bg-white/80 hover:bg-white p-3 rounded-lg shadow-sm hover:shadow-md" style={{ animationDelay: '300ms' }}>
                <div className="flex-shrink-0 p-1.5 bg-cuenca-blue/10 rounded-full text-cuenca-blue mr-3 transition-all duration-300 hover:bg-cuenca-blue/20 hover:scale-110">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Actualización Constante</h3>
                  <p className="text-gray-600 text-sm">Nos mantenemos al día con las últimas normativas y tendencias del sector para ofrecer el mejor servicio.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Button 
                asChild
                className="bg-cuenca-blue hover:bg-opacity-90 text-white px-6 py-3 rounded-md transition-all duration-300 transform hover:translate-y-[-3px] hover:shadow-lg"
              >
                <a href="#contacto">
                  Contáctanos
                </a>
              </Button>
              
              <Button 
                variant="secondary"
                asChild
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-all duration-300 transform hover:translate-y-[-3px] hover:shadow-lg flex items-center"
              >
                <a 
                  href="https://wa.me/51992854449?text=Quiero%20informacion%20sobre%20los%20servicios" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
