
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  return (
    <footer className="bg-cuenca-dark text-white py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-serif font-bold mb-4">
              Cuenca <span className="text-cuenca-gold">&</span> Asociados
            </div>
            <p className="text-gray-300 mb-6 pr-6">
              Sociedad de auditoría financiera, contable y tributaria con amplia experiencia en servicios profesionales.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <a href="#reestructuracion" className="text-gray-300 hover:text-white transition-colors">
                  Reestructuración Financiera
                </a>
              </li>
              <li>
                <a href="#outsourcing" className="text-gray-300 hover:text-white transition-colors">
                  Outsourcing Administrativo
                </a>
              </li>
              <li>
                <a href="#tributario" className="text-gray-300 hover:text-white transition-colors">
                  Outsourcing Tributario
                </a>
              </li>
              <li>
                <a href="#planillas" className="text-gray-300 hover:text-white transition-colors">
                  Outsourcing de Planillas
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Más Servicios</h3>
            <ul className="space-y-2">
              <li>
                <a href="#niif" className="text-gray-300 hover:text-white transition-colors">
                  Implementación NIIF
                </a>
              </li>
              <li>
                <a href="#precios" className="text-gray-300 hover:text-white transition-colors">
                  Precios de Transferencia
                </a>
              </li>
              <li>
                <a href="#auditoria" className="text-gray-300 hover:text-white transition-colors">
                  Auditoría de Sistemas
                </a>
              </li>
              <li>
                <a href="#consultoria" className="text-gray-300 hover:text-white transition-colors">
                  Asesoría Empresarial
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:gerencia@consultoracuenca.com" className="text-gray-300 hover:text-white transition-colors">
                  gerencia@consultoracuenca.com
                </a>
              </li>
              <li>
                <a href="mailto:rcuenca@consultoracuenca.com" className="text-gray-300 hover:text-white transition-colors">
                  rcuenca@consultoracuenca.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/51992854449" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  WhatsApp: +51 992 854 449
                </a>
              </li>
              <li>
                <a href="https://www.consultoracuenca.com" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  www.consultoracuenca.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Cuenca & Asociados. Todos los derechos reservados.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 p-2 rounded-full bg-cuenca-blue/20 text-white hover:bg-cuenca-blue/40 transition-colors"
            aria-label="Volver arriba"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
