
/**
 * Facade del componente Input
 * Abstrae la implementación específica de shadcn/ui proporcionando una interfaz unificada
 */
import React from 'react';
import { Input as ShadcnInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputProps } from '../types';
import { cn } from '@/lib/utils';

/**
 * Interfaz extendida para Input con funcionalidades adicionales
 */
interface ExtendedInputProps extends InputProps {
  label?: string;
  helperText?: string;
  error?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

/**
 * Componente Input con patrón Facade
 * Proporciona una interfaz simplificada para campos de entrada
 * 
 * @param props - Propiedades del input según ExtendedInputProps
 * @returns Componente Input renderizado
 */
export const Input: React.FC<ExtendedInputProps> = ({
  label,
  helperText,
  error,
  startAdornment,
  endAdornment,
  className,
  disabled = false,
  required = false,
  ...inputProps
}) => {
  // ID único para asociar label e input
  const inputId = React.useId();
  
  // Clases condicionales
  const inputClasses = cn(
    error && 'border-destructive focus-visible:ring-destructive',
    startAdornment && 'pl-10',
    endAdornment && 'pr-10',
    className
  );

  return (
    <div className="space-y-2">
      {/* Label del input */}
      {label && (
        <Label 
          htmlFor={inputId}
          className={cn(
            required && "after:content-['*'] after:ml-0.5 after:text-destructive",
            error && 'text-destructive'
          )}
        >
          {label}
        </Label>
      )}
      
      {/* Contenedor del input con adornments */}
      <div className="relative">
        {/* Adornment de inicio */}
        {startAdornment && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {startAdornment}
          </div>
        )}
        
        {/* Input principal */}
        <ShadcnInput
          id={inputId}
          disabled={disabled}
          required={required}
          className={inputClasses}
          {...inputProps}
        />
        
        {/* Adornment de final */}
        {endAdornment && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {endAdornment}
          </div>
        )}
      </div>
      
      {/* Texto de ayuda o error */}
      {(helperText || error) && (
        <p className={cn(
          'text-sm',
          error ? 'text-destructive' : 'text-muted-foreground'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

Input.displayName = 'UIFacade.Input';
