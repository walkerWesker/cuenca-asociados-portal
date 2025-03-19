
import { useMemo } from 'react';
import { ServiceRepositoryImpl } from '@/infrastructure/repositories/ServiceRepositoryImpl';
import { GetServicesUseCase } from '@/application/useCases/GetServicesUseCase';
import { GetServiceByIdUseCase } from '@/application/useCases/GetServiceByIdUseCase';
import { GetHighlightedServicesUseCase } from '@/application/useCases/GetHighlightedServicesUseCase';
import { Service } from '@/domain/entities/Service';

/**
 * Custom hook for accessing service data throughout the application
 * This centralizes all service-related data access
 */
export const useServices = () => {
  // Create repository and use cases
  const repository = useMemo(() => new ServiceRepositoryImpl(), []);
  const getServicesUseCase = useMemo(() => new GetServicesUseCase(repository), [repository]);
  const getServiceByIdUseCase = useMemo(() => new GetServiceByIdUseCase(repository), [repository]);
  const getHighlightedServicesUseCase = useMemo(() => new GetHighlightedServicesUseCase(repository), [repository]);

  // Define methods to access service data
  const getAllServices = useMemo(() => getServicesUseCase.execute(), [getServicesUseCase]);
  
  const getServiceById = (id: string): Service | undefined => {
    return getServiceByIdUseCase.execute(id);
  };
  
  const getHighlightedServices = useMemo(() => getHighlightedServicesUseCase.execute(), [getHighlightedServicesUseCase]);

  return {
    getAllServices,
    getServiceById,
    getHighlightedServices
  };
};
