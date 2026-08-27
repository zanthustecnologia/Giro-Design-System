import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@giro-ds/react': path.resolve(__dirname, '../../packages/react/src/index.ts'),
      '@': path.resolve(__dirname, '../../packages/react/src'),
      '@components': path.resolve(__dirname, '../../packages/react/src/components'),
    },
  },
});