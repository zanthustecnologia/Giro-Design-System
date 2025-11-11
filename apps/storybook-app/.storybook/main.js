/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },

  // Onde o SB vai procurar suas stories
  stories: [
    '../stories/**/*.mdx',
    '../../../packages/ui/storybook/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../../../packages/components-react/src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
     '../../../packages/components-react/src/components/**/*.mdx'
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
    autodocs: false
  },

  // Ajustes do Vite para monorepo e @fluentui/react-icons
  viteFinal: async (viteConfig) => {
    // 1) Garante PRÉ-empacote estável dessas deps (evita import virar null)
    viteConfig.optimizeDeps = viteConfig.optimizeDeps || {};
    viteConfig.optimizeDeps.include = [
      ...(viteConfig.optimizeDeps.include || []),
      'react',
      'react-dom',
      '@fluentui/react-icons'
    ];

    // 2) Força uma ÚNICA instância de React (evita múltiplos Reacts no monorepo)
    viteConfig.resolve = viteConfig.resolve || {};
    viteConfig.resolve.dedupe = [
      ...(viteConfig.resolve.dedupe || []),
      'react',
      'react-dom'
    ];

    // 3) Em workspaces, manter symlinks resolvidos corretamente
    //    (ajuda o Vite a não duplicar módulos linkados)
    viteConfig.resolve.preserveSymlinks = false;

    return viteConfig;
  }
};

export default config;
