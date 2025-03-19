
import { Service } from '@/domain/entities/Service';
import { ServiceRepository } from '@/domain/repositories/ServiceRepository';

/**
 * Use case for retrieving all services
 */
export class GetServicesUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  execute(): Service[] {
    return this.serviceRepository.getServices();
  }
}
