
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
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 150); // Staggered appearance
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
          <span className="text-sm uppercase tracking-wider text-cuenca-blue font-medium relative inline-block">
            Contáctanos
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-cuenca-blue/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left animate-scale-in-left"></span>
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 animate-slide-in-right">
            ¿Cómo Podemos Ayudarte?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 animate-fade-in">
            Estamos listos para atender tus consultas y ofrecerte los mejores servicios profesionales para tu empresa.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="opacity-0 animate-on-scroll" ref={(el) => contentRefs.current[1] = el}>
            <div className="bg-white p-8 rounded-xl shadow-md h-full hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold mb-6 relative inline-block">
                Envíanos un Mensaje
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-cuenca-gold rounded-full transform scale-x-0 animate-scale-in-left"></span>
              </h3>
              
              <form onSubmit={handleSubmit} className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cuenca-blue focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cuenca-blue focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cuenca-blue focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  
                  <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Asunto
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cuenca-blue focus:border-transparent transition-all duration-300"
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
                
                <div className="mb-6 transform transition-all duration-300 hover:translate-y-[-2px]">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cuenca-blue focus:border-transparent transition-all duration-300"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center justify-center w-full bg-cuenca-blue text-white px-6 py-3 rounded-md transition-all duration-300 transform hover:scale-[1.02] ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90 hover:shadow-lg'
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
                    <span className="flex items-center group">
                      <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      Enviar Mensaje
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          <div className="opacity-0 animate-on-scroll" ref={(el) => contentRefs.current[2] = el}>
            <div className="bg-cuenca-blue text-white p-8 rounded-xl shadow-md h-full hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold mb-6 relative inline-block">
                Información de Contacto
                <span className="absolute -bottom-2 left-0 w-16 h-1 bg-white/60 rounded-full transform scale-x-0 animate-scale-in-left"></span>
              </h3>
              
              <div className="space-y-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                  <div className="p-2 bg-white/10 rounded-full mr-4 transition-all duration-300 hover:bg-white/20 hover:scale-110">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium">Correo Electrónico</h4>
                    <a href="mailto:cpc_ricbrad@hotmail.com" className="block hover:underline mt-1 transition-all duration-300 hover:text-white/80">cpc_ricbrad@hotmail.com</a>
                    <a href="mailto:rcuenca@consultoracuenca.com" className="block hover:underline mt-1 transition-all duration-300 hover:text-white/80">rcuenca@consultoracuenca.com</a>
                  </div>
                </div>
                
                <div className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                  <div className="p-2 bg-white/10 rounded-full mr-4 transition-all duration-300 hover:bg-white/20 hover:scale-110">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium">Teléfono</h4>
                    <a href="https://wa.me/51992854449" className="block hover:underline mt-1 transition-all duration-300 hover:text-white/80 flex items-center" target="_blank" rel="noopener noreferrer">
                      <span className="mr-1">WhatsApp:</span> +51 992 854 449
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                  <div className="p-2 bg-white/10 rounded-full mr-4 transition-all duration-300 hover:bg-white/20 hover:scale-110">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium">Sitio Web</h4>
                    <a href="https://www.consultoracuenca.com" className="block hover:underline mt-1 transition-all duration-300 hover:text-white/80" target="_blank" rel="noopener noreferrer">www.consultoracuenca.com</a>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 animate-fade-in" style={{ animationDelay: '400ms' }}>
                <h4 className="font-medium mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-12 after:h-[2px] after:bg-white/60 after:rounded-full">Horario de Atención</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 rounded-md transition-all duration-300 hover:bg-white/5">
                    <span>Lunes a Viernes</span>
                    <span className="font-medium">8:30 AM - 6:30 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-md transition-all duration-300 hover:bg-white/5">
                    <span>Sábados</span>
                    <span className="font-medium">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-md transition-all duration-300 hover:bg-white/5">
                    <span>Domingos</span>
                    <span className="font-medium">Cerrado</span>
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
