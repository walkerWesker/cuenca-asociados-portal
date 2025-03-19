
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre es requerido" }),
  email: z.string().email({ message: "Ingrese un correo electrónico válido" }),
  phone: z.string().optional(),
  subject: z.string().min(1, { message: "Seleccione un asunto" }),
  message: z.string().min(5, { message: "El mensaje es muy corto" }),
});

export type ContactFormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  onSubmit: (values: ContactFormValues) => void;
  isSubmitting: boolean;
}

export function ContactForm({ onSubmit, isSubmitting }: ContactFormProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="group transition-all duration-300 hover:-translate-y-[2px]">
                <FormLabel>Nombre Completo</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ingrese su nombre" 
                    {...field} 
                    className="transition-shadow duration-300 hover:shadow-md focus:shadow-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="group transition-all duration-300 hover:-translate-y-[2px]">
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="ejemplo@correo.com" 
                    type="email" 
                    {...field}
                    className="transition-shadow duration-300 hover:shadow-md focus:shadow-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="group transition-all duration-300 hover:-translate-y-[2px]">
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="(Opcional)" 
                    type="tel" 
                    {...field}
                    className="transition-shadow duration-300 hover:shadow-md focus:shadow-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="group transition-all duration-300 hover:-translate-y-[2px]">
                <FormLabel>Asunto</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="transition-shadow duration-300 hover:shadow-md focus:shadow-md">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="reestructuracion">Reestructuración Financiera</SelectItem>
                    <SelectItem value="outsourcing">Outsourcing Administrativo</SelectItem>
                    <SelectItem value="tributario">Outsourcing Tributario</SelectItem>
                    <SelectItem value="planillas">Outsourcing de Planillas</SelectItem>
                    <SelectItem value="niif">Implementación NIIF</SelectItem>
                    <SelectItem value="precios">Precios de Transferencia</SelectItem>
                    <SelectItem value="auditoria">Auditoría de Sistemas</SelectItem>
                    <SelectItem value="consultoria">Asesoría Empresarial</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="group transition-all duration-300 hover:-translate-y-[2px]">
              <FormLabel>Mensaje</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Cuéntanos cómo podemos ayudarte" 
                  className="min-h-[120px] transition-shadow duration-300 hover:shadow-md focus:shadow-md"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-cuenca-blue hover:bg-cuenca-blue/90 transition-all duration-300 transform hover:scale-[1.02] group"
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
              <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
              Enviar Mensaje
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
}
