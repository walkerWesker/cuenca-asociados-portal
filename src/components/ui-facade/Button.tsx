
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
  onClick?: () => void;
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
          variant === 'icon' && "h-10 w-10",
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

export { type ButtonProps };
