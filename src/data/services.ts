
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
    description: 'Asistencia en procesos de reestructuración empresarial para reorganizar obligaciones a corto y mediano plazo, y determinar viabilidad comercial.',
    icon: BarChart3,
    details: [
      'Asistencia en procesos de reestructuración empresarial para reorganizar las obligaciones a corto y mediano plazo.',
      'Participación en la reestructuración del negocio en marcha para determinar su viabilidad comercial y operacional.',
      'Asignación de personal calificado de forma temporal o permanente para apoyar en áreas contables, financieras y legales.'
    ],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3'
  },
  {
    id: 'outsourcing',
    title: 'Outsourcing Administrativo',
    description: 'Soporte administrativo para la ejecución de actividades como tesorería, logística, importaciones y análisis de cuentas.',
    icon: Building,
    details: [
      'Soporte administrativo para la ejecución de actividades como tesorería, logística, importaciones y análisis de cuentas.',
      'Gestión eficiente de procesos administrativos para optimizar recursos y tiempo.',
      'Implementación de mejores prácticas adaptadas a su modelo de negocio.'
    ],
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3'
  },
  {
    id: 'tributario',
    title: 'Outsourcing Tributario',
    description: 'Declaraciones juradas, reclamaciones, descargos y solicitudes a SUNAT bajo normativas NIIF plenas y NIIF para PYMES.',
    icon: Calculator,
    details: [
      'Declaraciones juradas del impuesto a la renta, IGV, ITAN, entre otros.',
      'Reclamaciones, descargos y solicitudes a SUNAT.',
      'Asistencia en procedimientos de compensación, devolución y recuperación de tributos.',
      'Servicios bajo las normativas NIIF plenas y NIIF para PYMES.'
    ],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3'
  },
  {
    id: 'planillas',
    title: 'Outsourcing de Planillas',
    description: 'Cálculo de planillas, determinación de aportes mensuales y gestión de bajas de trabajadores y beneficios sociales.',
    icon: ClipboardList,
    details: [
      'Cálculo de planillas y generación de reportes.',
      'Determinación de aportes mensuales (AFP, ESSALUD, renta de 5ta categoría, etc.).',
      'Gestión de bajas de trabajadores y cálculo de beneficios sociales (vacaciones, CTS, gratificaciones).',
      'Manejo de documentación laboral y cumplimiento normativo.'
    ],
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3'
  },
  {
    id: 'niif',
    title: 'Implementación NIIF',
    description: 'Implementación de NIIF plenas y NIIF para PYMES con cumplimiento tributario bajo las normativas peruanas.',
    icon: FileSpreadsheet,
    details: [
      'Implementación de NIIF plenas y NIIF para PYMES.',
      'Cumplimiento tributario bajo las normativas peruanas.',
      'Adaptación de sistemas contables a estándares internacionales.',
      'Capacitación al personal en normativas NIIF.'
    ],
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3'
  },
  {
    id: 'precios',
    title: 'Precios de Transferencia',
    description: 'Elaboración del estudio de precios de transferencia, documentación y reportes País por País para SUNAT.',
    icon: BarChart4,
    details: [
      'Elaboración del estudio de precios de transferencia y documentación relacionada.',
      'Elaboración de Reportes País por País.',
      'Presentación de Declaraciones Juradas Informativas a SUNAT.',
      'Asesoría especializada en transacciones entre empresas vinculadas.'
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3'
  },
  {
    id: 'auditoria',
    title: 'Auditoría de Sistemas',
    description: 'Evaluación de sistemas informáticos, controles y aspectos de seguridad de hardware, software y administración de datos.',
    icon: Shield,
    details: [
      'Evaluación del ambiente de los sistemas de información computarizada, los controles generales y los controles en las aplicaciones.',
      'Evaluación de los aspectos de seguridad física del hardware, software y administración de datos.',
      'Asesoría para prevenir las contingencias derivadas de los softwares (cumplimiento BSA).',
      'Optimización de arquitectura de sistemas para mayor eficiencia operativa.'
    ],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3'
  },
  {
    id: 'auditoria-financiera',
    title: 'Auditoría Financiera y Tributaria',
    description: 'Expertos en Tributación y Finanzas, defensa ante la SUNAT y asesoramiento para la eliminación de multas.',
    icon: Search,
    details: [
      'Expertos en Tributación y Finanzas.',
      'Defensa ante la SUNAT.',
      'Asesoramiento para la eliminación de multas bajo el Decreto Legislativo 1634.',
      'Diagnóstico integral de la situación financiera y tributaria de su empresa.',
      'Planificación fiscal estratégica para optimizar la carga tributaria.'
    ],
    image: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?ixlib=rb-4.0.3'
  },
  {
    id: 'consultoria',
    title: 'Asesoría Empresarial',
    description: 'Asistencia en planeamiento, organización y control de actividades para garantizar eficiencia y economía operativa.',
    icon: Lightbulb,
    details: [
      'Asistencia en el planeamiento, organización y control de actividades para garantizar la eficiencia y economía operativa.',
      'Asesoría para la adquisición de sistemas de información computarizada.',
      'Consultoría estratégica para la toma de decisiones empresariales.',
      'Desarrollo de planes de negocio y proyecciones financieras.',
      'Optimización de procesos y reducción de costos operativos.'
    ],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3'
  },
];
