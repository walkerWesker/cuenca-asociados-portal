import { 
  BarChart3, 
  Building, 
  Calculator, 
  ClipboardList,
  FileSpreadsheet, 
  BarChart4, 
  Shield, 
  Lightbulb,
  Search,
  FileCheck 
} from 'lucide-react';

export const servicesData = [
  {
    id: 'reestructuracion',
    title: 'Reestructuración Financiera y Operativa',
    description: 'Asistencia integral en procesos de reestructuración empresarial para optimizar la estructura financiera y operativa, garantizando viabilidad y sostenibilidad a largo plazo',
    icon: BarChart3,
    details: [
      'Evaluación exhaustiva de la situación financiera y operativa de la empresa',
      'Diseño y ejecución de estrategias de reestructuración de deudas y capital',
      'Optimización de procesos internos para mejorar la eficiencia operativa',
      'Implementación de planes de contingencia y mitigación de riesgos',
      'Asesoría en negociaciones con acreedores y stakeholders clave'
    ],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3'
  },
  {
    id: 'outsourcing',
    title: 'Outsourcing Administrativo',
    description: 'Externalización de funciones administrativas clave, garantizando eficiencia operativa y cumplimiento normativo en un entorno empresarial dinámico',
    icon: Building,
    details: [
      'Gestión integral de procesos administrativos y financieros',
      'Automatización y digitalización de tareas administrativas',
      'Monitoreo continuo de indicadores clave de desempeño (KPIs)',
      'Optimización de recursos y reducción de costos operativos',
      'Implementación de soluciones tecnológicas personalizadas'
    ],
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3'
  },
  {
    id: 'tributario',
    title: 'Outsourcing Tributario',
    description: 'Gestión especializada en obligaciones fiscales y tributarias, asegurando el cumplimiento de normativas y la optimización de la carga impositiva',
    icon: Calculator,
    details: [
      'Preparación y presentación oportuna de declaraciones de impuestos (Renta, IGV, ITAN, etc.)',
      'Asesoría en incentivos y beneficios fiscales conforme a la legislación peruana',
      'Gestión de requerimientos y fiscalizaciones por parte de la SUNAT',
      'Elaboración de estrategias de planificación fiscal y tributaria',
      'Actualización constante ante cambios en normativas y leyes fiscales'
    ],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3'
  },
  {
    id: 'planillas',
    title: 'Outsourcing de Planillas',
    description: 'Administración integral del procesamiento de nóminas y beneficios sociales, garantizando cumplimiento normativo y satisfacción del personal.',
    icon: ClipboardList,
    details: [
      'Cálculo preciso de planillas, remuneraciones y beneficios sociales',
      'Gestión de aportes obligatorios a AFP, EsSalud y otros organismos estatales',
      'Control eficiente de altas, bajas y modificaciones de personal',
      'Elaboración y entrega de reportes laborales conforme a la legislación vigente',
      'Aseguramiento del cumplimiento de normativas laborales en cada proceso'
    ],
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3'
  },
  {
    id: 'niif',
    title: 'Implementación NIIF',
    description: 'Asesoría integral en la adopción e implementación de las Normas Internacionales de Información Financiera (NIIF) para lograr transparencia y comparabilidad en la información financiera',
    icon: FileSpreadsheet,
    details: [
      'Diagnóstico inicial para identificar brechas entre prácticas actuales y NIIF',
      'Diseño de un plan de transición adaptado a las necesidades de la empresa',
      'Capacitación y acompañamiento al equipo contable y financiero',
      'Actualización y adecuación de sistemas contables para cumplir con NIIF',
      'Revisión y validación de estados financieros elaborados bajo estos estándares'
    ],
    image: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?ixlib=rb-4.0.3'
  },
  {
    id: 'precios',
    title: 'Precios de Transferencia',
    description: 'Servicios especializados en estudios de precios de transferencia, asegurando el cumplimiento de normativas locales e internacionales y reduciendo riesgos fiscales',
    icon: BarChart4,
    details: [
      'Elaboración de estudios técnicos de precios de transferencia acorde a la legislación',
      'Análisis comparativo para determinar valores de mercado en transacciones intercompañía',
      'Documentación detallada y elaboración de reportes país por país',
      'Asesoría en la implementación de políticas de precios de transferencia',
      'Soporte técnico y defensa ante auditorías fiscales de SUNAT'
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3'
  },
  {
    id: 'auditoria',
    title: 'Auditoría de Sistemas',
    description: 'Evaluación integral de la infraestructura tecnológica y sistemas de información, enfocada en la seguridad, eficiencia y cumplimiento de normativas internacionales',
    icon: Shield,
    details: [
      'Revisión exhaustiva de la infraestructura tecnológica y sistemas informáticos',
      'Identificación y análisis de vulnerabilidades en la seguridad de la información',
      'Evaluación de controles internos y políticas de protección de datos',
      'Recomendaciones para la optimización y fortalecimiento de sistemas TI',
      'Implementación de prácticas de auditoría conforme a estándares internacionales'
    ],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3'
  },
  {
    id: 'auditoria-financiera',
    title: 'Auditoría Financiera y Tributaria',
    description: 'Análisis riguroso del cumplimiento financiero y tributario, ofreciendo soluciones para mitigar riesgos y optimizar la gestión fiscal de la empresa',
    icon: Search,
    details: [
      'Revisión detallada de estados financieros y prácticas contables',
      'Verificación del cumplimiento de obligaciones tributarias según la normativa peruana',
      'Identificación de riesgos financieros y fiscales con propuestas de mitigación',
      'Asesoría en defensa y respuesta ante auditorías y fiscalizaciones de SUNAT',
      'Elaboración de informes integrales y planes de mejora continua'
    ],
    image: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?ixlib=rb-4.0.3'
  },
  {
    id: 'consultoria',
    title: 'Asesoría Empresarial',
    description: 'Consultoría estratégica integral para optimizar la gestión empresarial, impulsar el crecimiento y mejorar la competitividad en mercados locales y globales',
    icon: Lightbulb,
    details: [
      'Desarrollo de planes estratégicos y estudios de viabilidad empresarial',
      'Optimización de procesos internos y administrativos para mayor eficiencia',
      'Asesoría en transformación digital y adopción de nuevas tecnologías',
      'Diseño de modelos de negocio innovadores y sostenibles',
      'Implementación de estrategias para reducción de costos y mejora de rentabilidad'
    ],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3'
  },
];
