
import { Service } from '@/domain/entities/Service';
import { ServiceRepository } from '@/domain/repositories/ServiceRepository';

/**
 * Use case for retrieving a service by its ID
 */
export class GetServiceByIdUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  execute(id: string): Service | undefined {
    return this.serviceRepository.getServiceById(id);
  }
}
