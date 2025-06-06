
import React, { createContext, useContext, ReactNode } from 'react';
import { useRoutePersistence } from '@/hooks/use-route-persistence';

/**
 * Interfaz para el contexto de navegación
 * Define la estructura del estado y métodos disponibles
 */
interface NavigationContextType {
  saveCurrentRoute: (pathname: string, search?: string) => void;
  getSavedRoute: () => any;
  clearSavedRoute: () => void;
  isInitialized: boolean;
}

/**
 * Contexto de navegación usando el patrón Provider
 * Proporciona funcionalidades de persistencia de rutas a toda la aplicación
 */
const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

/**
 * Props para el provider de navegación
 */
interface NavigationProviderProps {
  children: ReactNode;
}

/**
 * Provider de navegación
 * Implementa el patrón Provider para compartir estado de navegación
 */
export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const routePersistence = useRoutePersistence();

  const contextValue: NavigationContextType = {
    ...routePersistence
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

/**
 * Hook personalizado para usar el contexto de navegación
 * Implementa el patrón Hook personalizado con validación
 */
export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  
  if (context === undefined) {
    throw new Error('useNavigation debe ser usado dentro de un NavigationProvider');
  }
  
  return context;
};
