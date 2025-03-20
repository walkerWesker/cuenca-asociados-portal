import { useState, useEffect, useCallback, FC } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
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
    setServicesOpen(false);
  }, [location]);

  // Cierra el menú móvil al hacer clic fuera del menú
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (mobileMenuOpen && !target.closest('.mobile-menu-container')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // También cierra el menú móvil si la ventana se redimensiona a un tamaño de escritorio
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

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
    if (servicesOpen) {
      setServicesOpen(false);
    }
  }, [servicesOpen]);

  // Toggle para el dropdown de servicios
  const toggleServices = useCallback(() => {
    setServicesOpen(prev => !prev);
  }, []);

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'glass-effect py-2 shadow-lg' 
          : 'bg-transparent py-4 lg:py-6'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center relative z-20 group"
          aria-label="Cuenca & Asociados - Inicio"
        >
          {/* Logo responsivo mejorado */}
          <div className="relative overflow-hidden transition-all duration-300">
            <span
              className={clsx(
                'font-serif font-bold tracking-wider transition-all duration-300 ease-in-out group-hover:text-cuenca-gold relative',
                isScrolled 
                  ? 'text-cuenca-blue text-xl sm:text-2xl md:text-3xl' 
                  : 'text-gray-200 text-2xl sm:text-3xl md:text-4xl'
              )}
            >
              Cuenca <span className="text-cuenca-gold animate-pulse-subtle">&</span> Asociados
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cuenca-gold transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
          </div>
        </Link>

        {/* Navegación para escritorio */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          <Link
            to="/"
            className={clsx(
              'relative overflow-hidden font-medium transition-colors duration-300 group',
              isScrolled ? 'text-cuenca-dark' : 'text-gray-200'
            )}
          >
            <span className="relative z-10">Inicio</span>
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cuenca-gold transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </Link>
          
          <div className="relative group">
            <button
              onClick={toggleServices}
              className={clsx(
                'flex items-center font-medium transition-colors duration-300 relative overflow-hidden',
                isScrolled ? 'text-cuenca-dark' : 'text-gray-200'
              )}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              <span className="relative z-10 flex items-center">
                Servicios 
                <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
              </span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cuenca-gold transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </button>
            
            <div
              className={clsx(
                'absolute left-0 mt-2 w-72 rounded-md shadow-xl bg-white/95 backdrop-blur-sm border border-gray-100 opacity-0 invisible transform origin-top scale-95 transition-all duration-200 ease-in-out z-50',
                'group-hover:opacity-100 group-hover:visible group-hover:scale-100'
              )}
              role="menu"
              aria-orientation="vertical"
            >
              <div className="py-3 px-4 space-y-1">
                {servicesMenuItems.map(service => (
                  <Link
                    key={service.id}
                    to={`/servicios/${service.id}`}
                    className="flex items-center px-2 py-2 text-sm hover:bg-gray-50 rounded-md transition-colors duration-200 text-gray-700 hover:text-cuenca-blue group"
                    role="menuitem"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 transform -translate-x-4 transition-all duration-200 text-cuenca-gold group-hover:opacity-100 group-hover:translate-x-0" />
                    <span className="transform transition-transform duration-200 group-hover:translate-x-1">
                      {service.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <button
            onClick={() => scrollToSection('nosotros')}
            className={clsx(
              'relative overflow-hidden font-medium transition-colors duration-300 group',
              isScrolled ? 'text-cuenca-dark' : 'text-gray-200'
            )}
          >
            <span className="relative z-10">Nosotros</span>
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cuenca-gold transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </button>
          
          <button
            onClick={() => scrollToSection('contacto')}
            className={clsx(
              'relative overflow-hidden font-medium transition-colors duration-300 group',
              isScrolled ? 'text-cuenca-dark' : 'text-gray-200'
            )}
          >
            <span className="relative z-10">Contacto</span>
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cuenca-gold transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </button>
        </nav>

        <div className="hidden lg:block">
          <button
            onClick={() => scrollToSection('contacto')}
            className="bg-cuenca-blue hover:bg-cuenca-blue/90 text-white px-5 py-2.5 rounded-md transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            Contáctanos
          </button>
        </div>

        {/* Toggle para menú móvil */}
        <button
          className={clsx(
            "lg:hidden p-2 rounded-md transition-colors z-20",
            isScrolled 
              ? "text-cuenca-dark hover:bg-gray-100" 
              : "text-white hover:bg-white/10"
          )}
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 animate-fade-in" />
          ) : (
            <Menu className="h-6 w-6 animate-fade-in" />
          )}
        </button>
      </div>

      {/* Menú móvil con mejor animación y diseño */}
      <div
        className={clsx(
          'mobile-menu-container lg:hidden fixed inset-0 z-10 transition-all duration-300 ease-in-out',
          mobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none delay-200'
        )}
      >
        {/* Overlay oscuro */}
        <div 
          className={clsx(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Menú móvil slide-in*/}
        <div
          className={clsx(
            'absolute top-0 right-0 h-screen w-4/5 max-w-sm glass-effect overflow-y-auto flex flex-col transform transition-transform duration-300 ease-in-out pt-20 pb-8 px-6',
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center py-3 border-b border-gray-200/20 group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-lg font-medium transition-colors duration-200 group-hover:text-cuenca-gold">
                Inicio
              </span>
              <ChevronRight className="h-5 w-5 ml-auto opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-200" />
            </Link>
            
            <div className="border-b border-gray-200/20">
              <button
                onClick={toggleServices}
                className="flex items-center justify-between w-full py-3 group"
                aria-expanded={servicesOpen}
              >
                <span className="text-lg font-medium transition-colors duration-200 group-hover:text-cuenca-gold">
                  Servicios
                </span>
                <ChevronDown
                  className={clsx(
                    'h-5 w-5 transition-transform duration-300',
                    servicesOpen ? 'rotate-180 text-cuenca-gold' : ''
                  )}
                />
              </button>
              <div
                className={clsx(
                  'overflow-hidden transition-all duration-300 ease-in-out',
                  servicesOpen ? 'max-h-[500px] opacity-100 pb-3' : 'max-h-0 opacity-0'
                )}
              >
                <div className="pl-4 space-y-2 border-l-2 border-cuenca-gold/40">
                  {servicesMenuItems.map(service => (
                    <Link
                      key={service.id}
                      to={`/servicios/${service.id}`}
                      className="block py-2 text-sm hover:text-cuenca-gold transition-colors duration-200 group flex items-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="transform transition-transform duration-200 group-hover:translate-x-1">
                        {service.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <button
              onClick={() => scrollToSection('nosotros')}
              className="flex items-center w-full py-3 border-b border-gray-200/20 group"
            >
              <span className="text-lg font-medium transition-colors duration-200 group-hover:text-cuenca-gold">
                Nosotros
              </span>
              <ChevronRight className="h-5 w-5 ml-auto opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-200" />
            </button>
            
            <button
              onClick={() => scrollToSection('contacto')}
              className="flex items-center w-full py-3 border-b border-gray-200/20 group"
            >
              <span className="text-lg font-medium transition-colors duration-200 group-hover:text-cuenca-gold">
                Contacto
              </span>
              <ChevronRight className="h-5 w-5 ml-auto opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-200" />
            </button>
            
            <div className="pt-4">
              <button
                onClick={() => scrollToSection('contacto')}
                className="block w-full text-center bg-cuenca-blue hover:bg-opacity-90 text-white px-5 py-3 rounded-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Contáctanos Ahora
              </button>
            </div>
          </div>
          
          <div className="mt-auto pt-8">
            <div className="text-sm text-center text-gray-500">
              <p>© {new Date().getFullYear()} Cuenca & Asociados</p>
              <p className="mt-1">Sociedad de Auditoría</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
