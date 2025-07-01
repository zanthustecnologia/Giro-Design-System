import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: '.jsx',
    include: /src\/.*\.js$/,  // ✅ Regex corrigida
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // ✅ Caminho correto
      '@zanthus/tokens': path.resolve(__dirname, '../../packages/tokens')
    }
  },
  optimizeDeps: {
    exclude: [
      '@storybook/blocks',
      '@storybook/manager-api',
      '@storybook/preview-api',
      '@storybook/client-api'
    ]
  },
  // Adicionar configuração para assets estáticos
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg']
});