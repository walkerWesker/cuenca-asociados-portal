
import { Mail, Phone, MapPin, Globe, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactInfo() {
  return (
    <Card className="bg-cuenca-blue text-white h-full hover:shadow-xl transition-all duration-300 border-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold relative inline-block">
          Información de Contacto
          <span className="absolute -bottom-2 left-0 w-16 h-1 bg-white/60 rounded-full animate-scale-up opacity-0"></span>
        </CardTitle>
        <CardDescription className="text-white/80">
          Estamos disponibles para atender tus consultas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-start transform transition-all duration-300 hover:translate-x-2 group">
            <div className="p-2 bg-white/10 rounded-full mr-4 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-medium">Correo Electrónico</h4>
              <a 
                href="mailto:cpc_ricbrad@hotmail.com" 
                className="block hover:underline mt-1 transition-all duration-300 hover:text-white/80"
              >
                cpc_ricbrad@hotmail.com
              </a>
              <a 
                href="mailto:rcuenca@consultoracuenca.com" 
                className="block hover:underline mt-1 transition-all duration-300 hover:text-white/80"
              >
                rcuenca@consultoracuenca.com
              </a>
            </div>
          </div>
          
          <div className="flex items-start transform transition-all duration-300 hover:translate-x-2 group">
            <div className="p-2 bg-white/10 rounded-full mr-4 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-medium">Teléfono</h4>
              <a 
                href="https://wa.me/51992854449" 
                className="block hover:underline mt-1 transition-all duration-300 hover:text-white/80 flex items-center" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <span className="mr-1">WhatsApp:</span> +51 992 854 449
              </a>
            </div>
          </div>
          
          <div className="flex items-start transform transition-all duration-300 hover:translate-x-2 group">
            <div className="p-2 bg-white/10 rounded-full mr-4 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-medium">Sitio Web</h4>
              <a 
                href="https://www.consultoracuenca.com" 
                className="block hover:underline mt-1 transition-all duration-300 hover:text-white/80" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                www.consultoracuenca.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center mb-4">
            <Clock className="h-5 w-5 mr-2" />
            <h4 className="font-medium relative inline-block">
              Horario de Atención
              <span className="absolute -bottom-1 left-0 w-12 h-[2px] bg-white/60 rounded-full"></span>
            </h4>
          </div>
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
      </CardContent>
    </Card>
  );
}
