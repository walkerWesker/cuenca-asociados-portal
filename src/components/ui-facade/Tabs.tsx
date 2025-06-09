
import React from 'react';
import { Tabs as NextUITabs, Tab as NextUITab } from '@nextui-org/react';
import { cn } from '@/lib/utils';

/**
 * Facade Pattern para Tabs - Unifica la interfaz usando NextUI Tabs
 * Mantiene compatibilidad con la API anterior de Radix Tabs
 */

interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

interface TabsContentProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

// Context para manejar el estado de las tabs
const TabsContext = React.createContext<{
  activeTab: string;
  onTabChange: (value: string) => void;
}>({
  activeTab: '',
  onTabChange: () => {}
});

export const Tabs: React.FC<TabsProps> = ({ 
  children, 
  defaultValue = '', 
  value, 
  onValueChange,
  className 
}) => {
  const [activeTab, setActiveTab] = React.useState(value || defaultValue);
  
  React.useEffect(() => {
    if (value !== undefined) {
      setActiveTab(value);
    }
  }, [value]);
  
  const handleTabChange = (newValue: string) => {
    if (value === undefined) {
      setActiveTab(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeTab, onTabChange: handleTabChange }}>
      <div className={cn("w-full", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  const tabs = React.Children.toArray(children).filter(
    child => React.isValidElement(child) && child.type === TabsTrigger
  );

  return (
    <div className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}>
      {tabs}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ children, value, className }) => {
  const { activeTab, onTabChange } = React.useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => onTabChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive 
          ? "bg-background text-foreground shadow-sm" 
          : "hover:bg-background/50",
        className
      )}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({ children, value, className }) => {
  const { activeTab } = React.useContext(TabsContext);
  
  if (activeTab !== value) {
    return null;
  }

  return (
    <div
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      {children}
    </div>
  );
};

Tabs.displayName = "Tabs";
TabsList.displayName = "TabsList";
TabsTrigger.displayName = "TabsTrigger";
TabsContent.displayName = "TabsContent";

export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps };
