
import { useEffect, useRef } from 'react';
import { Check, MessageSquare, Building2, Trophy, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
  
  return (
    <section id="nosotros" className="py-20 bg-gradient-to-b from-white to-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
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
          <div className="opacity-0 animate-on-scroll" ref={(el) => contentRefs.current[0] = el}>
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <AspectRatio ratio={16/9} className="bg-muted">
                <div className="absolute inset-0 bg-cuenca-blue/10 translate-x-4 translate-y-4 transition-all duration-700 rounded-2xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                  alt="Equipo de Cuenca & Asociados" 
                  className="rounded-xl object-cover w-full h-full z-10 transition-transform duration-500 hover:scale-105"
                />
              </AspectRatio>
            </div>
          </div>
          
          <div className="opacity-0 animate-on-scroll space-y-6" ref={(el) => contentRefs.current[1] = el}>
            <Tabs defaultValue="vision" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="vision">Visión</TabsTrigger>
                <TabsTrigger value="mision">Misión</TabsTrigger>
                <TabsTrigger value="valores">Valores</TabsTrigger>
              </TabsList>
              <TabsContent value="vision" className="space-y-4">
                <h3 className="text-xl font-medium text-cuenca-blue">Nuestra Visión</h3>
                <p className="text-gray-600">
                  Ser reconocidos como la firma líder en servicios de auditoría y consultoría en Perú, distinguiéndonos por nuestra excelencia, integridad y compromiso con nuestros clientes.
                </p>
              </TabsContent>
              <TabsContent value="mision" className="space-y-4">
                <h3 className="text-xl font-medium text-cuenca-blue">Nuestra Misión</h3>
                <p className="text-gray-600">
                  Brindar servicios profesionales de alta calidad que generen valor para nuestros clientes, ayudándoles a alcanzar sus objetivos empresariales a través de soluciones personalizadas.
                </p>
              </TabsContent>
              <TabsContent value="valores" className="space-y-4">
                <h3 className="text-xl font-medium text-cuenca-blue">Nuestros Valores</h3>
                <p className="text-gray-600">
                  Integridad, excelencia, responsabilidad, confidencialidad y trabajo en equipo son los pilares que guían nuestro trabajo diario y compromiso con cada cliente.
                </p>
              </TabsContent>
            </Tabs>
            
            <h3 className="text-xl font-medium text-cuenca-blue mt-4">Qué nos distingue</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                <CardContent className="p-4 flex items-start space-x-3">
                  <div className="flex-shrink-0 p-2 bg-cuenca-blue/10 rounded-full text-cuenca-blue">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Experiencia y Profesionalismo</h4>
                    <p className="text-gray-600 text-sm">Equipo altamente calificado con amplia experiencia en el sector.</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                <CardContent className="p-4 flex items-start space-x-3">
                  <div className="flex-shrink-0 p-2 bg-cuenca-blue/10 rounded-full text-cuenca-blue">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Atención Personalizada</h4>
                    <p className="text-gray-600 text-sm">Soluciones adaptadas a las necesidades específicas de cada cliente.</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                <CardContent className="p-4 flex items-start space-x-3">
                  <div className="flex-shrink-0 p-2 bg-cuenca-blue/10 rounded-full text-cuenca-blue">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Orientación al Resultado</h4>
                    <p className="text-gray-600 text-sm">Comprometidos con alcanzar los objetivos de nuestros clientes.</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                <CardContent className="p-4 flex items-start space-x-3">
                  <div className="flex-shrink-0 p-2 bg-cuenca-blue/10 rounded-full text-cuenca-blue">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Actualización Constante</h4>
                    <p className="text-gray-600 text-sm">Al día con las últimas normativas y tendencias del sector.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-6">
              <Button 
                asChild
                className="bg-cuenca-blue hover:bg-opacity-90 text-white rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <a href="#contacto">Contáctanos</a>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                className="bg-white border-cuenca-blue text-cuenca-blue hover:bg-cuenca-blue/10 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <a href="https://wa.me/51999999999" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
