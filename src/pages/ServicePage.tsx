
import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import ServiceDetail from '@/components/ServiceDetail';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { servicesData } from '@/data/services';

const ServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const id = serviceId || '';
  const [pageTitle, setPageTitle] = useState('Servicio | Cuenca & Asociados');
  
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
  
  // Set up intersection observer for animation on scroll
  useEffect(() => {
    const observerOptions = {
      rootMargin: '0px',
      threshold: 0.1,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((element) => observer.observe(element));
    
    // Cleanup function to prevent memory leaks
    return () => {
      animatedElements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Suspense fallback={<div className="flex justify-center items-center py-20">Cargando...</div>}>
          <ServiceDetail />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default ServicePage;
