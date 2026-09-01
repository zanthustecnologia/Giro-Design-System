// ESLint Configuration for Storybook React App
// Extends the root configuration with Storybook specific rules

import baseConfig from '../../eslint.config.mjs'

export default [
  ...baseConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // Storybook specific adjustments
      'react-refresh/only-export-components': 'off', // Stories often export multiple things
      'import/no-default-export': 'off', // Stories use default exports
    },
  },
  {
    files: ['**/*.stories.{ts,tsx}'],
    rules: {
      // Story files specific rules
      '@typescript-eslint/no-explicit-any': 'off', // Stories may use any for flexibility
      'react/display-name': 'off',
      // Callbacks de demonstração usam o console para tornar eventos observáveis.
      'no-console': 'off',
    },
  },
  {
    files: ['.storybook/**/*.{js,ts}'],
    rules: {
      // Config files rules
      'no-console': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
]
