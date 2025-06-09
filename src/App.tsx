
/**
 * Componente principal de la aplicación
 * Demuestra el uso del sistema UI Facade
 */
import React, { useState } from 'react';
import { Button, Input, Card, Dialog, Tabs, Textarea } from '@/facades/ui';
import type { TabItem } from '@/facades/ui';
import { Mail, Search, Settings, User } from 'lucide-react';

function App() {
  // Estados para la demostración
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [loading, setLoading] = useState(false);

  // Simulación de acción async
  const handleAsyncAction = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  // Configuración de tabs
  const tabItems: TabItem[] = [
    {
      value: 'overview',
      label: 'Resumen',
      content: (
        <div className="space-y-4">
          <p>Contenido del resumen de la aplicación.</p>
          <Input
            label="Campo de ejemplo"
            placeholder="Escribe algo..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            startAdornment={<Search className="h-4 w-4" />}
          />
        </div>
      ),
    },
    {
      value: 'profile',
      label: 'Perfil',
      content: (
        <div className="space-y-4">
          <Input
            label="Nombre de usuario"
            placeholder="Tu nombre"
            startAdornment={<User className="h-4 w-4" />}
          />
          <Input
            label="Email"
            type="email"
            placeholder="usuario@ejemplo.com"
            startAdornment={<Mail className="h-4 w-4" />}
          />
          <Textarea
            label="Biografía"
            placeholder="Cuéntanos sobre ti..."
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            maxLength={200}
            showCharacterCount
            helperText="Máximo 200 caracteres"
          />
        </div>
      ),
    },
    {
      value: 'settings',
      label: 'Configuración',
      content: (
        <div className="space-y-4">
          <p>Configuración de la aplicación.</p>
          <Button
            variant="outline"
            startIcon={<Settings className="h-4 w-4" />}
            fullWidth
          >
            Abrir configuración avanzada
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Sistema UI Facade</h1>
          <p className="text-lg text-muted-foreground">
            Demostración del patrón Facade aplicado a componentes UI
          </p>
        </div>

        {/* Grid de tarjetas */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Tarjeta de botones */}
          <Card
            title="Componentes Button"
            description="Diferentes variantes y estados"
            hoverable
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="default">Por defecto</Button>
                <Button variant="primary">Primario</Button>
                <Button variant="secondary">Secundario</Button>
                <Button variant="destructive">Destructivo</Button>
                <Button variant="outline">Contorno</Button>
                <Button variant="ghost">Fantasma</Button>
              </div>
              
              <div className="space-y-2">
                <Button
                  fullWidth
                  loading={loading}
                  onClick={handleAsyncAction}
                  startIcon={<Settings className="h-4 w-4" />}
                >
                  {loading ? 'Cargando...' : 'Acción con carga'}
                </Button>
                
                <Button
                  fullWidth
                  variant="outline"
                  onClick={() => setDialogOpen(true)}
                >
                  Abrir modal
                </Button>
              </div>
            </div>
          </Card>

          {/* Tarjeta de inputs */}
          <Card
            title="Componentes Input"
            description="Campos de entrada con validación"
            hoverable
          >
            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="usuario@ejemplo.com"
                required
                startAdornment={<Mail className="h-4 w-4" />}
                helperText="Ingresa un email válido"
              />
              
              <Input
                label="Búsqueda"
                placeholder="Buscar..."
                startAdornment={<Search className="h-4 w-4" />}
                endAdornment={
                  <Button variant="ghost" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                }
              />
              
              <Input
                label="Campo con error"
                placeholder="Campo requerido"
                error="Este campo es requerido"
                required
              />
            </div>
          </Card>
        </div>

        {/* Sección de tabs */}
        <Card title="Componente Tabs" description="Navegación por pestañas">
          <Tabs
            items={tabItems}
            defaultValue="overview"
            variant="default"
            fullWidth
          />
        </Card>

        {/* Modal de demostración */}
        <Dialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Modal de ejemplo"
          description="Este es un ejemplo de modal usando el sistema Facade"
          size="md"
          footer={
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  alert('¡Acción confirmada!');
                  setDialogOpen(false);
                }}
              >
                Confirmar
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            <p>
              Este modal demuestra cómo el sistema Facade proporciona
              una interfaz consistente para todos los componentes UI.
            </p>
            
            <Input
              label="Campo en modal"
              placeholder="Escribe algo..."
            />
            
            <Textarea
              label="Comentarios"
              placeholder="Opcional..."
              rows={3}
            />
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
