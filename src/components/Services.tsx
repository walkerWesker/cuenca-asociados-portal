
import { useEffect, useRef } from 'react';
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

const servicesData = [
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
      'Soporte administrativo para la ejecución de actividades como tesorería, logística, importaciones y análisis de cuentas.'
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
      'Gestión de bajas de trabajadores y cálculo de beneficios sociales (vacaciones, CTS, gratificaciones).'
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
      'Cumplimiento tributario bajo las normativas peruanas.'
    ],
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3'
  },
  {
    id: 'precios',
    title: 'Precios de Transferencia',
    description: 'Elaboración del estudio de precios de transferencia, documentación y reportes País por País para SUNAT.',
    icon: BarChart4,
    details: [
      'Elaboración del estudio de precios de transferencia y documentación relacionada.',
      'Elaboración de Reportes País por País.',
      'Presentación de Declaraciones Juradas Informativas a SUNAT.'
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
      'Asesoría para prevenir las contingencias derivadas de los softwares (cumplimiento BSA).'
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
      'Asesoramiento para la eliminación de multas bajo el Decreto Legislativo 1634.'
    ],
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3'
  },
  {
    id: 'consultoria',
    title: 'Asesoría Empresarial',
    description: 'Asistencia en planeamiento, organización y control de actividades para garantizar eficiencia y economía operativa.',
    icon: Lightbulb,
    details: [
      'Asistencia en el planeamiento, organización y control de actividades para garantizar la eficiencia y economía operativa.',
      'Asesoría para la adquisición de sistemas de información computarizada.'
    ],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3'
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);
    
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { ...observerOptions, threshold: 0.2 });
    
    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }
    
    cardRefs.current.forEach((card) => {
      if (card) {
        cardObserver.observe(card);
      }
    });
    
    return () => {
      sectionObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);
  
  return (
    <section id="servicios" className="py-20 bg-cuenca-light" ref={sectionRef}>
      <div className="container mx-auto">
        <div className="text-center mb-16 opacity-0 animate-on-scroll" ref={(el) => cardRefs.current[0] = el}>
          <span className="text-sm uppercase tracking-wider text-cuenca-blue font-medium">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Servicios Profesionales
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Ofrecemos una amplia gama de servicios para ayudar a su empresa a crecer y optimizar sus operaciones financieras, contables y tributarias.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div 
              key={service.id}
              id={service.id}
              className="service-card opacity-0 animate-on-scroll flex flex-col h-full"
              ref={(el) => cardRefs.current[index + 1] = el}
            >
              <div className="relative h-44 mb-4 rounded-t-xl overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-3 left-4 flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cuenca-blue text-white mr-3">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{service.title}</h3>
                </div>
              </div>
              
              <div className="p-5 flex-grow">
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-cuenca-blue mr-2">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center opacity-0 animate-on-scroll" ref={(el) => cardRefs.current[servicesData.length + 1] = el}>
          <a 
            href="#contacto" 
            className="inline-flex items-center bg-cuenca-blue hover:bg-opacity-90 text-white px-6 py-3 rounded-md transition-all duration-300"
          >
            Consulta Nuestros Servicios
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
