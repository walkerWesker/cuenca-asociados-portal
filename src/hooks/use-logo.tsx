
/**
 * Hook especializado para la gestión del logotipo corporativo
 * 
 * Propósito empresarial:
 * - Centraliza la gestión de la identidad visual de la marca "Cuenca & Asociados"
 * - Optimiza la carga de recursos gráficos críticos para la imagen corporativa
 * - Garantiza una experiencia de usuario fluida durante la carga del sitio web
 * - Proporciona fallbacks profesionales en caso de errores de carga
 * 
 * Beneficios para el negocio:
 * - Mejora la percepción de marca con carga rápida del logotipo
 * - Reduce la tasa de rebote mediante una carga visual optimizada
 * - Mantiene la consistencia de la identidad corporativa
 * - Facilita el mantenimiento centralizado de assets de marca
 */

import { useState, useEffect, useMemo } from 'react';
import { logoData, LogoData } from '@/data/logoData';

/**
 * Hook personalizado para la gestión del logotipo corporativo
 * 
 * Implementa una estrategia de precarga de imágenes para optimizar
 * la experiencia del usuario y garantizar que el logotipo de la empresa
 * se muestre correctamente desde el primer momento.
 * 
 * Características técnicas:
 * - Precarga inmediata de la imagen sin delays artificiales
 * - Manejo de errores con fallbacks apropiados
 * - Memoización de datos para prevenir re-renders innecesarios
 * - Estados de carga claros para integración con UI loading states
 * 
 * @returns {Object} Estado del logotipo y datos corporativos
 */
export const useLogo = () => {
  // Estado de carga: false durante la precarga, true cuando está listo
  const [isLoaded, setIsLoaded] = useState(false);

  // Memoización de los datos del logotipo para optimizar el rendimiento
  // Previene re-creación innecesaria del objeto en cada render
  const data = useMemo<LogoData>(() => logoData, []);

  useEffect(() => {
    /**
     * Estrategia de precarga de imagen corporativa
     * 
     * Se crea una instancia de Image en memoria para precargar
     * el logotipo antes de renderizarlo en el DOM. Esto garantiza
     * que no haya parpadeos o retrasos visuales al mostrar la marca.
     */
    const img = new Image();
    
    /**
     * Handler para carga exitosa de la imagen
     * Marca el logotipo como listo para mostrar
     */
    const handleLoad = () => {
      setIsLoaded(true);
    };

    /**
     * Handler para errores de carga
     * 
     * En caso de fallo (red lenta, imagen no disponible, etc.),
     * se mantiene el estado como "cargado" para mostrar el fallback
     * textual con el nombre de la empresa.
     */
    const handleError = () => {
      console.warn('Logo image failed to load:', data.imageUrl);
      setIsLoaded(true); // Permitir mostrar fallback textual
    };

    // Configuración de event listeners para manejo de estados de carga
    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    
    // Iniciar la precarga inmediatamente para optimizar el tiempo de carga
    img.src = data.imageUrl;

    // Cleanup: remover listeners al desmontar para prevenir memory leaks
    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [data.imageUrl]); // Dependencia: re-ejecutar si cambia la URL del logotipo

  return {
    data,      // Información corporativa completa (nombre, subtitle, etc.)
    isLoaded   // Estado de carga para conditional rendering en componentes
  };
};
