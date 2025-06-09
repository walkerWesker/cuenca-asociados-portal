

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Definir la interfaz para el contexto de historyApiFallback
interface HistoryApiFallbackContext {
  parsedUrl: {
    pathname: string;
    search?: string;
    hash?: string;
  };
  match: RegExpMatchArray | null;
  request: {
    url: string;
    method: string;
    headers: Record<string, string>;
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Configuración del Front Controller con History API Fallback
    // Intercepta todas las peticiones de rutas no estáticas y devuelve index.html
    historyApiFallback: {
      // Excluir archivos estáticos del fallback
      disableDotRule: false,
      rewrites: [
        // Permitir archivos estáticos (CSS, JS, imágenes, etc.)
        { from: /^\/.*\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/, to: function(context: HistoryApiFallbackContext) {
          return context.parsedUrl.pathname;
        }},
        // Para todas las demás rutas, devolver index.html
        { from: /.*/, to: '/index.html' }
      ]
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

