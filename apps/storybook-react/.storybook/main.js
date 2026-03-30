/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },

  // Onde o SB vai procurar suas stories
  stories: [
    '../src/stories/**/*.mdx',
    '../src/stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../../../packages/utilities/storybook/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],

  // Addons recomendados
   addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ]
,

  // Docs por autodocs (opcional, mas útil no DS)
  docs: {
    autodocs: 'tag'
  },

  // Configuração de arquivos estáticos (favicon, imagens, etc)
  staticDirs: ['../public'],

  // Ajustes do Vite para monorepo e @fluentui/react-icons
  viteFinal: async (viteConfig) => {
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    // 1) Garante PRÉ-empacote estável dessas deps (evita import virar null)
    viteConfig.optimizeDeps = viteConfig.optimizeDeps || {};
    viteConfig.optimizeDeps.include = [
      ...(viteConfig.optimizeDeps.include || []),
      'react',
      'react-dom',
      '@fluentui/react-icons',
      'react-day-picker',
      'date-fns'
    ];

    // 2) Força uma ÚNICA instância de React (evita múltiplos Reacts no monorepo)
    viteConfig.resolve = viteConfig.resolve || {};
    viteConfig.resolve.dedupe = [
      ...(viteConfig.resolve.dedupe || []),
      'react',
      'react-dom'
    ];

    // 3) Configura alias @ para apontar para packages/react/src
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias || {}),
      '@': path.resolve(__dirname, '../../../packages/react/src'),
      '@components': path.resolve(__dirname, '../../../packages/react/src/components'),
    };

    // 4) Em workspaces, manter symlinks resolvidos corretamente
    //    (ajuda o Vite a não duplicar módulos linkados)
    viteConfig.resolve.preserveSymlinks = false;

    return viteConfig;
  }
};

export default config;
