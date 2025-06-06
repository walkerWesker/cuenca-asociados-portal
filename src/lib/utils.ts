
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utilidad de combinación y fusión de clases CSS para el sistema de diseño
 * 
 * Propósito empresarial:
 * Esta función centraliza la gestión de clases CSS en toda la aplicación,
 * asegurando consistencia en el sistema de diseño y optimizando el
 * rendimiento mediante la eliminación de clases conflictivas.
 * 
 * Casos de uso en la aplicación:
 * - Componentes UI (Button, Card, Alert, etc.) para variantes dinámicas
 * - Aplicación condicional de estilos según estados de componentes
 * - Fusión de clases predeterminadas con clases personalizadas del usuario
 * - Resolución de conflictos entre clases de Tailwind CSS
 * 
 * Ubicaciones de uso específicas:
 * - src/components/ui/* (todos los componentes base de Shadcn/UI)
 * - Componentes personalizados que requieren lógica condicional de estilos
 * - Sistemas de variantes con Class Variance Authority (CVA)
 * 
 * Tecnologías integradas:
 * - clsx: Construcción condicional de strings de clases CSS
 * - tailwind-merge: Fusión inteligente de clases Tailwind para evitar conflictos
 * 
 * @param inputs - Array de valores de clase CSS (strings, objetos, arrays, undefined, null)
 * @returns {string} String optimizado de clases CSS sin duplicados ni conflictos
 * 
 * @example
 * // Uso básico en componentes
 * cn("bg-blue-500", "text-white", someCondition && "hover:bg-blue-600")
 * 
 * @example
 * // Resolución de conflictos de Tailwind
 * cn("bg-red-500", "bg-blue-500") // Resultado: "bg-blue-500" (última clase prevalece)
 * 
 * @example
 * // Integración con variantes de componentes
 * cn(baseClasses, variantClasses[variant], className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
