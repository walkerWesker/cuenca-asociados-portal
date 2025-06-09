
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { NavigationProvider } from './contexts/NavigationContext';
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import ServicePage from './pages/ServicePage';

/**
 * Componente principal de la aplicación
 * Incluye configuración de rutas, providers y navegación persistente
 */
function App() {
  return (
    <NextUIProvider>
      <NavigationProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/servicios/:serviceId" element={<ServicePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </NavigationProvider>
    </NextUIProvider>
  );
}

export default App;
