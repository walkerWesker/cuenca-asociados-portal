
/**
 * Facade Pattern Implementation - UI Components
 * 
 * Este archivo implementa el patrón Facade para crear una interfaz unificada
 * sobre diferentes librerías de UI (NextUI, HeadlessUI).
 * 
 * Beneficios del Facade Pattern:
 * - Simplifica el uso de componentes complejos
 * - Proporciona una API consistente
 * - Permite cambiar librerías subyacentes sin afectar el código cliente
 * - Reduce el acoplamiento entre componentes y librerías específicas
 */

// Componentes principales exportados con API unificada
export { Button, type ButtonProps } from './Button';
export { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter, 
  CardTitle, 
  CardDescription,
  type CardProps,
  type CardHeaderProps,
  type CardContentProps,
  type CardFooterProps,
  type CardTitleProps,
  type CardDescriptionProps
} from './Card';
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogPortal,
  DialogOverlay,
  type DialogProps,
  type DialogContentProps,
  type DialogHeaderProps,
  type DialogFooterProps,
  type DialogTitleProps,
  type DialogDescriptionProps,
  type DialogTriggerProps,
  type DialogCloseProps
} from './Dialog';
export { Input, type InputProps } from './Input';
export { Textarea, type TextareaProps } from './Textarea';
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps
} from './Tabs';
