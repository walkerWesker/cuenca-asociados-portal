
import { useParams } from 'react-router-dom';
import ServiceDetail from '@/components/ServiceDetail';

const ServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  return <ServiceDetail />;
};

export default ServicePage;
