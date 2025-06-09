
/**
 * Facade del componente Card
 * Abstrae la implementación específica de shadcn/ui proporcionando una interfaz unificada
 */
import React from 'react';
import { Card as ShadcnCard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CardProps } from '../types';
import { cn } from '@/lib/utils';

/**
 * Interfaz extendida para Card con funcionalidades adicionales
 */
interface ExtendedCardProps extends CardProps {
  title?: string;
  description?: string;
}

/**
 * Componente Card con patrón Facade
 * Proporciona una interfaz simplificada para tarjetas de contenido
 * 
 * @param props - Propiedades de la card según ExtendedCardProps
 * @returns Componente Card renderizado
 */
export const Card: React.FC<ExtendedCardProps> = ({
  children,
  header,
  footer,
  title,
  description,
  hoverable = false,
  bordered = true,
  shadow = 'sm',
  className,
  ...props
}) => {
  // Clases condicionales basadas en props
  const cardClasses = cn(
    // Efectos hover
    hoverable && 'transition-all duration-200 hover:shadow-md hover:-translate-y-1',
    
    // Estilos de sombra
    shadow === 'none' && 'shadow-none',
    shadow === 'sm' && 'shadow-sm',
    shadow === 'md' && 'shadow-md',
    shadow === 'lg' && 'shadow-lg',
    shadow === 'xl' && 'shadow-xl',
    
    // Bordes
    !bordered && 'border-none',
    
    className
  );

  return (
    <ShadcnCard className={cardClasses} {...props}>
      {/* Header personalizado o automático con title/description */}
      {(header || title || description) && (
        <CardHeader>
          {header ? (
            header
          ) : (
            <>
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </>
          )}
        </CardHeader>
      )}
      
      {/* Contenido principal */}
      {children && (
        <CardContent>
          {children}
        </CardContent>
      )}
      
      {/* Footer si se proporciona */}
      {footer && (
        <CardFooter>
          {footer}
        </CardFooter>
      )}
    </ShadcnCard>
  );
};

Card.displayName = 'UIFacade.Card';
