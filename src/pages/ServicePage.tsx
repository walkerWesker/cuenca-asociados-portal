
import { useParams } from 'react-router-dom';
import ServiceDetail from '@/components/ServiceDetail';

const ServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  return <ServiceDetail serviceId={serviceId} />;
};

export default ServicePage;
