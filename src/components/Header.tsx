
import { useState, useEffect, useCallback, FC } from 'react';
import { ChevronDown, Building2, Calculator, FileText, Users, TrendingUp, DollarSign, Shield, Search, Briefcase, FileCheck, ClipboardList } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import MobileMenu from './MobileMenu';
import { useMobileMenu } from '@/hooks/use-mobile-menu';

interface ServiceItem {
  id: string;
  name: string;
  icon: any;
}

const servicesMenuItems: ServiceItem[] = [
  { id: 'reestructuracion', name: 'Reestructuración Financiera', icon: TrendingUp },
  { id: 'outsourcing', name: 'Outsourcing Administrativo', icon: Building2 },
  { id: 'contable', name: 'Outsourcing Contable', icon: FileCheck },
  { id: 'tributario', name: 'Outsourcing Tributario', icon: Calculator },
  { id: 'planillas', name: 'Outsourcing de Planillas', icon: Users },
  { id: 'niif', name: 'Implementación NIIF', icon: FileText },
  { id: 'precios', name: 'Precios de Transferencia', icon: DollarSign },
  { id: 'auditoria', name: 'Auditoría de Sistemas', icon: Shield },
  { id: 'auditoria-financiera', name: 'Auditoría Financiera', icon: Search },
  { id: 'consultoria', name: 'Asesoría Empresarial', icon: Briefcase },
  { id: 'inventario-activos', name: 'Toma de Inventario de Activos', icon: ClipboardList },
];

const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const { scrollToSection, isMobile, isTablet } = useMobileMenu();

  // Determinar si la ruta actual es una página de servicios
  const isServicePage = location.pathname.includes('/servicios/');
  // Determinar si estamos en la página de inicio
  const isHomePage = location.pathname === '/';

  // Controla el estado del scroll para aplicar efectos en el header
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Toggle para el dropdown de servicios
  const toggleServices = useCallback(() => {
    setServicesOpen(prev => !prev);
  }, []);

  // Función para scroll suave al inicio con animación profesional
  const scrollToTop = useCallback(() => {
    if (isHomePage) {
      // Si estamos en la página de inicio, hacer scroll suave al top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Agregar una animación visual temporal al logo
      const logoElement = document.querySelector('.logo-animation');
      if (logoElement) {
        logoElement.classList.add('animate-pulse-subtle');
        setTimeout(() => {
          logoElement.classList.remove('animate-pulse-subtle');
        }, 1000);
      }
    }
  }, [isHomePage]);

  // Handler para el logo y botón inicio
  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault();
      scrollToTop();
    }
  }, [isHomePage, scrollToTop]);

  const handleInicioClick = useCallback((e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault();
      scrollToTop();
    }
  }, [isHomePage, scrollToTop]);

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'glass-effect' : 'bg-transparent',
        isMobile ? 'py-3 sm:py-3.5' : isTablet ? 'py-3 md:py-3.5' : isScrolled ? 'py-3' : 'py-4 lg:py-5'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Logo con animaciones mejoradas de Tailwind 4.1 - Siempre visible */}
        <Link 
          to="/" 
          className="flex items-center flex-shrink-0 min-w-0 group relative overflow-hidden"
          onClick={handleLogoClick}
        >
          <span
            className={clsx(
              'logo-animation font-serif font-bold tracking-wider leading-tight whitespace-nowrap relative',
              // Transiciones principales más fluidas - manteniendo opacidad completa
              'transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
              // Efectos de hover suaves que mantienen visibilidad - mejorados para la interacción
              'group-hover:scale-[1.05] group-hover:text-cuenca-gold group-hover:drop-shadow-md group-hover:tracking-[0.1em]',
              // Efecto de clic suave
              'active:scale-[0.98] active:transition-transform active:duration-150',
              // Animaciones de entrada suaves
              'animate-[slide-up_0.6s_ease-out_0.1s_both]',
              // Colores con transición suave
              isScrolled ? 'text-cuenca-blue' : 'text-gray-200',
              // Tamaños responsivos optimizados
              'text-xl', // Base para móviles
              'sm:text-2xl', // Móviles pequeños
              'md:text-2xl', // Móviles normales y tablets pequeñas
              'lg:text-3xl', // Tablets y laptops
              'xl:text-3xl', // Escritorio
              '2xl:text-4xl', // Pantallas grandes
              // Reducción suave cuando está scrolled
              isScrolled && 'text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl',
              // Asegurar que siempre sea visible
              'opacity-100 will-change-transform',
              // Cursor pointer cuando es clickeable
              isHomePage && 'cursor-pointer'
            )}
          >
            {/* Efecto de brillo sutil que se mueve - mejorado para interacción */}
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-cuenca-gold/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] group-active:translate-x-[100%] transition-transform duration-1200 ease-out" />
            
            {/* Texto principal con efecto suave */}
            <span className="relative inline-block">
              Cuenca{' '}
              <span className="text-cuenca-gold transition-all duration-300 ease-out group-hover:animate-[float_2s_ease-in-out_infinite] inline-block group-hover:scale-110">
                &
              </span>{' '}
              Asociados
            </span>
            
            {/* Línea decorativa que aparece en hover - más sutil */}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cuenca-gold/60 to-cuenca-blue/60 group-hover:w-full transition-all duration-700 ease-out" />
          </span>
          
          {/* Efecto de partículas muy sutil en hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none">
            <div className="absolute top-1/2 left-1/4 w-0.5 h-0.5 bg-cuenca-gold/40 rounded-full animate-[float_3s_ease-in-out_infinite] animation-delay-100" />
            <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-cuenca-blue/40 rounded-full animate-[float_2.5s_ease-in-out_infinite] animation-delay-300" />
            <div className="absolute bottom-1/3 left-1/3 w-0.5 h-0.5 bg-cuenca-gold/30 rounded-full animate-[float_2.8s_ease-in-out_infinite] animation-delay-500" />
          </div>
          
          {/* Resplandor sutil en hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-20 blur-sm scale-110 bg-gradient-radial from-cuenca-gold/20 via-transparent to-transparent rounded-full" />
        </Link>

        {/* Navegación para escritorio */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {isHomePage ? (
            <button
              onClick={handleInicioClick}
              className={clsx(
                'hover-link font-medium transition-all duration-300 text-sm xl:text-base',
                'hover:scale-105 active:scale-95 cursor-pointer',
                'relative overflow-hidden group',
                isScrolled ? 'text-cuenca-dark' : 'text-gray-200'
              )}
            >
              <span className="relative z-10">Inicio</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-cuenca-gold/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-out" />
            </button>
          ) : (
            <Link
              to="/"
              className={clsx(
                'hover-link font-medium transition-colors duration-300 text-sm xl:text-base',
                isScrolled ? 'text-cuenca-dark' : 'text-gray-200'
              )}
            >
              Inicio
            </Link>
          )}
          
          {/* Dropdown de servicios */}
          <div className="relative group">
            <button
              onClick={toggleServices}
              className={clsx(
                'flex items-center font-medium hover-link transition-colors duration-300 text-sm xl:text-base',
                isScrolled ? 'text-cuenca-dark' : 'text-gray-200'
              )}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Servicios <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            
            {/* Dropdown mejorado con efecto cristal */}
            <div
              className={clsx(
                'absolute left-0 mt-3 w-80 rounded-2xl opacity-0 invisible transform origin-top scale-95 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:visible group-hover:scale-100',
                // Efecto cristal mejorado
                'backdrop-blur-2xl backdrop-saturate-200',
                'bg-white/10 border border-white/20',
                'shadow-2xl shadow-black/20',
                // Gradientes y brillos
                'before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/30 before:via-white/10 before:to-transparent before:pointer-events-none',
                'after:absolute after:inset-0 after:rounded-2xl after:ring-1 after:ring-white/30 after:pointer-events-none',
                servicesOpen && 'opacity-100 visible scale-100'
              )}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
              }}
              role="menu"
              aria-orientation="vertical"
            >
              <div className="relative z-10 p-2">
                {servicesMenuItems.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <Link
                      key={service.id}
                      to={`/servicios/${service.id}`}
                      className="
                        group/item flex items-center gap-3 px-4 py-3 text-sm
                        text-gray-800 hover:text-cuenca-blue
                        rounded-xl transition-all duration-300 font-medium
                        hover:bg-white/30 hover:backdrop-blur-xl
                        hover:shadow-lg hover:scale-[1.02]
                        transform-gpu
                        border border-transparent hover:border-white/40
                      "
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: servicesOpen ? 'fade-in 0.3s ease-out forwards' : 'none'
                      }}
                      role="menuitem"
                    >
                      <div className="
                        p-2 rounded-lg bg-white/20 backdrop-blur-sm
                        group-hover/item:bg-cuenca-blue group-hover/item:text-white
                        transition-all duration-300
                        shadow-sm group-hover/item:shadow-md
                      ">
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <span className="flex-1 group-hover/item:translate-x-1 transition-transform duration-300">
                        {service.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
              
              {/* Brillo sutil en el borde */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>

          <button
            onClick={() => scrollToSection('nosotros')}
            className={clsx(
              'hover-link font-medium transition-colors duration-300 text-sm xl:text-base',
              isScrolled ? 'text-cuenca-dark' : 'text-gray-200'
            )}
          >
            Nosotros
          </button>
          <button
            onClick={() => scrollToSection('contacto')}
            className={clsx(
              'hover-link font-medium transition-colors duration-300 text-sm xl:text-base',
              isScrolled ? 'text-cuenca-dark' : 'text-gray-200'
            )}
          >
            Contacto
          </button>
        </nav>

        {/* Botón CTA para escritorio */}
        <div className="hidden lg:block flex-shrink-0">
          <button
            onClick={() => scrollToSection('contacto')}
            className="bg-cuenca-blue hover:bg-opacity-90 text-white px-4 xl:px-5 py-2 rounded-md transition-all duration-300 text-sm xl:text-base font-medium"
          >
            Contáctanos
          </button>
        </div>

        {/* Componente de menú móvil */}
        <MobileMenu isScrolled={isScrolled} />
      </div>
    </header>
  );
};

export default Header;
