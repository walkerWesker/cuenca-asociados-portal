
import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
    
    const contentObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { ...observerOptions, threshold: 0.2 });
    
    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }
    
    contentRefs.current.forEach((content) => {
      if (content) {
        contentObserver.observe(content);
      }
    });
    
    return () => {
      sectionObserver.disconnect();
      contentObserver.disconnect();
    };
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      alert('Gracias por contactarnos. Nos comunicaremos con usted a la brevedad.');
    }, 1500);
  };
  
  return (
    <section id="contacto" className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto">
        <div className="text-center mb-16 opacity-0 animate-on-scroll" ref={(el) => contentRefs.current[0] = el}>
          <span className="text-sm uppercase tracking-wider text-cuenca-blue font-medium">
            Contáctanos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            ¿Cómo Podemos Ayudarte?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Estamos listos para atender tus consultas y ofrecerte los mejores servicios profesionales para tu empresa.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="opacity-0 animate-on-scroll" ref={(el) => contentRefs.current[1] = el}>
            <div className="bg-white p-8 rounded-xl shadow-md h-full">
              <h3 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cuenca-blue"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cuenca-blue"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cuenca-blue"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Asunto
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cuenca-blue"
                      required
                    >
                      <option value="">Seleccionar</option>
                      <option value="reestructuracion">Reestructuración Financiera</option>
                      <option value="outsourcing">Outsourcing Administrativo</option>
                      <option value="tributario">Outsourcing Tributario</option>
                      <option value="planillas">Outsourcing de Planillas</option>
                      <option value="niif">Implementación NIIF</option>
                      <option value="precios">Precios de Transferencia</option>
                      <option value="auditoria">Auditoría de Sistemas</option>
                      <option value="consultoria">Asesoría Empresarial</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cuenca-blue"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center justify-center w-full bg-cuenca-blue text-white px-6 py-3 rounded-md transition-all duration-300 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Mensaje
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          <div className="opacity-0 animate-on-scroll" ref={(el) => contentRefs.current[2] = el}>
            <div className="bg-cuenca-blue text-white p-8 rounded-xl shadow-md h-full">
              <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-2 bg-white/10 rounded-full mr-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium">Correo Electrónico</h4>
                    <a href="mailto:gerencia@consultoracuenca.com" className="block hover:underline mt-1">gerencia@consultoracuenca.com</a>
                    <a href="mailto:rcuenca@consultoracuenca.com" className="block hover:underline mt-1">rcuenca@consultoracuenca.com</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-white/10 rounded-full mr-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium">Teléfono</h4>
                    <a href="https://wa.me/51992854449" className="block hover:underline mt-1" target="_blank" rel="noopener noreferrer">WhatsApp: +51 992 854 449</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-white/10 rounded-full mr-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium">Sitio Web</h4>
                    <a href="https://www.consultoracuenca.com" className="block hover:underline mt-1" target="_blank" rel="noopener noreferrer">www.consultoracuenca.com</a>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="font-medium mb-4">Horario de Atención</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Lunes a Viernes</span>
                    <span>8:30 AM - 6:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábados</span>
                    <span>9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingos</span>
                    <span>Cerrado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
