// ESLint Configuration for @giro-ds/react
// Extends the root configuration with component library specific rules

import baseConfig from '../../eslint.config.mjs'

export default [
  ...baseConfig,
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'src/components/.deprecated/**',
      '**/*.d.ts',
      'rollup.config.cjs',
      'src/styles/tokens.js',
    ],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // Component library specific rules
      'react/display-name': 'warn', // Components must have display names for better debugging
      '@typescript-eslint/no-explicit-any': 'warn', // Warn instead of error for gradual improvement
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Too strict for now
      
      // Relax some rules for existing codebase
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-noninteractive-element-interactions': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', 'vitest.setup.ts', '**/__tests__/**'],
    rules: {
      // Relaxed rules for test files
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react/display-name': 'off',
      'no-console': 'off',
    },
  },
  {
    files: ['*.config.{js,ts,cjs,mjs}', 'vite.config.ts', 'vitest.config.ts'],
    rules: {
      // Relaxed rules for config files
      '@typescript-eslint/no-var-requires': 'off',
      'no-console': 'off',
      'import/order': 'off',
    },
  },
]
