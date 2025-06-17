import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: '.jsx', // Configura o loader para JSX
    include: /src\/.*\.js$/, // Inclui arquivos .js que contêm JSX
  },
  resolve: {
    alias: {
      '@': '/src', // Configuração de alias opcional
    },
  },
});