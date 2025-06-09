
/**
 * Facade del componente Dialog
 * Abstrae la implementación específica de shadcn/ui proporcionando una interfaz unificada
 */
import React from 'react';
import {
  Dialog as ShadcnDialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DialogProps } from '../types';
import { cn } from '@/lib/utils';

/**
 * Interfaz extendida para Dialog con funcionalidades adicionales
 */
interface ExtendedDialogProps extends DialogProps {
  trigger?: React.ReactNode;
  footer?: React.ReactNode;
  hideCloseButton?: boolean;
}

/**
 * Componente Dialog con patrón Facade
 * Proporciona una interfaz simplificada para modales y diálogos
 * 
 * @param props - Propiedades del dialog según ExtendedDialogProps
 * @returns Componente Dialog renderizado
 */
export const Dialog: React.FC<ExtendedDialogProps> = ({
  children,
  trigger,
  footer,
  open,
  onOpenChange,
  title,
  description,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  hideCloseButton = false,
  className,
  ...props
}) => {
  // Mapeo de tamaños a clases CSS
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-[95vw] max-h-[95vh]',
  };

  // Clases del contenido del dialog
  const contentClasses = cn(
    sizeClasses[size],
    size === 'full' && 'h-[95vh] overflow-auto',
    className
  );

  return (
    <ShadcnDialog 
      open={open} 
      onOpenChange={closeOnOverlayClick ? onOpenChange : undefined}
      {...props}
    >
      {/* Trigger opcional para abrir el dialog */}
      {trigger}
      
      <DialogContent 
        className={contentClasses}
        onEscapeKeyDown={closeOnEscape ? undefined : (e) => e.preventDefault()}
        onPointerDownOutside={closeOnOverlayClick ? undefined : (e) => e.preventDefault()}
      >
        {/* Header con título y descripción */}
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        
        {/* Contenido principal */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
        
        {/* Footer opcional */}
        {footer && (
          <DialogFooter>
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </ShadcnDialog>
  );
};

Dialog.displayName = 'UIFacade.Dialog';
