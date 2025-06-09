
/**
 * Facade del componente Input
 * Abstrae la implementación de shadcn/ui Input proporcionando una API unificada
 */

import { Input as ShadcnInput } from '@/components/ui/input';
import { InputFacadeProps } from '../types';

/**
 * Componente Input de la UI Facade
 * Proporciona una interfaz consistente independiente de la librería subyacente
 */
export const InputFacade = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  className,
  ...props
}: InputFacadeProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <ShadcnInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      required={required}
      className={className}
      {...props}
    />
  );
};
