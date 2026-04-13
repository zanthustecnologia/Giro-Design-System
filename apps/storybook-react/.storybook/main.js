import { fileURLToPath } from 'url';
import nodePath from 'path';

// Diretório deste arquivo (.storybook/)
const _dir = nodePath.dirname(fileURLToPath(import.meta.url));
// Raiz do pacote react (packages/react/)
const REACT_PKG = nodePath.resolve(_dir, '../../../packages/react');
// Src do pacote react — em forward slashes para fast-glob funcionar no Windows
const REACT_SRC = nodePath.resolve(REACT_PKG, 'src').split(nodePath.sep).join('/');

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
  ],

  // Addons recomendados
   addons: [
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "storybook-addon-playground",
  ]
,

  // Docs por autodocs (opcional, mas útil no DS)
  docs: {
    autodocs: 'tag'
  },

  // Usa react-docgen-typescript para extrair JSDoc e tipos corretamente.
  // tsconfigPath aponta para packages/react/tsconfig.json para que o TypeScript
  // program inclua os source files com os aliases certos (@/, @components/, etc.).
  // include usa {ts,tsx} pois os arquivos de tipos são .ts e os componentes .tsx;
  // sem incluir .ts, o TypeScript Program não encontra as interfaces e perde o JSDoc.
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: nodePath.join(REACT_PKG, 'tsconfig.json'),
      include: [
        `${REACT_SRC}/**/*.tsx`,
        `${REACT_SRC}/**/*.ts`,
      ],
      exclude: [`${REACT_SRC}/**/*.stories.{ts,tsx}`],
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => {
        if (prop.parent) {
          return !prop.parent.fileName.includes('node_modules');
        }
        return true;
      },
    },
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
    //    e redireciona @giro-ds/react para o fonte (permite docgen extrair JSDoc)
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias || {}),
      '@': path.resolve(__dirname, '../../../packages/react/src'),
      '@components': path.resolve(__dirname, '../../../packages/react/src/components'),
      '@giro-ds/react': path.resolve(__dirname, '../../../packages/react/src/index.ts'),
    };

    // 4) Em workspaces, manter symlinks resolvidos corretamente
    //    (ajuda o Vite a não duplicar módulos linkados)
    viteConfig.resolve.preserveSymlinks = false;

    // 5) Permite que o Vite acesse arquivos fora da raiz do app (ex: changelogs dos packages)
    viteConfig.server = viteConfig.server || {};
    viteConfig.server.fs = viteConfig.server.fs || {};
    viteConfig.server.fs.allow = [
      ...(viteConfig.server.fs.allow || []),
      path.resolve(__dirname, '..'),          // raiz do app (src/, public/, etc.)
      path.resolve(__dirname, '../../../packages'),
    ];

    // 6) Virtual module que expõe o conteúdo dos CHANGELOGs em build/dev time
    const fs = await import('node:fs');
    const { execSync } = await import('node:child_process');

    const readChangelog = (pkg) =>
      fs.readFileSync(path.resolve(__dirname, `../../../packages/${pkg}/CHANGELOG.md`), 'utf-8');

    // Lê datas dos git tags (ex: "@giro-ds/react@4.0.0" -> "2026-03-17")
    const getTagDates = () => {
      try {
        const out = execSync(
          `git tag --format="%(refname:short)|%(creatordate:short)"`,
          { cwd: path.resolve(__dirname, '../../..'), encoding: 'utf-8' }
        );
        const dates = {};
        for (const line of out.split('\n')) {
          const [tag, date] = line.split('|');
          if (tag && date) dates[tag.trim()] = date.trim();
        }
        return dates;
      } catch {
        return {};
      }
    };

    const changelogPlugin = {
      name: 'virtual-changelogs',
      resolveId(id) {
        if (id === 'virtual:changelogs') return '\0virtual:changelogs';
      },
      load(id) {
        if (id === '\0virtual:changelogs') {
          return [
            `export const reactChangelog = ${JSON.stringify(readChangelog('react'))};`,
            `export const tokensChangelog = ${JSON.stringify(readChangelog('tokens'))};`,
            `export const utilitiesChangelog = ${JSON.stringify(readChangelog('utilities'))};`,
            `export const tagDates = ${JSON.stringify(getTagDates())};`,
          ].join('\n');
        }
      },
    };

    viteConfig.plugins = [...(viteConfig.plugins || []), changelogPlugin];

    return viteConfig;
  }
};

export default config;
