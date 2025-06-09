
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { NavigationProvider } from "@/contexts/NavigationContext";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * Componente de fallback para rutas lazy-loaded
 * Implementa un indicador de carga consistente con el diseño
 */
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center w-full overflow-hidden">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-cuenca-blue border-t-transparent rounded-full animate-spin"></div>
      <div className="animate-pulse-subtle text-cuenca-blue font-medium">Cargando...</div>
    </div>
  </div>
);

// Create a new QueryClient instance with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false, // Evitar refetch innecesario al cambiar de pestaña
    },
  },
});

/**
 * Componente principal de la aplicación
 * Implementa el patrón de composición con providers anidados
 * Integra sistema de persistencia de rutas y gestión de estado global
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <NavigationProvider>
          <div className="w-full overflow-x-hidden max-w-full">
            <Toaster />
            <Sonner />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Ruta principal - Página de inicio */}
                <Route path="/" element={<Index />} />
                
                {/* Ruta de servicios con parámetro dinámico */}
                <Route path="/servicios/:serviceId" element={<ServicePage />} />
                
                {/* Redirección de URLs incorrectas de servicios */}
                <Route path="/servicios" element={<Navigate to="/" replace />} />
                
                {/* Ruta catch-all para manejo de 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </NavigationProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
