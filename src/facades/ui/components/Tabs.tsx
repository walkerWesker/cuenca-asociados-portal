
/**
 * Facade del componente Tabs
 * Abstrae la implementación específica de shadcn/ui proporcionando una interfaz unificada
 */
import React from 'react';
import { Tabs as ShadcnTabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsProps, TabItem } from '../types';
import { cn } from '@/lib/utils';

/**
 * Interfaz extendida para Tabs con funcionalidades adicionales
 */
interface ExtendedTabsProps extends TabsProps {
  items: TabItem[];
  variant?: 'default' | 'pills' | 'underline';
  fullWidth?: boolean;
}

/**
 * Componente Tabs con patrón Facade
 * Proporciona una interfaz simplificada para navegación por pestañas
 * 
 * @param props - Propiedades de las tabs según ExtendedTabsProps
 * @returns Componente Tabs renderizado
 */
export const Tabs: React.FC<ExtendedTabsProps> = ({
  items,
  defaultValue,
  value,
  onValueChange,
  orientation = 'horizontal',
  variant = 'default',
  fullWidth = false,
  className,
  children,
  ...props
}) => {
  // Valor por defecto si no se especifica
  const effectiveDefaultValue = defaultValue || items[0]?.value;

  // Clases para la lista de tabs basadas en variante
  const tabsListClasses = cn(
    fullWidth && 'w-full',
    variant === 'pills' && 'bg-muted p-1 rounded-lg',
    variant === 'underline' && 'bg-transparent border-b border-border',
    orientation === 'vertical' && 'flex-col h-auto w-auto'
  );

  // Clases para los triggers individuales
  const getTriggerClasses = (disabled?: boolean) => cn(
    fullWidth && 'flex-1',
    variant === 'pills' && 'data-[state=active]:bg-background data-[state=active]:shadow-sm',
    variant === 'underline' && 'rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent',
    disabled && 'opacity-50 cursor-not-allowed'
  );

  return (
    <ShadcnTabs
      value={value}
      defaultValue={effectiveDefaultValue}
      onValueChange={onValueChange}
      orientation={orientation}
      className={className}
      {...props}
    >
      {/* Lista de pestañas */}
      <TabsList className={tabsListClasses}>
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={getTriggerClasses(item.disabled)}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Contenido de las pestañas */}
      {items.map((item) => (
        <TabsContent
          key={item.value}
          value={item.value}
          className="mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {item.content}
        </TabsContent>
      ))}

      {/* Contenido adicional si se proporciona */}
      {children}
    </ShadcnTabs>
  );
};

Tabs.displayName = 'UIFacade.Tabs';
