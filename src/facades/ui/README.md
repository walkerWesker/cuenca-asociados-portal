
# UI Facade

## Descripción

La UI Facade es una capa de abstracción que encapsula las librerías de UI subyacentes (shadcn/ui, Radix UI) proporcionando una API unificada y consistente para toda la aplicación.

## Objetivos

- **Abstracción**: Ocultar detalles de implementación de las librerías de UI
- **Consistencia**: Proporcionar APIs uniformes entre componentes
- **Flexibilidad**: Permitir cambiar librerías sin afectar el código de la aplicación
- **Mantenibilidad**: Centralizar la lógica de UI en un solo lugar

## Arquitectura

```
src/facades/ui/
├── types/
│   └── index.ts          # Tipos TypeScript compartidos
├── components/
│   ├── Button.tsx        # Facade del botón
│   ├── Input.tsx         # Facade del input
│   ├── Card.tsx          # Facade de la tarjeta
│   ├── Dialog.tsx        # Facade del diálogo
│   ├── Tabs.tsx          # Facade de las pestañas
│   └── Textarea.tsx      # Facade del textarea
├── index.ts              # Exportaciones principales
└── README.md             # Esta documentación
```

## Uso

```typescript
// Importación recomendada
import { Button, Input, Card, Dialog } from '@/facades/ui';

// Ejemplo de uso
<Button variant="primary" size="lg" onClick={handleClick}>
  Hacer clic
</Button>

<Input 
  placeholder="Ingresa tu email"
  value={email}
  onChange={setEmail}
/>

<Card title="Título" description="Descripción">
  Contenido de la tarjeta
</Card>
```

## Beneficios

1. **Desacoplamiento**: El código de la aplicación no depende directamente de shadcn/ui
2. **Testing**: Facilita crear mocks de componentes de UI
3. **Consistencia**: Garantiza comportamientos uniformes
4. **Escalabilidad**: Permite agregar nuevos componentes siguiendo el mismo patrón

## Extensión

Para agregar un nuevo componente a la facade:

1. Definir tipos en `types/index.ts`
2. Crear el componente facade en `components/`
3. Exportar en `index.ts`
4. Documentar el uso

## Principios de Diseño

- **Simplicidad**: APIs simples y predecibles
- **Composabilidad**: Componentes que funcionan bien juntos
- **Accesibilidad**: Mantener las características de accesibilidad de Radix UI
- **Performance**: Sin overhead significativo sobre las librerías base
