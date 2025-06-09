
import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Facade Pattern para Dialog - Unifica la interfaz usando NextUI Modal
 * Mantiene compatibilidad con la API anterior de Radix Dialog
 */

interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface DialogCloseProps {
  children?: React.ReactNode;
  className?: string;
}

// Context para manejar el estado del Dialog
const DialogContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({
  open: false,
  onOpenChange: () => {}
});

export const Dialog: React.FC<DialogProps> = ({ children, open = false, onOpenChange = () => {} }) => {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

export const DialogTrigger: React.FC<DialogTriggerProps> = ({ children, asChild = false }) => {
  const { onOpenChange } = React.useContext(DialogContext);
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onPress: () => onOpenChange(true)
    } as any);
  }
  
  return (
    <button onClick={() => onOpenChange(true)}>
      {children}
    </button>
  );
};

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className, ...props }, ref) => {
    const { open, onOpenChange } = React.useContext(DialogContext);
    
    return (
      <Modal
        isOpen={open}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        className={cn("max-w-lg", className)}
        {...props}
      >
        <ModalContent>
          {children}
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </ModalContent>
      </Modal>
    );
  }
);

export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <ModalHeader
        className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
        {...props}
      >
        {children}
      </ModalHeader>
    );
  }
);

export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <ModalFooter
        className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
        {...props}
      >
        {children}
      </ModalFooter>
    );
  }
);

export const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn("text-lg font-semibold leading-none tracking-tight", className)}
        {...props}
      >
        {children}
      </h2>
    );
  }
);

export const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

export const DialogClose: React.FC<DialogCloseProps> = ({ children, className }) => {
  const { onOpenChange } = React.useContext(DialogContext);
  
  return (
    <button
      onClick={() => onOpenChange(false)}
      className={cn(
        "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className
      )}
    >
      {children}
    </button>
  );
};

// Exports para compatibilidad
export const DialogPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const DialogOverlay = ({ children }: { children: React.ReactNode }) => <>{children}</>;

Dialog.displayName = "Dialog";
DialogContent.displayName = "DialogContent";
DialogHeader.displayName = "DialogHeader";
DialogFooter.displayName = "DialogFooter";
DialogTitle.displayName = "DialogTitle";
DialogDescription.displayName = "DialogDescription";
DialogTrigger.displayName = "DialogTrigger";
DialogClose.displayName = "DialogClose";

export type { 
  DialogProps, 
  DialogContentProps, 
  DialogHeaderProps, 
  DialogFooterProps, 
  DialogTitleProps, 
  DialogDescriptionProps,
  DialogTriggerProps,
  DialogCloseProps 
};
