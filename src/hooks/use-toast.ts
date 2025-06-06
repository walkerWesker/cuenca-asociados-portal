
/**
 * Sistema centralizado de notificaciones toast para la aplicación
 * 
 * Propósito empresarial:
 * - Mejora la comunicación con el usuario mediante notificaciones no intrusivas
 * - Proporciona feedback inmediato sobre acciones realizadas (envío de formularios, errores, etc.)
 * - Mantiene al usuario informado sobre el estado de operaciones empresariales
 * - Reduce la fricción en procesos críticos como contacto con clientes
 * 
 * Beneficios para el negocio:
 * - Mejora la experiencia del usuario en formularios de contacto
 * - Reduce consultas de soporte al proporcionar feedback claro
 * - Incrementa la confianza del usuario con notificaciones profesionales
 * - Facilita el reporting de errores para mejorar el servicio
 */

import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

// Configuración del sistema de toast
const TOAST_LIMIT = 1        // Máximo un toast visible simultáneamente para evitar spam visual
const TOAST_REMOVE_DELAY = 1000000  // Delay largo para permitir lectura completa (desarrollo)

/**
 * Interfaz extendida para toast con metadatos empresariales
 * 
 * Extiende ToastProps base con propiedades específicas para
 * el contexto de una firma de auditoría profesional.
 */
type ToasterToast = ToastProps & {
  id: string                          // Identificador único para gestión de estado
  title?: React.ReactNode             // Título principal del mensaje
  description?: React.ReactNode       // Descripción detallada o contenido secundario
  action?: ToastActionElement         // Botón de acción opcional (ej: "Reintentar", "Ver detalles")
}

// Tipos de acciones disponibles en el sistema de toast
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",           // Agregar nuevo toast
  UPDATE_TOAST: "UPDATE_TOAST",     // Actualizar toast existente
  DISMISS_TOAST: "DISMISS_TOAST",   // Ocultar toast (animación de salida)
  REMOVE_TOAST: "REMOVE_TOAST",     // Remover completamente del estado
} as const

// Contador global para IDs únicos de toast
let count = 0

/**
 * Generador de IDs únicos para instancias de toast
 * 
 * Utiliza un contador incremental con wraparound para evitar
 * overflow en aplicaciones de larga duración.
 * 
 * @returns {string} ID único para el toast
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

/**
 * Acciones disponibles en el reducer de toast
 * 
 * Define la interfaz de todas las acciones posibles que pueden
 * modificar el estado del sistema de notificaciones.
 */
type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"] 
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

/**
 * Estado global del sistema de toast
 */
interface State {
  toasts: ToasterToast[]  // Array de todos los toast activos
}

// Map para gestión de timeouts de auto-dismissal
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

/**
 * Función para programar la remoción automática de toast
 * 
 * Implementa un sistema de cola para remover toast después
 * del delay configurado, evitando duplicación de timeouts.
 * 
 * @param {string} toastId - ID del toast a remover
 */
const addToRemoveQueue = (toastId: string) => {
  // Evitar múltiples timeouts para el mismo toast
  if (toastTimeouts.has(toastId)) {
    return
  }

  // Programar remoción después del delay configurado
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

/**
 * Reducer principal para gestión de estado de toast
 * 
 * Implementa la lógica de estado inmutable para todas las
 * operaciones del sistema de notificaciones empresariales.
 * 
 * @param {State} state - Estado actual
 * @param {Action} action - Acción a ejecutar
 * @returns {State} Nuevo estado
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      // Agregar nuevo toast al inicio del array, respetando el límite
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      // Actualizar toast existente manteniendo otros toast intactos
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // Programar remoción automática (side effect necesario para UX)
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        // Si no se especifica ID, dismiss todos los toast activos
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      // Marcar toast como cerrado para activar animación de salida
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,  // Trigger para animación de cierre
              }
            : t
        ),
      }
    }
    
    case "REMOVE_TOAST":
      // Remover completamente del estado
      if (action.toastId === undefined) {
        // Limpiar todos los toast
        return {
          ...state,
          toasts: [],
        }
      }
      
      // Remover toast específico
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// Array de listeners para subscripciones reactivas
const listeners: Array<(state: State) => void> = []

// Estado en memoria compartido entre todas las instancias
let memoryState: State = { toasts: [] }

/**
 * Dispatcher central para acciones de toast
 * 
 * Actualiza el estado global y notifica a todos los listeners
 * suscritos para re-renderizado reactivo.
 * 
 * @param {Action} action - Acción a ejecutar
 */
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// Tipo para configuración de toast sin ID (se genera automáticamente)
type Toast = Omit<ToasterToast, "id">

/**
 * Función principal para crear y mostrar toast
 * 
 * API pública para mostrar notificaciones en la aplicación.
 * Genera automáticamente el ID y configura handlers apropiados.
 * 
 * Ejemplo de uso empresarial:
 * ```typescript
 * // Notificación de éxito en envío de formulario
 * toast({
 *   title: "Mensaje enviado",
 *   description: "Su consulta ha sido recibida. Le contactaremos pronto.",
 *   variant: "default"
 * });
 * 
 * // Notificación de error en proceso de auditoría
 * toast({
 *   title: "Error en el proceso",
 *   description: "No se pudo cargar la información solicitada.",
 *   variant: "destructive"
 * });
 * ```
 * 
 * @param {Toast} props - Configuración del toast
 * @returns {Object} Objeto con métodos de control del toast
 */
function toast({ ...props }: Toast) {
  const id = genId()

  // Función para actualizar toast existente
  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  
  // Función para cerrar toast programáticamente
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  // Crear y mostrar el toast
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,  // Mostrar inmediatamente
      onOpenChange: (open) => {
        // Auto-dismiss cuando se cierra manualmente
        if (!open) dismiss()
      },
    },
  })

  // Retornar API de control para el toast creado
  return {
    id: id,
    dismiss,
    update,
  }
}

/**
 * Hook principal para integración con componentes React
 * 
 * Proporciona acceso reactivo al estado de toast y funciones
 * de control para uso en componentes de la aplicación.
 * 
 * Uso típico en componentes empresariales:
 * ```typescript
 * function ContactForm() {
 *   const { toast } = useToast();
 *   
 *   const handleSubmit = async () => {
 *     try {
 *       await submitContactForm();
 *       toast({
 *         title: "Éxito",
 *         description: "Su mensaje ha sido enviado correctamente."
 *       });
 *     } catch (error) {
 *       toast({
 *         title: "Error",
 *         description: "Error al enviar el mensaje. Intente nuevamente.",
 *         variant: "destructive"
 *       });
 *     }
 *   };
 * }
 * ```
 * 
 * @returns {Object} Estado y funciones de control de toast
 */
function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    // Suscribirse a cambios de estado global
    listeners.push(setState)
    
    // Cleanup: desuscribirse al desmontar
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,                                    // Estado actual (toasts activos)
    toast,                                       // Función para crear toast
    dismiss: (toastId?: string) => dispatch({    // Función para cerrar toast
      type: "DISMISS_TOAST", 
      toastId 
    }),
  }
}

// Exportar API pública del sistema de toast
export { useToast, toast }
