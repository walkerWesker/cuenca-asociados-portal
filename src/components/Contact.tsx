
import { useRef, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm, ContactFormValues } from './ContactForm';
import { ContactInfo } from './ContactInfo';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    contentRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      contentRefs.current.forEach((ref) => {
        if (ref) observer.disconnect();
      });
    };
  }, []);
  
  const handleSubmit = (values: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', values);
      setIsSubmitting(false);
      
      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos. Nos comunicaremos con usted a la brevedad.",
        duration: 5000,
      });
      
    }, 1500);
  };
  
  return (
    <section 
      id="contacto" 
      className="py-20 bg-gradient-to-b from-gray-50 to-white" 
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div 
          className="text-center mb-16 opacity-0 animate-on-scroll" 
          ref={(el) => contentRefs.current[0] = el}
        >
          <span className="text-sm uppercase tracking-wider text-cuenca-blue font-medium relative inline-block">
            Contáctanos
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-cuenca-blue/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 bg-clip-text bg-gradient-to-r from-cuenca-blue to-cuenca-blue/80 text-transparent">
            ¿Cómo Podemos Ayudarte?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 animate-fade-in">
            Estamos listos para atender tus consultas y ofrecerte los mejores servicios profesionales para tu empresa.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div 
            className="opacity-0 animate-on-scroll order-2 lg:order-1" 
            ref={(el) => contentRefs.current[1] = el}
          >
            <ContactInfo />
          </div>
          
          <div 
            className="opacity-0 animate-on-scroll order-1 lg:order-2" 
            ref={(el) => contentRefs.current[2] = el}
          >
            <Card className="hover:shadow-xl transition-all duration-500 border-none shadow-lg overflow-hidden bg-white rounded-xl">
              <CardHeader className="pb-2 bg-gradient-to-r from-cuenca-blue to-cuenca-blue/90 text-white">
                <CardTitle className="text-2xl font-bold relative inline-block">
                  Envíanos un Mensaje
                  <span className="absolute -bottom-2 left-0 w-12 h-1 bg-cuenca-gold rounded-full transform scale-x-0 animate-scale-in-left"></span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ContactForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
