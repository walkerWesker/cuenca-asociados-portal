
/**
 * Facade del componente Tabs
 * Abstrae la implementación de shadcn/ui Tabs proporcionando una API unificada
 */

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TabsFacadeProps } from '../types';

/**
 * Componente Tabs de la UI Facade
 * Proporciona una interfaz consistente independiente de la librería subyacente
 */
export const TabsFacade = ({
  items,
  defaultValue,
  onValueChange,
  className,
  ...props
}: TabsFacadeProps) => {
  return (
    <Tabs
      defaultValue={defaultValue || items[0]?.value}
      onValueChange={onValueChange}
      className={className}
      {...props}
    >
      <TabsList>
        {items.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {items.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
