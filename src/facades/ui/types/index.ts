
/**
 * Tipos de la UI Facade
 * Define las interfaces comunes para todos los componentes de UI
 * independientemente de la librería de implementación subyacente
 */

import { ReactNode } from 'react';

// Tipos base para todos los componentes
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Variantes de tamaño estándar
export type SizeVariant = 'sm' | 'md' | 'lg';

// Variantes de color/estilo estándar  
export type StyleVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';

// Props del componente Button
export interface ButtonFacadeProps extends BaseComponentProps {
  variant?: StyleVariant;
  size?: SizeVariant;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// Props del componente Input
export interface InputFacadeProps extends Omit<BaseComponentProps, 'children'> {
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
}

// Props del componente Card
export interface CardFacadeProps extends BaseComponentProps {
  title?: string;
  description?: string;
  footer?: ReactNode;
}

// Props del componente Dialog
export interface DialogFacadeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  trigger?: ReactNode;
}

// Props del componente Tabs
export interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
}

export interface TabsFacadeProps extends BaseComponentProps {
  items: TabItem[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

// Props del componente Textarea
export interface TextareaFacadeProps extends Omit<BaseComponentProps, 'children'> {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  rows?: number;
}
