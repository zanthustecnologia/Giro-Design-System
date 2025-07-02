import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: '.jsx', // Configura o loader para JSX
    include: /src\/.*\.js$/, // Inclui arquivos .js que contêm JSX

  },
  server: {
    port: 3000, // Porta do servidor de desenvolvimento
  },
  resolve: {
    alias: {
      '@': '/src', // Configuração de alias opcional
    },
  },
});