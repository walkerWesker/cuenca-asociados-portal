
import { useEffect, useState, Suspense, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ServiceDetail from '@/components/ServiceDetail';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { servicesData } from '@/data/services';
import { useNavigation } from '@/contexts/NavigationContext';

/**
 * Página de detalle de servicios
 * Implementa el patrón de página con gestión de estado y persistencia de rutas
 */
const ServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { isInitialized } = useNavigation();
  const id = serviceId || '';
  const [pageTitle, setPageTitle] = useState('Servicio | Cuenca & Asociados');
  const observer = useRef<IntersectionObserver | null>(null);
  
  // Validación de servicio existente
  const service = servicesData.find(service => service.id === id);

  /**
   * Efecto para gestión del título del documento
   * Implementa SEO dinámico basado en el servicio actual
   */
  useEffect(() => {
    if (service) {
      const newTitle = `${service.title} | Cuenca & Asociados`;
      document.title = newTitle;
      setPageTitle(newTitle);
      console.log('Título actualizado:', newTitle);
    } else {
      document.title = 'Servicio | Cuenca & Asociados';
    }
    
    // Función de limpieza para resetear el título
    return () => {
      document.title = 'Cuenca & Asociados | Sociedad de Auditoría';
    };
  }, [service]);

  /**
   * Efecto para validación de servicio y redirección
   * Implementa validación de rutas con redirección automática
   */
  useEffect(() => {
    // Solo validar después de que la navegación esté inicializada
    if (isInitialized && id && !service) {
      console.warn('Servicio no encontrado:', id);
      // Redirigir a la página principal si el servicio no existe
      navigate('/', { replace: true });
    }
  }, [id, service, isInitialized, navigate]);
  
  /**
   * Configuración del Intersection Observer para animaciones
   * Implementa el patrón Observer para animaciones on-scroll optimizadas
   */
  useEffect(() => {
    const observerOptions = {
      rootMargin: '0px',
      threshold: 0.1,
    };
    
    // Crear observer con cleanup adecuado para prevenir memory leaks
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Opcional: dejar de observar el elemento una vez que es visible
          observer.current?.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observar elementos solo después de que el DOM esté listo
    const timer = setTimeout(() => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      if (observer.current) {
        animatedElements.forEach((element) => observer.current?.observe(element));
      }
    }, 100);
    
    // Función de limpieza para prevenir memory leaks
    return () => {
      clearTimeout(timer);
      if (observer.current) {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((element) => observer.current?.unobserve(element));
        observer.current.disconnect();
      }
    };
  }, [service]); // Dependencia de service para re-ejecutar cuando cambie

  // Mostrar loading mientras se inicializa la navegación
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-cuenca-blue border-t-transparent rounded-full animate-spin"></div>
          <div className="text-cuenca-blue font-medium">Inicializando...</div>
        </div>
      </div>
    );
  }

  // No renderizar nada si el servicio no existe (se redirigirá)
  if (id && !service) {
    return null;
  }
  
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pb-16">
        <Suspense fallback={
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-200 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        }>
          <ServiceDetail />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default ServicePage;
