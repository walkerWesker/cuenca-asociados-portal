
/**
 * Facade del componente Button
 * Abstrae la implementación específica de shadcn/ui proporcionando una interfaz unificada
 */
import React from 'react';
import { Button as ShadcnButton } from '@/components/ui/button';
import { ButtonProps } from '../types';
import { cn } from '@/lib/utils';

/**
 * Componente Button con patrón Facade
 * Proporciona una interfaz simplificada y consistente para botones
 * 
 * @param props - Propiedades del botón según ButtonProps
 * @returns Componente Button renderizado
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  fullWidth = false,
  startIcon,
  endIcon,
  className,
  ...props
}) => {
  // Mapeo de tamaños internos a tamaños de shadcn
  const sizeMap = {
    sm: 'sm',
    md: 'default',
    lg: 'lg',
    xl: 'lg', // shadcn no tiene xl, usamos lg
  } as const;

  // Clases adicionales basadas en props
  const additionalClasses = cn(
    fullWidth && 'w-full',
    loading && 'cursor-not-allowed opacity-75',
    className
  );

  return (
    <ShadcnButton
      type={type}
      variant={variant}
      size={sizeMap[size]}
      disabled={disabled || loading}
      onClick={loading ? undefined : onClick}
      className={additionalClasses}
      {...props}
    >
      {/* Icono de inicio si se proporciona */}
      {startIcon && !loading && (
        <span className="mr-2 flex items-center">
          {startIcon}
        </span>
      )}
      
      {/* Indicador de carga */}
      {loading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      
      {children}
      
      {/* Icono de final si se proporciona */}
      {endIcon && !loading && (
        <span className="ml-2 flex items-center">
          {endIcon}
        </span>
      )}
    </ShadcnButton>
  );
};

Button.displayName = 'UIFacade.Button';
