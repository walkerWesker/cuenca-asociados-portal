
/**
 * Facade del componente Card
 * Abstrae la implementación de shadcn/ui Card proporcionando una API unificada
 */

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { CardFacadeProps } from '../types';

/**
 * Componente Card de la UI Facade
 * Proporciona una interfaz consistente independiente de la librería subyacente
 */
export const CardFacade = ({
  children,
  title,
  description,
  footer,
  className,
  ...props
}: CardFacadeProps) => {
  return (
    <Card className={className} {...props}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      
      <CardContent>
        {children}
      </CardContent>
      
      {footer && (
        <CardFooter>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};
