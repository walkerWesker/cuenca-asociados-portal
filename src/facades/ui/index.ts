
/**
 * Índice principal de la UI Facade
 * Exporta todos los componentes y tipos de manera centralizada
 * 
 * Esta facade permite:
 * - Cambiar la librería de UI subyacente sin afectar el código de la aplicación
 * - Mantener APIs consistentes entre diferentes componentes
 * - Facilitar el testing y la documentación
 * - Aplicar estilos y comportamientos globales de manera centralizada
 */

// Exportar todos los tipos
export * from './types';

// Exportar todos los componentes facade
export { ButtonFacade as Button } from './components/Button';
export { InputFacade as Input } from './components/Input';
export { CardFacade as Card } from './components/Card';
export { DialogFacade as Dialog } from './components/Dialog';
export { TabsFacade as Tabs } from './components/Tabs';
export { TextareaFacade as Textarea } from './components/Textarea';

/**
 * Facade de UI - Componentes disponibles:
 * 
 * - Button: Botones con variantes de estilo y tamaño
 * - Input: Campos de entrada de texto
 * - Card: Tarjetas con header, content y footer opcionales
 * - Dialog: Modales y diálogos
 * - Tabs: Pestañas de navegación
 * - Textarea: Áreas de texto multilínea
 * 
 * Uso recomendado:
 * import { Button, Input, Card } from '@/facades/ui';
 */
