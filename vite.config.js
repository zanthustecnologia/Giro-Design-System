import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path'; // ⬅ necessário para o alias funcionar

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: '.jsx',
    include: /src\\/.*\\.js$/,
  },
  resolve: {
    alias: {
      '@': '/src',
      '@zanthus/tokens': path.resolve(__dirname, '../../packages/tokens') // ⬅ alias do pacote tokens
    }
  }
});
