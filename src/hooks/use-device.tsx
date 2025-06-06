
/**
 * Hook personalizado para la detección responsiva de dispositivos
 * 
 * Propósito empresarial:
 * - Optimiza la experiencia de usuario adaptando la interfaz según el dispositivo
 * - Permite implementar lógica de negocio específica para móviles, tablets y escritorio
 * - Mejora la usabilidad y accesibilidad en diferentes resoluciones de pantalla
 * - Facilita la toma de decisiones de renderizado condicional basado en el dispositivo
 * 
 * Casos de uso:
 * - Mostrar/ocultar elementos según el tamaño de pantalla
 * - Adaptar layouts de servicios para diferentes dispositivos
 * - Personalizar la navegación según la plataforma del usuario
 * - Optimizar el rendimiento cargando componentes específicos por dispositivo
 */

import { useState, useEffect } from 'react';

// Definición de la interfaz que describe los tipos de dispositivo detectados
export interface DeviceType {
  isMobile: boolean;     // Indica si el dispositivo es móvil (< 768px)
  isTablet: boolean;     // Indica si el dispositivo es tablet (768px - 1024px)
  isDesktop: boolean;    // Indica si el dispositivo es escritorio (>= 1024px)
  screenSize: 'mobile' | 'tablet' | 'desktop'; // Clasificación textual del dispositivo
}

/**
 * Hook para detectar el tipo de dispositivo basado en el ancho de pantalla
 * 
 * Utiliza breakpoints estándar de Tailwind CSS para garantizar consistencia
 * con el sistema de diseño de la aplicación:
 * - Mobile: < 768px (md breakpoint)
 * - Tablet: 768px - 1023px (md a lg breakpoint)
 * - Desktop: >= 1024px (lg breakpoint)
 * 
 * @returns {DeviceType} Objeto con información del dispositivo actual
 */
export function useDevice(): DeviceType {
  // Estado inicial configurado para escritorio como fallback seguro
  const [device, setDevice] = useState<DeviceType>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenSize: 'desktop'
  });

  useEffect(() => {
    /**
     * Función interna para actualizar la detección de dispositivo
     * Se ejecuta en el montaje inicial y en cada cambio de tamaño de ventana
     */
    const updateDevice = () => {
      const width = window.innerWidth;
      
      // Lógica de clasificación basada en breakpoints empresariales estándar
      if (width < 768) {
        // Dispositivos móviles: smartphones y pantallas pequeñas
        setDevice({
          isMobile: true,
          isTablet: false,
          isDesktop: false,
          screenSize: 'mobile'
        });
      } else if (width >= 768 && width < 1024) {
        // Dispositivos tablet: iPads y tablets en orientación portrait/landscape
        setDevice({
          isMobile: false,
          isTablet: true,
          isDesktop: false,
          screenSize: 'tablet'
        });
      } else {
        // Dispositivos de escritorio: laptops, monitores y pantallas grandes
        setDevice({
          isMobile: false,
          isTablet: false,
          isDesktop: true,
          screenSize: 'desktop'
        });
      }
    };

    // Establecer el valor inicial al montar el componente
    updateDevice();

    // Configurar listener para cambios de tamaño de ventana
    // Esto permite adaptación en tiempo real cuando el usuario rota el dispositivo
    // o redimensiona la ventana del navegador
    window.addEventListener('resize', updateDevice);

    // Cleanup: remover el listener al desmontar para prevenir memory leaks
    return () => window.removeEventListener('resize', updateDevice);
  }, []); // Array de dependencias vacío: solo se ejecuta al montar/desmontar

  return device;
}
