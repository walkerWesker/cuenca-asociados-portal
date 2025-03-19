
import { useEffect, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import ServiceDetail from '@/presentation/components/ServiceDetail';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAnimation } from '@/presentation/hooks/useAnimation';

/**
 * Service page component with modern React practices
 */
const ServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  useAnimation({ once: true });
  
  // Scroll to top when the service page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);
  
  // Change document title based on service
  useEffect(() => {
    const service = serviceId ? document.title = `${serviceId} | Cuenca & Asociados` : 'Servicio | Cuenca & Asociados';
    document.title = service;
    
    return () => {
      document.title = 'Cuenca & Asociados | Sociedad de Auditoría';
    };
  }, [serviceId]);
  
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
