
import { useEffect, useRef } from 'react';
import { 
  BarChart3, 
  Building, 
  Calculator, 
  ClipboardList,
  FileSpreadsheet, 
  BarChart4, 
  Shield, 
  Lightbulb 
} from 'lucide-react';

const servicesData = [
  {
    id: 'reestructuracion',
    title: 'Reestructuración Financiera',
    description: 'Asistencia en procesos de reestructuración empresarial y determinación de viabilidad comercial y operacional.',
    icon: BarChart3,
  },
  {
    id: 'outsourcing',
    title: 'Outsourcing Administrativo',
    description: 'Soporte administrativo para tesorería, logística, importaciones y análisis de cuentas.',
    icon: Building,
  },
  {
    id: 'tributario',
    title: 'Outsourcing Tributario',
    description: 'Declaraciones juradas, reclamaciones, descargos y solicitudes a SUNAT con normativas NIIF.',
    icon: Calculator,
  },
  {
    id: 'planillas',
    title: 'Outsourcing de Planillas',
    description: 'Cálculo de planillas, aportes mensuales y gestión de beneficios sociales.',
    icon: ClipboardList,
  },
  {
    id: 'niif',
    title: 'Implementación NIIF',
    description: 'Implementación de NIIF plenas y NIIF para PYMES con cumplimiento tributario peruano.',
    icon: FileSpreadsheet,
  },
  {
    id: 'precios',
    title: 'Precios de Transferencia',
    description: 'Elaboración de estudios de precios de transferencia y reportes País por País para SUNAT.',
    icon: BarChart4,
  },
  {
    id: 'auditoria',
    title: 'Auditoría de Sistemas',
    description: 'Evaluación de sistemas informáticos, controles y aspectos de seguridad de hardware y software.',
    icon: Shield,
  },
  {
    id: 'consultoria',
    title: 'Asesoría Empresarial',
    description: 'Planeamiento, organización y control de actividades para garantizar eficiencia operativa.',
    icon: Lightbulb,
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {servicesData.map((service, index) => (
            <div 
              key={service.id}
              id={service.id}
              className="service-card opacity-0 animate-on-scroll"
              ref={(el) => cardRefs.current[index + 1] = el}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-cuenca-blue/10 text-cuenca-blue mb-4">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
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
