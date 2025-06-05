import { useState, useEffect, useCallback, FC } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

interface ServiceItem {
  id: string;
  name: string;
}

const servicesMenuItems: ServiceItem[] = [
  { id: 'reestructuracion', name: 'Reestructuración Financiera' },
  { id: 'outsourcing', name: 'Outsourcing Administrativo' },
  { id: 'tributario', name: 'Outsourcing Tributario' },
  { id: 'planillas', name: 'Outsourcing de Planillas' },
  { id: 'niif', name: 'Implementación NIIF' },
  { id: 'precios', name: 'Precios de Transferencia' },
  { id: 'auditoria', name: 'Auditoría de Sistemas' },
  { id: 'auditoria-financiera', name: 'Auditoría Financiera' },
  { id: 'consultoria', name: 'Asesoría Empresarial' },
];

const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  // Determinar si la ruta actual es una página de servicios
  const isServicePage = location.pathname.includes('/servicios/');

  // Controla el estado del scroll para aplicar efectos en el header
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Cierra el menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Función para hacer scroll a una sección con un offset acorde al header fijo
  const scrollToSection = useCallback((sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }, []);

  // Toggle para el menú móvil
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  // Toggle para el dropdown de servicios
  const toggleServices = useCallback(() => {
    setServicesOpen(prev => !prev);
  }, []);

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'glass-effect py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span
            className={clsx(
              'font-serif font-bold tracking-wider transition-all duration-300 ease-in-out',
              isScrolled ? 'text-cuenca-blue text-3xl' : 'text-gray-200 text-4xl'
            )}
          >
            Cuenca <span className="text-cuenca-gold">&</span> Asociados
          </span>
        </Link>

        {/* Navegación para escritorio */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            to="/"
            className={clsx(
              'hover-link font-medium transition-colors duration-300',
              isScrolled ? 'text-cuenca-dark' : 'text-gray-200'
            )}
          >
            Inicio
          </Link>
          <div className="relative group">
            <button
              onClick={toggleServices}
              className={clsx(
                'flex items-center font-medium hover-link transition-colors duration-300',
                isScrolled ? 'text-cuenca-dark' : 'text-gray-200'
              )}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Servicios <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div
              className={clsx(
                'absolute left-0 mt-2 w-72 rounded-2xl shadow-2xl opacity-0 invisible transform origin-top scale-95 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:scale-100',
                'backdrop-blur-xl backdrop-saturate-150 bg-white/90 border border-white/40',
                'ring-1 ring-white/20 shadow-xl',
                'before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none',
                'after:absolute after:inset-0 after:rounded-2xl after:shadow-inner after:shadow-white/25 after:pointer-events-none',
                servicesOpen && 'max-h-96 opacity-100 visible scale-100'
              )}
              role="menu"
              aria-orientation="vertical"
            >
              <div className="relative z-10 py-4 px-3 space-y-1">
                {servicesMenuItems.map(service => (
                  <Link
                    key={service.id}
                    to={`/servicios/${service.id}`}
                    className="
                      block px-4 py-3 text-sm text-gray-700 
                      hover:bg-white/70 hover:text-cuenca-blue 
                      rounded-xl transition-all duration-300 font-medium
                      hover:shadow-sm hover:scale-[1.02]
                      backdrop-blur-sm
                    "
                    role="menuitem"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => scrollToSection('nosotros')}
            className={clsx(
              'hover-link font-medium transition-colors duration-300',
              isScrolled ? 'text-cuenca-dark' : 'text-gray-200'
            )}
          >
            Nosotros
          </button>
          <button
            onClick={() => scrollToSection('contacto')}
            className={clsx(
              'hover-link font-medium transition-colors duration-300',
              isScrolled ? 'text-cuenca-dark' : 'text-gray-200'
            )}
          >
            Contacto
          </button>
        </nav>

        <div className="hidden lg:block">
          <button
            onClick={() => scrollToSection('contacto')}
            className="bg-cuenca-blue hover:bg-opacity-90 text-white px-5 py-2 rounded-md transition-all duration-300"
          >
            Contáctanos
          </button>
        </div>

        {/* Toggle para menú móvil */}
        <button
          className="lg:hidden text-cuenca-dark p-2"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menú móvil */}
      <div
        className={clsx(
          'lg:hidden absolute top-full left-0 w-full glass-effect overflow-hidden transform transition-all duration-300 ease-in-out',
          mobileMenuOpen ? 'max-h-screen opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="container mx-auto py-4 px-4 space-y-3">
          <Link
            to="/"
            className={clsx(
              'block py-2 transition-colors duration-300 hover:text-cuenca-gold',
              isScrolled ? 'text-cuenca-dark' : 'text-gray-200'
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            Inicio
          </Link>
          <div>
            <button
              onClick={toggleServices}
              className={clsx(
                'flex items-center justify-between w-full py-2 transition-colors duration-300',
                isScrolled ? 'text-cuenca-dark' : 'text-gray-200'
              )}
              aria-expanded={servicesOpen}
            >
              <span>Servicios</span>
              <ChevronDown
                className={clsx('h-4 w-4 transition-transform duration-300', servicesOpen && 'rotate-180')}
              />
            </button>
            <div
              className={clsx(
                'overflow-hidden transition-all duration-300 ease-in-out',
                servicesOpen ? 'max-h-96 mt-2' : 'max-h-0'
              )}
            >
              <div className="pl-4 space-y-2 border-l-2 border-cuenca-gold">
                {servicesMenuItems.map(service => (
                  <Link
                    key={service.id}
                    to={`/servicios/${service.id}`}
                    className="block py-1 text-sm transition-colors duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={() => scrollToSection('nosotros')}
            className={clsx(
              'block py-2 w-full text-left transition-colors duration-300 hover:text-cuenca-gold',
              isScrolled ? 'text-cuenca-dark' : 'text-gray-200'
            )}
          >
            Nosotros
          </button>
          <button
            onClick={() => scrollToSection('contacto')}
            className={clsx(
              'block py-2 w-full text-left transition-colors duration-300 hover:text-cuenca-gold',
              isScrolled ? 'text-cuenca-dark' : 'text-gray-200'
            )}
          >
            Contacto
          </button>
          <button
            onClick={() => scrollToSection('contacto')}
            className="block w-full text-center bg-cuenca-blue hover:bg-opacity-90 text-white px-5 py-2 rounded-md mt-4 transition-all duration-300"
          >
            Contáctanos
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
