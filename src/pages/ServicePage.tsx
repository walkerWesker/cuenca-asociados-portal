
import { useEffect, useState, Suspense, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ServiceDetail from '@/components/ServiceDetail';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { servicesData } from '@/data/services';

const ServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const id = serviceId || '';
  const [pageTitle, setPageTitle] = useState('Servicio | Cuenca & Asociados');
  const observer = useRef<IntersectionObserver | null>(null);
  
  // Set document title based on service
  useEffect(() => {
    // Find the service to get its title
    const service = servicesData.find(service => service.id === id);
    
    if (service) {
      const newTitle = `${service.title} | Cuenca & Asociados`;
      document.title = newTitle;
      setPageTitle(newTitle);
    } else {
      document.title = 'Servicio | Cuenca & Asociados';
    }
    
    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = 'Cuenca & Asociados | Sociedad de Auditoría';
    };
  }, [id]);
  
  // Set up intersection observer for animation on scroll with proper cleanup
  useEffect(() => {
    const observerOptions = {
      rootMargin: '0px',
      threshold: 0.1,
    };
    
    // Use ref to store the observer instance for proper cleanup
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    
    // Query once and store in a variable to avoid memory leaks
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (observer.current) {
      animatedElements.forEach((element) => observer.current?.observe(element));
    }
    
    // Cleanup function to prevent memory leaks
    return () => {
      if (observer.current) {
        animatedElements.forEach((element) => observer.current?.unobserve(element));
        observer.current.disconnect();
      }
    };
  }, []);
  
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
