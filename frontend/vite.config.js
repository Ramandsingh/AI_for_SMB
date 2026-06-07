import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@excalidraw/excalidraw'],
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        // In dev, backend is exposed on host port BACKEND_PORT (default 3101)
        target: 'http://localhost:3101',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':      ['react', 'react-dom', 'react-router-dom'],
          'vendor-lucide':     ['lucide-react'],
          'vendor-mermaid':    ['mermaid'],
          'vendor-excalidraw': ['@excalidraw/excalidraw'],
          'vendor-pdf':        ['pdf-lib', 'pdfjs-dist'],
          'vendor-fabric':     ['fabric'],
          'vendor-nomnoml':    ['nomnoml'],
        },
      },
    },
  },
});
