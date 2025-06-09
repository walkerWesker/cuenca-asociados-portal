
# Sistema UI Facade

Este sistema implementa el patrón **Facade** para abstraer completamente las librerías de UI subyacentes (Radix UI y shadcn/ui), proporcionando una interfaz unificada y profesional.

## 🎯 Objetivos

- **Abstracción completa**: Los componentes de aplicación no dependen directamente de shadcn/ui
- **Interfaz consistente**: API unificada para todos los componentes UI
- **Flexibilidad**: Fácil cambio de biblioteca UI sin afectar la aplicación
- **Extensibilidad**: Funcionalidades adicionales sin modificar componentes base
- **Type Safety**: TypeScript estricto con interfaces bien definidas

## 📁 Estructura

```
src/facades/ui/
├── types/
│   └── index.ts          # Interfaces y tipos TypeScript
├── components/
│   ├── Button.tsx        # Facade para botones
│   ├── Input.tsx         # Facade para inputs
│   ├── Card.tsx          # Facade para tarjetas
│   ├── Dialog.tsx        # Facade para modales
│   ├── Tabs.tsx          # Facade para pestañas
│   └── Textarea.tsx      # Facade para áreas de texto
├── index.ts              # Exportaciones centralizadas
└── README.md             # Esta documentación
```

## 🚀 Uso

### Importación

```typescript
// Importar componentes individuales
import { Button, Input, Card } from '@/facades/ui';

// Importar tipos
import type { ButtonProps, InputProps } from '@/facades/ui';
```

### Ejemplos de uso

#### Button
```typescript
<Button
  variant="primary"
  size="lg"
  onClick={handleClick}
  startIcon={<Icon />}
  loading={isLoading}
>
  Enviar
</Button>
```

#### Input
```typescript
<Input
  label="Email"
  type="email"
  placeholder="usuario@ejemplo.com"
  required
  error={validationError}
  helperText="Ingresa un email válido"
  startAdornment={<MailIcon />}
/>
```

#### Card
```typescript
<Card
  title="Título de la tarjeta"
  description="Descripción opcional"
  hoverable
  shadow="md"
  footer={<Button>Acción</Button>}
>
  Contenido de la tarjeta
</Card>
```

#### Dialog
```typescript
<Dialog
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Confirmar acción"
  description="¿Estás seguro de realizar esta acción?"
  size="md"
  footer={
    <>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancelar
      </Button>
      <Button variant="destructive" onClick={handleConfirm}>
        Confirmar
      </Button>
    </>
  }
>
  Contenido del modal
</Dialog>
```

#### Tabs
```typescript
<Tabs
  items={[
    { value: 'tab1', label: 'Pestaña 1', content: <div>Contenido 1</div> },
    { value: 'tab2', label: 'Pestaña 2', content: <div>Contenido 2</div> },
  ]}
  defaultValue="tab1"
  variant="pills"
  fullWidth
/>
```

#### Textarea
```typescript
<Textarea
  label="Comentarios"
  placeholder="Escribe tus comentarios aquí..."
  maxLength={500}
  showCharacterCount
  helperText="Máximo 500 caracteres"
  resize="vertical"
/>
```

## ✨ Características avanzadas

### Composabilidad
Los componentes están diseñados para ser altamente composables:

```typescript
<Card
  header={
    <div className="flex justify-between items-center">
      <h3>Título personalizado</h3>
      <Button variant="ghost" size="sm">
        <MoreIcon />
      </Button>
    </div>
  }
  footer={
    <div className="flex gap-2">
      <Button variant="outline">Cancelar</Button>
      <Button>Guardar</Button>
    </div>
  }
>
  <Input label="Campo dentro de la tarjeta" />
</Card>
```

### Extensibilidad
Fácil extensión con nuevas funcionalidades:

```typescript
// Ejemplo: Button con confirmación
<Button
  onClick={async () => {
    const confirmed = await showConfirmDialog();
    if (confirmed) handleAction();
  }}
>
  Acción peligrosa
</Button>
```

## 🔧 Beneficios del patrón Facade

1. **Desacoplamiento**: La aplicación no depende de shadcn/ui directamente
2. **Mantenibilidad**: Cambios en UI centralizados en un solo lugar
3. **Consistencia**: API uniforme para todos los componentes
4. **Testing**: Fácil mock de componentes UI
5. **Documentación**: Interfaz clara y bien documentada

## 🛠️ Desarrollo

### Agregar nuevos componentes

1. Definir tipos en `types/index.ts`
2. Crear facade en `components/`
3. Exportar en `index.ts`
4. Documentar en README

### Convenciones

- Todos los componentes tienen `displayName` con prefijo `UIFacade.`
- Props opcionales con valores por defecto sensatos
- Comentarios en español para documentación
- TypeScript estricto sin `any`
- Clases CSS utilizando Tailwind con `cn()` helper
