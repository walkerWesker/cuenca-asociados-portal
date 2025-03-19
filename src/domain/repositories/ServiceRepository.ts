
import { Service } from '../entities/Service';

/**
 * Repository interface for accessing Service data
 */
export interface ServiceRepository {
  getServices(): Service[];
  getServiceById(id: string): Service | undefined;
  getHighlightedServices(): Service[];
}
