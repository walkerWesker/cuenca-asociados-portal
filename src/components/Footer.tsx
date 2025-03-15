
import { ArrowUp, Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { servicesData } from '@/data/services';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-cuenca-dark to-black text-white py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="text-2xl font-serif font-bold mb-6 border-b border-cuenca-gold/30 pb-3 inline-block">
              Cuenca <span className="text-cuenca-gold">&</span> Asociados
            </div>
            <p className="text-gray-300 mb-6 pr-6 text-sm leading-relaxed">
              Sociedad de auditoría financiera, contable y tributaria con amplia experiencia en servicios profesionales para empresas nacionales e internacionales.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a 
                href="mailto:gerencia@consultoracuenca.com" 
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="h-[18px] w-[18px]" />
              </a>
              <a 
                href="https://wa.me/51992854449" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <Phone className="h-[18px] w-[18px]" />
              </a>
              <a 
                href="https://www.consultoracuenca.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-300"
                aria-label="Website"
              >
                <Globe className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-cuenca-gold/30 pb-3 inline-block">Servicios Principales</h3>
            <ul className="space-y-3">
              {servicesData.slice(0, 5).map(service => (
                <li key={service.id}>
                  <Link 
                    to={`/servicios/${service.id}`} 
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center text-sm"
                  >
                    <span className="text-cuenca-gold mr-2">•</span>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-cuenca-gold/30 pb-3 inline-block">Servicios Adicionales</h3>
            <ul className="space-y-3">
              {servicesData.slice(5).map(service => (
                <li key={service.id}>
                  <Link 
                    to={`/servicios/${service.id}`} 
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center text-sm"
                  >
                    <span className="text-cuenca-gold mr-2">•</span>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-cuenca-gold/30 pb-3 inline-block">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-cuenca-gold mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium mb-1">Correo Electrónico</p>
                  <a href="mailto:gerencia@consultoracuenca.com" className="text-gray-300 hover:text-white transition-colors text-sm block">
                    gerencia@consultoracuenca.com
                  </a>
                  <a href="mailto:rcuenca@consultoracuenca.com" className="text-gray-300 hover:text-white transition-colors text-sm block mt-1">
                    rcuenca@consultoracuenca.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-cuenca-gold mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium mb-1">Teléfono</p>
                  <a href="https://wa.me/51992854449" className="text-gray-300 hover:text-white transition-colors text-sm block" target="_blank" rel="noopener noreferrer">
                    +51 992 854 449
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-cuenca-gold mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium mb-1">Ubicación</p>
                  <address className="text-gray-300 text-sm not-italic">
                    Lima, Perú
                  </address>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            <p className="mb-2 md:mb-0">© {year} Cuenca & Asociados. Todos los derechos reservados.</p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <a href="/politica-privacidad" className="text-gray-400 hover:text-white text-sm mx-3 transition-colors">
              Política de Privacidad
            </a>
            <span className="text-gray-600">|</span>
            <a href="/terminos-servicio" className="text-gray-400 hover:text-white text-sm mx-3 transition-colors">
              Términos de Servicio
            </a>
            <button 
              onClick={scrollToTop}
              className="ml-4 p-2 rounded-full bg-cuenca-blue/30 text-white hover:bg-cuenca-blue/50 transition-colors"
              aria-label="Volver arriba"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
