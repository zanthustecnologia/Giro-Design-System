import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
    exclude: ['**/node_modules/**', '**/dist/**', '**/.deprecated/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        // Build e dependências
        'node_modules/',
        'dist/',
        '**/.deprecated/**',
        
        // Arquivos de teste
        '**/__tests__/**',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/vitest.setup.ts',
        
        // Arquivos de tipo e definição
        '**/*.d.ts',
        '**/*.types.ts',
        
        // Configurações
        '**/*.config.*',
        
        // Barrel files (index.ts que só exportam)
        '**/index.ts',
        
        // Mocks e dados de teste
        '**/mockData.ts',
        '**/__mocks__/**',
        
        // Storybook
        '**/*.stories.ts',
        '**/*.stories.tsx',
        
        // Arquivos de configuração específicos
        '**/i18n.ts',
        '**/tokens.js',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
