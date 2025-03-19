
import { Service } from '@/domain/entities/Service';
import { ServiceRepository } from '@/domain/repositories/ServiceRepository';

/**
 * Use case for retrieving highlighted or featured services
 */
export class GetHighlightedServicesUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  execute(): Service[] {
    return this.serviceRepository.getHighlightedServices();
  }
}
