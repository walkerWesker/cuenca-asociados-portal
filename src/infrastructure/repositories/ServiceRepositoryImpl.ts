
import { Service } from '@/domain/entities/Service';
import { ServiceRepository } from '@/domain/repositories/ServiceRepository';
import { servicesData } from '@/data/services';

/**
 * Implementation of the ServiceRepository interface
 * This connects to the data source (currently static data)
 */
export class ServiceRepositoryImpl implements ServiceRepository {
  getServices(): Service[] {
    return servicesData;
  }

  getServiceById(id: string): Service | undefined {
    return servicesData.find(service => service.id === id);
  }

  getHighlightedServices(): Service[] {
    // For now, just return all services, but in the future this could filter
    // based on some criteria like featured=true
    return servicesData;
  }
}
