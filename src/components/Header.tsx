import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Define services data to keep it consistent
const servicesMenuItems = [
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

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const isServicePage = location.pathname.includes('/servicios/');
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Scroll to section with offset for fixed header
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false); // Close mobile menu if open
    
    if (isServicePage) {
      // If we're on a service page, scroll to the section on the same page
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 80; // Approx header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // If not on service page, navigate to homepage with hash
      window.location.href = `/#${sectionId}`;
    }
  };
  
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleServices = () => setServicesOpen(!servicesOpen);
  
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass-effect py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-serif font-bold text-cuenca-blue">
            Cuenca <span className="text-cuenca-gold">&</span> Asociados
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="hover-link font-medium text-cuenca-dark">Inicio</Link>
          <div className="relative group">
            <button 
              onClick={toggleServices}
              className="flex items-center font-medium text-cuenca-dark hover-link"
            >
              Servicios <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="py-2 px-4 space-y-2">
                {servicesMenuItems.map(service => (
                  <Link 
                    key={service.id} 
                    to={`/servicios/${service.id}`} 
                    className="block px-2 py-2 text-sm hover:bg-gray-100 rounded-md"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <button 
            onClick={() => scrollToSection('nosotros')} 
            className="hover-link font-medium text-cuenca-dark"
          >
            Nosotros
          </button>
          <button 
            onClick={() => scrollToSection('contacto')} 
            className="hover-link font-medium text-cuenca-dark"
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
        
        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-cuenca-dark" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full glass-effect overflow-hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="container mx-auto py-4 px-4 space-y-3">
          <Link to="/" className="block py-2 hover:text-cuenca-gold transition-colors">Inicio</Link>
          <div>
            <button 
              onClick={toggleServices}
              className="flex items-center justify-between w-full py-2"
            >
              <span>Servicios</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${
              servicesOpen ? 'max-h-96 mt-2' : 'max-h-0'
            }`}>
              <div className="pl-4 space-y-2 border-l-2 border-cuenca-gold">
                {servicesMenuItems.map(service => (
                  <Link 
                    key={service.id} 
                    to={`/servicios/${service.id}`} 
                    className="block py-1 text-sm"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <button 
            onClick={() => scrollToSection('nosotros')}
            className="block py-2 w-full text-left hover:text-cuenca-gold transition-colors"
          >
            Nosotros
          </button>
          <button 
            onClick={() => scrollToSection('contacto')}
            className="block py-2 w-full text-left hover:text-cuenca-gold transition-colors"
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
