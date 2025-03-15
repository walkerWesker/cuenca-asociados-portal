
import { useParams } from 'react-router-dom';
import ServiceDetail from '@/components/ServiceDetail';

const ServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  
  // If serviceId is undefined, use a fallback or handle it appropriately
  const id = serviceId || '';
  
  return <ServiceDetail serviceId={id} />;
};

export default ServicePage;
