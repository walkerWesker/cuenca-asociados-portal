
/**
 * Facade del componente Button
 * Abstrae la implementación de shadcn/ui Button proporcionando una API unificada
 */

import { Button as ShadcnButton } from '@/components/ui/button';
import { ButtonFacadeProps } from '../types';

/**
 * Componente Button de la UI Facade
 * Proporciona una interfaz consistente independiente de la librería subyacente
 */
export const ButtonFacade = ({
  children,
  variant = 'default',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className,
  ...props
}: ButtonFacadeProps) => {
  return (
    <ShadcnButton
      variant={variant}
      size={size === 'md' ? 'default' : size}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={className}
      {...props}
    >
      {children}
    </ShadcnButton>
  );
};
