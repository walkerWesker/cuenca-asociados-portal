
import { Mail, Phone, MapPin, Globe, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactInfo() {
  return (
    <Card className="bg-gradient-to-br from-cuenca-blue to-cuenca-blue/90 text-white h-full hover:shadow-2xl transition-all duration-500 rounded-xl border-none overflow-hidden shadow-lg">
      <CardHeader className="pb-2 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mt-16 -mr-16 blur-2xl"></div>
        <CardTitle className="text-2xl font-bold relative inline-block z-10">
          Información de Contacto
          <span className="absolute -bottom-2 left-0 w-16 h-1 bg-cuenca-gold rounded-full animate-pulse-subtle"></span>
        </CardTitle>
        <CardDescription className="text-white/90 z-10 relative">
          Estamos disponibles para atender tus consultas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 relative z-10">
        <div className="space-y-6">
          <div className="flex items-start transform transition-all duration-300 hover:translate-x-2 group cursor-pointer">
            <div className="p-3 bg-white/10 rounded-full mr-4 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 shadow-md">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-medium text-white">Correo Electrónico</h4>
              <a 
                href="mailto:cpc_ricbrad@hotmail.com" 
                className="block hover:underline mt-1 transition-all duration-300 hover:text-white text-white/80 flex items-center gap-1"
              >
                cpc_ricbrad@hotmail.com
                <ExternalLink className="h-3 w-3 inline-block opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a 
                href="mailto:rcuenca@consultoracuenca.com" 
                className="block hover:underline mt-1 transition-all duration-300 hover:text-white text-white/80 flex items-center gap-1"
              >
                rcuenca@consultoracuenca.com
                <ExternalLink className="h-3 w-3 inline-block opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
          
          <div className="flex items-start transform transition-all duration-300 hover:translate-x-2 group cursor-pointer">
            <div className="p-3 bg-white/10 rounded-full mr-4 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 shadow-md">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-medium text-white">Teléfono</h4>
              <a 
                href="https://wa.me/51992854449" 
                className="block hover:underline mt-1 transition-all duration-300 hover:text-white text-white/80 flex items-center gap-1" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <span>WhatsApp:</span> +51 992 854 449
                <ExternalLink className="h-3 w-3 inline-block opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
          
          <div className="flex items-start transform transition-all duration-300 hover:translate-x-2 group cursor-pointer">
            <div className="p-3 bg-white/10 rounded-full mr-4 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 shadow-md">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-medium text-white">Sitio Web</h4>
              <a 
                href="https://www.consultoracuenca.com" 
                className="block hover:underline mt-1 transition-all duration-300 hover:text-white text-white/80 flex items-center gap-1" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                www.consultoracuenca.com
                <ExternalLink className="h-3 w-3 inline-block opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-white/10 animate-fade-in">
          <div className="flex items-center mb-4">
            <Clock className="h-5 w-5 mr-2 text-cuenca-gold" />
            <h4 className="font-medium text-white relative inline-block">
              Horario de Atención
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-cuenca-gold/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 px-3 rounded-md backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-default">
              <span className="font-medium text-white/90">Lunes a Viernes</span>
              <span className="font-medium text-white bg-cuenca-gold/20 px-2 py-1 rounded text-sm">8:30 AM - 6:30 PM</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 rounded-md backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-default">
              <span className="font-medium text-white/90">Sábados</span>
              <span className="font-medium text-white bg-cuenca-gold/20 px-2 py-1 rounded text-sm">9:00 AM - 1:00 PM</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 rounded-md backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-default">
              <span className="font-medium text-white/90">Domingos</span>
              <span className="font-medium text-white bg-red-500/20 px-2 py-1 rounded text-sm">Cerrado</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-64 h-64 bg-cuenca-gold/10 rounded-full blur-3xl -mb-32 -mr-32 opacity-50 z-0"></div>
      </CardContent>
    </Card>
  );
}
