
/**
 * Facade del componente Textarea
 * Abstrae la implementación de shadcn/ui Textarea proporcionando una API unificada
 */

import { Textarea as ShadcnTextarea } from '@/components/ui/textarea';
import { TextareaFacadeProps } from '../types';

/**
 * Componente Textarea de la UI Facade
 * Proporciona una interfaz consistente independiente de la librería subyacente
 */
export const TextareaFacade = ({
  placeholder,
  value,
  onChange,
  disabled = false,
  rows = 4,
  className,
  ...props
}: TextareaFacadeProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <ShadcnTextarea
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      rows={rows}
      className={className}
      {...props}
    />
  );
};
