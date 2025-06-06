
import { FC, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Building2, Calculator, FileText, Users, TrendingUp, DollarSign, Shield, Search, Briefcase, FileCheck, ClipboardList } from 'lucide-react';
import clsx from 'clsx';
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
  { id: 'auditoria-financiera', name:'Auditoría Financiera', icon: Search },
  { id: 'consultoria', name: 'Asesoría Empresarial', icon: Briefcase },
  { id: 'inventario-activos', name: 'Toma de Inventario de Activos', icon: ClipboardList },
];

interface MobileMenuProps {
  isScrolled: boolean;
}

const MobileMenu: FC<MobileMenuProps> = ({ isScrolled }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const {
    mobileMenuOpen,
    servicesOpen,
    toggleMobileMenu,
    toggleServices,
    closeMobileMenu,
    scrollToSection,
    isMobile,
    isTablet
  } = useMobileMenu();

  // Función para scroll suave al inicio desde el menú móvil
  const scrollToTop = () => {
    if (isHomePage) {
      closeMobileMenu();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Handler para el botón inicio en móvil
  const handleInicioClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault();
      scrollToTop();
    }
  };

  // Prevenir scroll del body cuando el menú esté abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Debug: agregar console.log para verificar los estados
  console.log('MobileMenu - isMobile:', isMobile, 'isTablet:', isTablet, 'should render:', isMobile || isTablet);

  // Mostrar el menú móvil en dispositivos móviles Y tablets
  // Cambiamos la lógica: mostrar si es móvil O tablet
  if (!isMobile && !isTablet) {
    console.log('MobileMenu - No se renderiza: no es móvil y no es tablet');
    return null;
  }

  return (
    <>
      {/* Toggle para menú móvil - Visible en móviles Y tablets */}
      <button
        className={clsx(
          'relative z-50 p-3 transition-all duration-300 rounded-xl',
          'backdrop-blur-sm border border-white/20',
          'hover:bg-white/10 active:bg-white/20',
          'touch-manipulation select-none',
          'flex items-center justify-center',
          'shadow-lg hover:shadow-xl transform hover:scale-105',
          mobileMenuOpen 
            ? 'bg-white/20 text-white' 
            : isScrolled 
              ? 'text-cuenca-dark bg-white/10' 
              : 'text-white bg-white/5',
          // Forzar visibilidad en móviles y tablets
          'block',
          // Ocultar solo en desktop (lg y mayor)
          'lg:hidden'
        )}
        onClick={toggleMobileMenu}
        aria-expanded={mobileMenuOpen}
        aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {mobileMenuOpen ? (
          <X className="h-7 w-7 transition-all duration-300" />
        ) : (
          <Menu className="h-7 w-7 transition-all duration-300" />
        )}
      </button>

      {/* Menú móvil - Pantalla completa con efectos profesionales */}
      <div
        className={clsx(
          'fixed inset-0 z-40 transition-all duration-700 ease-out',
          // Asegurar que cubra toda la pantalla sin importar el scroll
          'top-0 left-0 right-0 bottom-0',
          'h-screen w-screen',
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 40
        }}
      >
        {/* Overlay con efecto frosted glass profesional */}
        <div 
          className={clsx(
            'absolute inset-0 transition-all duration-700',
            'backdrop-blur-3xl backdrop-saturate-150',
            // Gradiente profesional con múltiples capas
            'bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80',
            // Overlay adicional para profundidad
            'before:absolute before:inset-0',
            'before:bg-gradient-to-t before:from-black/20 before:via-transparent before:to-black/10',
            'after:absolute after:inset-0',
            'after:bg-gradient-to-r after:from-cuenca-blue/10 after:via-transparent after:to-cuenca-gold/10',
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={closeMobileMenu}
        />
        
        {/* Contenido del menú con animaciones suaves */}
        <div
          className={clsx(
            'relative h-full w-full flex flex-col transition-all duration-700 ease-out',
            'pt-20 pb-6',
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          )}
        >
          {/* Contenedor principal del menú con scroll */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="container mx-auto px-6 py-8 space-y-3">
              
              {/* Inicio */}
              {isHomePage ? (
                <button
                  onClick={handleInicioClick}
                  className={clsx(
                    'group block w-full text-left transition-all duration-500 rounded-2xl p-5',
                    'bg-gradient-to-r from-white/10 to-white/5',
                    'backdrop-blur-sm border border-white/20',
                    'hover:from-white/20 hover:to-white/15 hover:border-white/40',
                    'text-white hover:text-white',
                    'text-xl font-semibold tracking-wide',
                    'shadow-lg hover:shadow-2xl',
                    'transform hover:scale-[1.02] hover:-translate-y-1',
                    'relative overflow-hidden'
                  )}
                >
                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative z-10">Inicio</span>
                </button>
              ) : (
                <Link
                  to="/"
                  className={clsx(
                    'group block transition-all duration-500 rounded-2xl p-5',
                    'bg-gradient-to-r from-white/10 to-white/5',
                    'backdrop-blur-sm border border-white/20',
                    'hover:from-white/20 hover:to-white/15 hover:border-white/40',
                    'text-white hover:text-white',
                    'text-xl font-semibold tracking-wide',
                    'shadow-lg hover:shadow-2xl',
                    'transform hover:scale-[1.02] hover:-translate-y-1',
                    'relative overflow-hidden'
                  )}
                  onClick={closeMobileMenu}
                >
                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative z-10">Inicio</span>
                </Link>
              )}

              {/* Servicios con dropdown mejorado */}
              <div className={clsx(
                'group rounded-2xl overflow-hidden transition-all duration-500',
                'bg-gradient-to-r from-white/10 to-white/5',
                'backdrop-blur-sm border border-white/20',
                'shadow-lg hover:shadow-2xl',
                servicesOpen && 'from-white/20 to-white/15 border-white/40'
              )}>
                <button
                  onClick={toggleServices}
                  className={clsx(
                    'flex items-center justify-between w-full p-5 transition-all duration-300',
                    'text-white hover:text-white',
                    'text-xl font-semibold tracking-wide',
                    'relative overflow-hidden'
                  )}
                  aria-expanded={servicesOpen}
                >
                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative z-10">Servicios</span>
                  <ChevronDown
                    className={clsx(
                      'h-6 w-6 transition-all duration-500 relative z-10',
                      servicesOpen && 'rotate-180'
                    )}
                  />
                </button>
                
                {/* Submenu de servicios con animación fluida */}
                <div
                  className={clsx(
                    'overflow-hidden transition-all duration-700 ease-out',
                    servicesOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className="bg-black/20 backdrop-blur-sm border-t border-white/10 p-2">
                    {servicesMenuItems.map((service, index) => {
                      const IconComponent = service.icon;
                      return (
                        <Link
                          key={service.id}
                          to={`/servicios/${service.id}`}
                          className={clsx(
                            'group/item flex items-center gap-4 p-4 m-1 rounded-xl',
                            'transition-all duration-400',
                            'text-white/90 hover:text-white',
                            'hover:bg-gradient-to-r hover:from-white/15 hover:to-white/10',
                            'border border-transparent hover:border-white/20',
                            'text-lg font-medium',
                            'transform hover:translate-x-2 hover:scale-[1.02]',
                            'shadow-sm hover:shadow-lg',
                            'relative overflow-hidden'
                          )}
                          onClick={closeMobileMenu}
                          style={{
                            transitionDelay: servicesOpen ? `${index * 50}ms` : '0ms'
                          }}
                        >
                          {/* Efecto de brillo suave */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover/item:translate-x-[100%] transition-transform duration-700" />
                          
                          <div className="relative z-10 p-2.5 rounded-xl bg-white/10 backdrop-blur-sm group-hover/item:bg-cuenca-blue group-hover/item:scale-110 transition-all duration-300">
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <span className="relative z-10 leading-tight">
                            {service.name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Nosotros */}
              <button
                onClick={() => scrollToSection('nosotros')}
                className={clsx(
                  'group block w-full text-left p-5 rounded-2xl transition-all duration-500',
                  'bg-gradient-to-r from-white/10 to-white/5',
                  'backdrop-blur-sm border border-white/20',
                  'hover:from-white/20 hover:to-white/15 hover:border-white/40',
                  'text-white hover:text-white',
                  'text-xl font-semibold tracking-wide',
                  'shadow-lg hover:shadow-2xl',
                  'transform hover:scale-[1.02] hover:-translate-y-1',
                  'relative overflow-hidden'
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative z-10">Nosotros</span>
              </button>

              {/* Contacto */}
              <button
                onClick={() => scrollToSection('contacto')}
                className={clsx(
                  'group block w-full text-left p-5 rounded-2xl transition-all duration-500',
                  'bg-gradient-to-r from-white/10 to-white/5',
                  'backdrop-blur-sm border border-white/20',
                  'hover:from-white/20 hover:to-white/15 hover:border-white/40',
                  'text-white hover:text-white',
                  'text-xl font-semibold tracking-wide',
                  'shadow-lg hover:shadow-2xl',
                  'transform hover:scale-[1.02] hover:-translate-y-1',
                  'relative overflow-hidden'
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative z-10">Contacto</span>
              </button>
            </div>
          </div>

          {/* Botón CTA en la parte inferior con diseño premium */}
          <div className="px-6 py-4">
            <button
              onClick={() => scrollToSection('contacto')}
              className={clsx(
                'group relative w-full overflow-hidden rounded-2xl p-6',
                'bg-gradient-to-r from-cuenca-blue via-cuenca-blue to-cuenca-blue/90',
                'hover:from-cuenca-blue/90 hover:via-cuenca-blue hover:to-cuenca-blue',
                'text-white font-bold text-xl tracking-wide',
                'shadow-2xl hover:shadow-3xl',
                'transform hover:scale-[1.02] hover:-translate-y-1',
                'transition-all duration-500',
                'border border-cuenca-gold/30 hover:border-cuenca-gold/50',
                'backdrop-blur-sm'
              )}
            >
              {/* Efecto de brillo animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              {/* Borde dorado sutil */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cuenca-gold/10 via-transparent to-cuenca-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10">Contáctanos</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
