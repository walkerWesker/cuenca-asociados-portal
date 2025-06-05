
export interface ServiceHeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  gradientFrom: string;
  gradientTo: string;
}

export const serviceHeroSlides: ServiceHeroSlide[] = [
  {
    id: 'slide-1',
    title: 'Excelencia en Servicios Profesionales',
    subtitle: 'Soluciones Especializadas',
    description: 'Ofrecemos servicios contables y de auditoría de la más alta calidad, adaptados a las necesidades específicas de su empresa.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    gradientFrom: 'from-black/80',
    gradientTo: 'to-black/50'
  },
  {
    id: 'slide-2',
    title: 'Compromiso con la Calidad',
    subtitle: 'Servicios Profesionales',
    description: 'Nuestro equipo de expertos se dedica a proporcionar soluciones integrales que impulsen el crecimiento de su negocio.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    gradientFrom: 'from-cuenca-blue/80',
    gradientTo: 'to-cuenca-blue/50'
  },
  {
    id: 'slide-3',
    title: 'Experiencia y Confianza',
    subtitle: 'Más de 15 Años',
    description: 'Con más de una década de experiencia, somos su socio estratégico para el éxito empresarial y el cumplimiento normativo.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    gradientFrom: 'from-gray-900/80',
    gradientTo: 'to-gray-700/50'
  }
];
