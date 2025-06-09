
/**
 * Facade del componente Textarea
 * Abstrae la implementación específica de shadcn/ui proporcionando una interfaz unificada
 */
import React from 'react';
import { Textarea as ShadcnTextarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BaseComponentProps, InteractiveComponentProps } from '../types';
import { cn } from '@/lib/utils';

/**
 * Props específicos para Textarea
 */
interface TextareaProps extends InteractiveComponentProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  autoFocus?: boolean;
  rows?: number;
  cols?: number;
  maxLength?: number;
  minLength?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

/**
 * Interfaz extendida para Textarea con funcionalidades adicionales
 */
interface ExtendedTextareaProps extends TextareaProps {
  label?: string;
  helperText?: string;
  error?: string;
  showCharacterCount?: boolean;
}

/**
 * Componente Textarea con patrón Facade
 * Proporciona una interfaz simplificada para áreas de texto
 * 
 * @param props - Propiedades del textarea según ExtendedTextareaProps
 * @returns Componente Textarea renderizado
 */
export const Textarea: React.FC<ExtendedTextareaProps> = ({
  label,
  helperText,
  error,
  showCharacterCount = false,
  className,
  disabled = false,
  required = false,
  resize = 'vertical',
  value,
  maxLength,
  ...textareaProps
}) => {
  // ID único para asociar label y textarea
  const textareaId = React.useId();
  
  // Cálculo del conteo de caracteres
  const characterCount = value?.length || 0;
  const isOverLimit = maxLength && characterCount > maxLength;
  
  // Clases condicionales
  const textareaClasses = cn(
    error && 'border-destructive focus-visible:ring-destructive',
    // Clases de resize
    resize === 'none' && 'resize-none',
    resize === 'horizontal' && 'resize-x',
    resize === 'vertical' && 'resize-y',
    resize === 'both' && 'resize',
    className
  );

  return (
    <div className="space-y-2">
      {/* Label del textarea */}
      {label && (
        <Label 
          htmlFor={textareaId}
          className={cn(
            required && "after:content-['*'] after:ml-0.5 after:text-destructive",
            error && 'text-destructive'
          )}
        >
          {label}
        </Label>
      )}
      
      {/* Textarea principal */}
      <ShadcnTextarea
        id={textareaId}
        disabled={disabled}
        required={required}
        className={textareaClasses}
        value={value}
        maxLength={maxLength}
        {...textareaProps}
      />
      
      {/* Información adicional: contador de caracteres, ayuda o error */}
      <div className="flex justify-between items-start gap-2">
        {/* Texto de ayuda o error */}
        <div className="flex-1">
          {(helperText || error) && (
            <p className={cn(
              'text-sm',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}>
              {error || helperText}
            </p>
          )}
        </div>
        
        {/* Contador de caracteres */}
        {showCharacterCount && maxLength && (
          <p className={cn(
            'text-sm tabular-nums',
            isOverLimit ? 'text-destructive' : 'text-muted-foreground'
          )}>
            {characterCount}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

Textarea.displayName = 'UIFacade.Textarea';
