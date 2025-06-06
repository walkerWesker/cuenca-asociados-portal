
/**
 * Hook simplificado para detección de dispositivos móviles
 * 
 * Propósito empresarial:
 * - Proporciona una interfaz simple para detectar dispositivos móviles
 * - Optimiza la experiencia de usuario en smartphones
 * - Facilita decisiones de renderizado condicional para móviles
 * - Complementa el sistema responsivo de la aplicación
 * 
 * Casos de uso específicos:
 * - Mostrar/ocultar elementos específicos para móviles
 * - Adaptar comportamientos táctiles vs mouse
 * - Optimizar el rendimiento cargando componentes ligeros en móviles
 * - Personalizar la presentación de servicios de auditoría para smartphones
 */

import * as React from "react"

// Constante de breakpoint móvil alineada con el sistema de diseño
// 768px corresponde al breakpoint 'md' de Tailwind CSS
const MOBILE_BREAKPOINT = 768

/**
 * Hook personalizado para detección específica de dispositivos móviles
 * 
 * Implementa una lógica simplificada enfocada únicamente en la distinción
 * entre móvil vs no-móvil, ideal para casos donde solo se necesita
 * esta clasificación binaria.
 * 
 * Características técnicas:
 * - Uso de MediaQuery API para detección eficiente
 * - Estado reactivo que se actualiza automáticamente
 * - Optimizado para rendimiento con event listeners nativos
 * - Inicialización segura con estado undefined durante SSR
 * 
 * @returns {boolean} true si el dispositivo es móvil, false en caso contrario
 */
export function useIsMobile() {
  // Estado inicial undefined para manejo seguro de SSR (Server-Side Rendering)
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    /**
     * Configuración de MediaQuery para detección responsiva
     * 
     * Utiliza la API nativa de MediaQuery del navegador para una
     * detección más eficiente que los event listeners de resize.
     * 
     * Query: (max-width: 767px) - detecta pantallas menores al breakpoint móvil
     */
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    /**
     * Handler para cambios en el estado del MediaQuery
     * 
     * Se ejecuta tanto en el cambio inicial como en cada modificación
     * del tamaño de pantalla que cruce el breakpoint móvil.
     */
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Configurar listener para cambios automáticos
    mql.addEventListener("change", onChange)
    
    // Establecer el valor inicial inmediatamente
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Cleanup: remover listener al desmontar para prevenir memory leaks
    return () => mql.removeEventListener("change", onChange)
  }, []) // Array de dependencias vacío: configurar solo una vez

  /**
   * Retorna un boolean definitivo
   * 
   * Convierte el estado potencialmente undefined a un boolean
   * usando el operador de doble negación (!!).
   * Durante la hidratación inicial retorna false como fallback seguro.
   */
  return !!isMobile
}
