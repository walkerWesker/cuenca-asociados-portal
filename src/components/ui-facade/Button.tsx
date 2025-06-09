
import React from 'react';
import { Button as NextUIButton } from '@nextui-org/react';
import { cn } from '@/lib/utils';

/**
 * Facade Pattern para Button - Unifica la interfaz de NextUI Button
 * Proporciona una API consistente independiente de la librería subyacente
 */

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  onClick?: (e?: any) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  asChild?: boolean;
}

// Mapeo de variantes a NextUI
const variantMap = {
  default: 'solid',
  destructive: 'solid',
  outline: 'bordered',
  secondary: 'flat',
  ghost: 'light',
  link: 'light'
} as const;

// Mapeo de colores basado en variante
const colorMap = {
  default: 'primary',
  destructive: 'danger',
  outline: 'primary',
  secondary: 'default',
  ghost: 'default',
  link: 'primary'
} as const;

// Mapeo de tamaños
const sizeMap = {
  default: 'md',
  sm: 'sm',
  lg: 'lg',
  icon: 'sm'
} as const;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'default', 
    size = 'default', 
    className, 
    onClick,
    disabled = false,
    type = 'button',
    asChild = false,
    ...props 
  }, ref) => {
    
    // Si asChild es true, renderizar como slot (para compatibilidad)
    if (asChild) {
      return (
        <span className={cn("inline-flex", className)} {...props}>
          {children}
        </span>
      );
    }

    return (
      <NextUIButton
        ref={ref}
        variant={variantMap[variant] as any}
        color={colorMap[variant] as any}
        size={sizeMap[size] as any}
        onPress={onClick}
        isDisabled={disabled}
        type={type}
        className={cn(
          // Estilos base para consistencia
          "font-medium transition-colors",
          // Estilos específicos por variante
          variant === 'link' && "underline-offset-4 hover:underline",
          size === 'icon' && "h-10 w-10",
          className
        )}
        {...props}
      >
        {children}
      </NextUIButton>
    );
  }
);

Button.displayName = "Button";

// Export buttonVariants for compatibility
export const buttonVariants = (props?: { variant?: string; size?: string }) => {
  return cn(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    props?.variant === 'default' && "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    props?.variant === 'destructive' && "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    props?.variant === 'outline' && "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    props?.variant === 'secondary' && "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
    props?.variant === 'ghost' && "hover:bg-accent hover:text-accent-foreground",
    props?.variant === 'link' && "text-primary underline-offset-4 hover:underline",
    props?.size === 'default' && "h-9 px-4 py-2",
    props?.size === 'sm' && "h-8 rounded-md px-3 text-xs",
    props?.size === 'lg' && "h-10 rounded-md px-8",
    props?.size === 'icon' && "h-9 w-9"
  );
};

export { type ButtonProps };
