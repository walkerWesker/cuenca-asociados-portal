
/**
 * Punto de entrada principal para el sistema UI Facade
 * Exporta todos los componentes y tipos de manera centralizada
 */

// Exportar todos los tipos
export type * from './types';

// Exportar todos los componentes
export { Button } from './components/Button';
export { Input } from './components/Input';
export { Card } from './components/Card';
export { Dialog } from './components/Dialog';
export { Tabs } from './components/Tabs';
export { Textarea } from './components/Textarea';

// Re-exportar tipos específicos más utilizados
export type {
  ButtonProps,
  InputProps,
  CardProps,
  DialogProps,
  TabsProps,
  TabItem,
  ComponentVariant,
  ComponentSize,
  ComponentColor,
} from './types';
