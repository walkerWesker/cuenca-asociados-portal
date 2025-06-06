
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ChevronLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Add title for the page
    document.title = 'Página no encontrada | Cuenca & Asociados';
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-cuenca-blue mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-6 font-serif">Página no encontrada</p>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center bg-cuenca-blue hover:bg-opacity-90 text-white px-6 py-3 rounded-md transition-all duration-300"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;
