
/**
 * Tipos base para el sistema UI Facade
 * Define los contratos y interfaces comunes para todos los componentes UI
 */

// Tipos de variantes comunes
export type ComponentVariant = 'default' | 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';
export type ComponentColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

// Propiedades base para todos los componentes
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Props comunes para componentes interactivos
export interface InteractiveComponentProps extends BaseComponentProps {
  disabled?: boolean;
  loading?: boolean;
}

// Props para componentes con variantes
export interface VariantComponentProps extends BaseComponentProps {
  variant?: ComponentVariant;
  size?: ComponentSize;
}

// Props específicos para botones
export interface ButtonProps extends InteractiveComponentProps, VariantComponentProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

// Props específicos para inputs
export interface InputProps extends InteractiveComponentProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
}

// Props específicos para cards
export interface CardProps extends BaseComponentProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  hoverable?: boolean;
  bordered?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

// Props específicos para dialogs/modals
export interface DialogProps extends BaseComponentProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

// Props específicos para tabs
export interface TabsProps extends BaseComponentProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
}

export interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}
