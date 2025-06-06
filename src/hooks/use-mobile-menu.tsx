
/**
 * Hook centralizado para la gestión del menú de navegación móvil
 * 
 * Propósito empresarial:
 * - Optimiza la experiencia de navegación en dispositivos móviles y tablets
 * - Mejora la usabilidad del sitio web corporativo en pantallas pequeñas
 * - Facilita el acceso a servicios de auditoría desde cualquier dispositivo
 * - Incrementa la conversión al mejorar la navegación móvil
 * 
 * Funcionalidades clave:
 * - Gestión inteligente de estados del menú móvil
 * - Navegación fluida entre secciones de servicios
 * - Adaptación automática según el tamaño de pantalla
 * - Scroll suave a secciones con offset calculado para header fijo
 */

import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook personalizado para la gestión completa del menú de navegación móvil
 * 
 * Centraliza toda la lógica relacionada con:
 * - Estados de apertura/cierre del menú principal
 * - Gestión del dropdown de servicios
 * - Detección responsiva de dispositivos
 * - Navegación programática con scroll suave
 * - Auto-cierre en cambios de ruta
 * 
 * @returns {Object} Estado y funciones de control del menú móvil
 */
export function useMobileMenu() {
  // Estados principales del menú de navegación
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);  // Estado del menú principal
  const [servicesOpen, setServicesOpen] = useState(false);      // Estado del dropdown de servicios
  const [isMobile, setIsMobile] = useState(false);              // Detección de dispositivo móvil
  const [isTablet, setIsTablet] = useState(false);              // Detección de dispositivo tablet
  
  // Hook de React Router para detectar cambios de ruta
  const location = useLocation();

  /**
   * Efecto para detección responsiva del tamaño de pantalla
   * 
   * Implementa breakpoints empresariales estándar:
   * - Mobile: < 768px (smartphones)
   * - Tablet: 768px - 1023px (tablets, iPads)
   * - Desktop: >= 1024px (laptops, monitores)
   */
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const newIsMobile = width < 768;         // Breakpoint md de Tailwind
      const newIsTablet = width >= 768 && width < 1024; // Entre md y lg
      
      setIsMobile(newIsMobile);
      setIsTablet(newIsTablet);
      
      // Logging para debugging y monitoreo de comportamiento responsivo
      console.log('Screen size check:', {
        width,
        isMobile: newIsMobile,
        isTablet: newIsTablet,
        shouldShowMobile: newIsMobile || newIsTablet
      });
    };

    // Ejecutar verificación inicial y configurar listener de cambios
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup para prevenir memory leaks
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  /**
   * Efecto para auto-cierre del menú en cambios de ruta
   * 
   * Mejora la UX cerrando automáticamente el menú cuando el usuario
   * navega a una nueva página, evitando confusión visual.
   */
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [location]);

  /**
   * Efecto para auto-cierre en transición a escritorio
   * 
   * Cierra automáticamente el menú móvil cuando la pantalla
   * se expande al tamaño de escritorio (>= 1024px).
   */
  useEffect(() => {
    if (!isMobile && !isTablet && mobileMenuOpen) {
      console.log('Closing mobile menu - now on desktop');
      setMobileMenuOpen(false);
      setServicesOpen(false);
    }
  }, [isMobile, isTablet, mobileMenuOpen]);

  /**
   * Función para alternar el estado del menú principal
   * 
   * Utiliza useCallback para optimización de rendimiento,
   * evitando re-creación innecesaria de la función.
   */
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  /**
   * Función para alternar el dropdown de servicios
   * 
   * Permite expandir/contraer la sección de servicios
   * dentro del menú móvil.
   */
  const toggleServices = useCallback(() => {
    setServicesOpen(prev => !prev);
  }, []);

  /**
   * Función para cerrar completamente el menú móvil
   * 
   * Resetea todos los estados de apertura a su estado inicial.
   * Útil para cerrar programáticamente después de acciones del usuario.
   */
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, []);

  /**
   * Función de navegación inteligente con scroll suave
   * 
   * Implementa navegación programática a secciones específicas de la página
   * con cálculo automático de offset para compensar el header fijo.
   * 
   * Características:
   * - Cierre automático del menú después del scroll
   * - Offset calculado según el tipo de dispositivo
   * - Scroll suave para mejor experiencia visual
   * - Fallback seguro si la sección no existe
   * 
   * @param {string} sectionId - ID del elemento al que navegar
   */
  const scrollToSection = useCallback((sectionId: string) => {
    // Cerrar menú inmediatamente para feedback visual rápido
    setMobileMenuOpen(false);
    setServicesOpen(false);
    
    // Buscar el elemento objetivo en el DOM
    const element = document.getElementById(sectionId);
    if (element) {
      // Calcular offset del header según el dispositivo
      // Diferentes alturas de header para optimizar el espacio en cada dispositivo
      const headerHeight = isMobile ? 70 : isTablet ? 75 : 80;
      
      // Calcular posición exacta considerando el scroll actual
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      // Ejecutar scroll suave a la posición calculada
      window.scrollTo({ 
        top: offsetPosition, 
        behavior: 'smooth' 
      });
    }
  }, [isMobile, isTablet]);

  // Retornar todas las funciones y estados para uso en componentes
  return {
    mobileMenuOpen,    // Estado del menú principal
    servicesOpen,      // Estado del dropdown de servicios
    toggleMobileMenu,  // Función para alternar menú principal
    toggleServices,    // Función para alternar dropdown de servicios
    closeMobileMenu,   // Función para cerrar completamente el menú
    scrollToSection,   // Función de navegación con scroll suave
    isMobile,          // Indicador de dispositivo móvil
    isTablet           // Indicador de dispositivo tablet
  };
}
