
/**
 * Facade del componente Dialog
 * Abstrae la implementación de shadcn/ui Dialog proporcionando una API unificada
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogFacadeProps } from '../types';

/**
 * Componente Dialog de la UI Facade
 * Proporciona una interfaz consistente independiente de la librería subyacente
 */
export const DialogFacade = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  trigger,
}: DialogFacadeProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      )}
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        
        {children}
      </DialogContent>
    </Dialog>
  );
};
