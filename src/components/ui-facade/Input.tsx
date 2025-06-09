
import React from 'react';
import { Input as NextUIInput } from '@nextui-org/react';
import { cn } from '@/lib/utils';

/**
 * Facade Pattern para Input - Unifica la interfaz de NextUI Input
 * Mantiene compatibilidad con la API anterior
 */

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'defaultValue' | 'color'> {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  label?: string;
  description?: string;
  errorMessage?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text', 
    size = 'md',
    variant = 'bordered',
    color = 'default',
    label,
    description,
    errorMessage,
    defaultValue,
    // Filter out props that shouldn't be passed to NextUI
    children,
    onClick,
    onMouseDown,
    onMouseUp,
    onFocus,
    onBlur,
    ...props 
  }, ref) => {
    return (
      <NextUIInput
        ref={ref}
        type={type}
        size={size}
        variant={variant}
        color={color}
        label={label}
        description={description}
        errorMessage={errorMessage}
        defaultValue={defaultValue}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { type InputProps };
