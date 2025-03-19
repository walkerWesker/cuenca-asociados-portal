
/**
 * This file ensures backward compatibility with the previous project structure
 * by exporting components from their new locations to their old import paths
 */

// Re-export components from presentation layer
export { default as Hero } from './presentation/components/Hero';
export { default as Services } from './presentation/components/Services';
export { default as ServicesSlider } from './presentation/components/ServicesSlider';
export { default as ServiceDetail } from './presentation/components/ServiceDetail';

// Re-export hooks
export { useServices } from './presentation/hooks/useServices';
export { useAnimation } from './presentation/hooks/useAnimation';
export { useScrollProgress } from './presentation/hooks/useScrollProgress';
export { useAnchorNavigation } from './presentation/hooks/useAnchorNavigation';
