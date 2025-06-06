
import { useEffect, useMemo, useCallback, useState } from 'react';
import React from 'react';
import { Check, MessageSquare, Building2, Trophy, Users, LucideProps } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, Variants } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Definición de la interfaz para las características
interface Feature {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  title: string;
  description: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
  variants: Variants;
}

// Componente memoizado para las tarjetas de características con tipado
const FeatureCard: React.FC<FeatureCardProps> = React.memo(({ feature, index, variants }) => (
  <motion.div
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={variants}
    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
  >
    <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white overflow-hidden group">
      <CardContent className="p-4 flex items-start space-x-3">
        <div className="flex-shrink-0 p-2 bg-cuenca-blue/10 rounded-full text-cuenca-blue group-hover:bg-cuenca-blue group-hover:text-white transition-all duration-300">
          <feature.icon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-medium mb-1 group-hover:text-cuenca-blue transition-colors duration-300">
            {feature.title}
          </h4>
          <p className="text-gray-600 text-sm">
            {feature.description}
          </p>
        </div>
      </CardContent>
      <div className="absolute inset-0 bg-gradient-to-r from-cuenca-blue/0 via-cuenca-blue/0 to-cuenca-blue/0 group-hover:from-cuenca-blue/5 group-hover:to-cuenca-blue/0 transition-all duration-500"></div>
    </Card>
  </motion.div>
));

const FEATURES: Feature[] = [
  { icon: Trophy, title: "Experiencia y Profesionalismo", description: "Equipo altamente calificado con amplia experiencia en el sector." },
  { icon: Users, title: "Atención Personalizada", description: "Soluciones adaptadas a las necesidades específicas de cada cliente." },
  { icon: Building2, title: "Orientación al Resultado", description: "Comprometidos con alcanzar los objetivos de nuestros clientes." },
  { icon: Check, title: "Actualización Constante", description: "Al día con las últimas normativas y tendencias del sector." }
];

const About = () => {
  const [activeTab, setActiveTab] = useState('vision');

  // WhatsApp: cálculo memorizado para evitar recomputaciones
  const whatsappLink = useMemo(() => {
    const whatsappMessage = encodeURIComponent("¡Hola! Me gustaría recibir información detallada sobre los servicios que ofrecen.  ¿Podrían ayudarme? ¡Gracias!");
    const whatsappNumber = "51992854449";
    return `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  }, []);

  // Función de scroll memorizada para evitar recreación en cada render
  const handleScroll = useCallback(() => {
    AOS.refresh();
  }, []);

  // Inicialización de AOS y gestión correcta del listener de scroll
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    });
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Variantes de animación memoizadas
  const cardVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }), []);

  // Definición de las pestañas mediante useMemo para mayor legibilidad
  const tabs = useMemo(() => ([
    { value: 'vision', label: 'Visión', content: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-medium text-cuenca-blue">Nuestra Visión</h3>
        <p className="text-gray-600">
          Ser reconocidos como la firma líder en servicios de auditoría y consultoría en Perú, distinguiéndonos por nuestra excelencia, integridad y compromiso con nuestros clientes.
        </p>
      </motion.div>
    ) },
    { value: 'mision', label: 'Misión', content: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-medium text-cuenca-blue">Nuestra Misión</h3>
        <p className="text-gray-600">
          Brindar servicios profesionales de alta calidad que generen valor para nuestros clientes, ayudándoles a alcanzar sus objetivos empresariales a través de soluciones personalizadas.
        </p>
      </motion.div>
    ) },
    { value: 'valores', label: 'Valores', content: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-medium text-cuenca-blue">Nuestros Valores</h3>
        <p className="text-gray-600">
          Integridad, excelencia, responsabilidad, confidencialidad y trabajo en equipo son los pilares que guían nuestro trabajo diario y compromiso con cada cliente.
        </p>
      </motion.div>
    ) }
  ]), []);

  return (
    <section id="nosotros" className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10" data-aos="fade-up">
          <Badge variant="outline" className="mb-2 bg-cuenca-blue/10 text-cuenca-blue hover:bg-cuenca-blue/20 border-none">
            Sobre Nosotros
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Cuenca & Asociados</h2>
          <Separator className="w-24 h-1 mx-auto bg-cuenca-gold mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Somos una sociedad de auditoría financiera, contable y tributaria con amplia experiencia en servicios profesionales para empresas de todos los sectores.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
            data-aos="fade-right"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <AspectRatio ratio={16/9} className="bg-muted">
                <motion.div 
                  className="absolute inset-0 bg-cuenca-blue/10 rounded-2xl"
                  animate={{ 
                    x: [4, 8, 4], 
                    y: [4, 8, 4],
                    transition: { 
                      duration: 8, 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }
                  }}
                />
                <div className="relative z-10 w-full h-full overflow-hidden rounded-xl">
                  <motion.img 
                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                    alt="Equipo de Cuenca & Asociados" 
                    className="object-cover w-full h-full transition-transform duration-10000 hover:scale-110"
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </AspectRatio>
            </div>
          </motion.div>
          
          <div className="space-y-6" data-aos="fade-left" data-aos-delay="200">
            <Tabs 
              defaultValue="vision" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 mb-6">
                {tabs.map(({ value, label }) => (
                  <TabsTrigger 
                    key={value}
                    value={value}
                    className="relative overflow-hidden group"
                  >
                    <span className="relative z-10">{label}</span>
                    {activeTab === value && (
                      <motion.div 
                        className="absolute bottom-0 left-0 h-full bg-cuenca-blue/10 w-full" 
                        layoutId="activeTab"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tabs.map(({ value, content }) => (
                <TabsContent key={value} value={value} className="space-y-4">
                  {content}
                </TabsContent>
              ))}
            </Tabs>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="text-xl font-medium text-cuenca-blue mt-4">Qué nos distingue</h3>
            </motion.div>
            
            <div className="grid gap-4 md:grid-cols-2">
              {FEATURES.map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} index={index} variants={cardVariants} />
              ))}
            </div>
            
            <motion.div 
              className="flex flex-wrap gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button 
                asChild
                className="bg-cuenca-blue hover:bg-opacity-90 text-white rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group"
              >
                <a href="#contacto">
                  <span className="relative z-10">Contáctanos</span>
                  <span className="absolute inset-0 h-full w-0 bg-gradient-to-r from-cuenca-gold to-cuenca-gold/80 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                className="bg-white border-cuenca-blue text-cuenca-blue hover:bg-cuenca-blue/10 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="group">
                  <MessageSquare className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  WhatsApp
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
