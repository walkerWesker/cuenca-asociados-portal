
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Hook personalizado para gestión de persistencia de rutas
 * Implementa el patrón Observer para mantener sincronizado el estado de la ruta
 * con el almacenamiento local del navegador
 */
export const useRoutePersistence = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  // Clave para almacenamiento local
  const ROUTE_STORAGE_KEY = 'cuenca_last_route';

  /**
   * Guarda la ruta actual en localStorage
   * Implementa el patrón de persistencia de estado
   */
  const saveCurrentRoute = (pathname: string, search: string = '') => {
    try {
      const routeData = {
        pathname,
        search,
        timestamp: Date.now()
      };
      localStorage.setItem(ROUTE_STORAGE_KEY, JSON.stringify(routeData));
      console.log('Ruta guardada:', routeData);
    } catch (error) {
      console.warn('Error al guardar la ruta:', error);
    }
  };

  /**
   * Recupera la última ruta guardada del localStorage
   * Incluye validación de expiración y formato
   */
  const getSavedRoute = () => {
    try {
      const savedData = localStorage.getItem(ROUTE_STORAGE_KEY);
      if (!savedData) return null;

      const routeData = JSON.parse(savedData);
      
      // Validar que los datos tengan el formato correcto
      if (!routeData.pathname || typeof routeData.pathname !== 'string') {
        return null;
      }

      // Opcional: Validar que la ruta no sea muy antigua (24 horas)
      const twentyFourHours = 24 * 60 * 60 * 1000;
      if (Date.now() - routeData.timestamp > twentyFourHours) {
        localStorage.removeItem(ROUTE_STORAGE_KEY);
        return null;
      }

      return routeData;
    } catch (error) {
      console.warn('Error al recuperar la ruta guardada:', error);
      return null;
    }
  };

  /**
   * Restaura la ruta guardada al inicializar la aplicación
   * Solo se ejecuta una vez al montar el componente
   */
  const restoreSavedRoute = () => {
    const savedRoute = getSavedRoute();
    
    if (savedRoute && location.pathname === '/') {
      // Solo restaurar si estamos en la ruta raíz
      const fullPath = savedRoute.pathname + (savedRoute.search || '');
      console.log('Restaurando ruta guardada:', fullPath);
      navigate(fullPath, { replace: true });
    }
  };

  /**
   * Limpia la ruta guardada del localStorage
   */
  const clearSavedRoute = () => {
    localStorage.removeItem(ROUTE_STORAGE_KEY);
  };

  // Efecto para inicialización de la persistencia
  useEffect(() => {
    if (!isInitialized) {
      // Restaurar ruta guardada solo en la primera carga
      restoreSavedRoute();
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Efecto para guardar la ruta actual cada vez que cambie
  useEffect(() => {
    if (isInitialized && location.pathname !== '/') {
      // Solo guardar rutas que no sean la página principal
      saveCurrentRoute(location.pathname, location.search);
    }
  }, [location.pathname, location.search, isInitialized]);

  return {
    saveCurrentRoute,
    getSavedRoute,
    clearSavedRoute,
    isInitialized
  };
};
