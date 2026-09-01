import nodePath from 'path';
import { fileURLToPath } from 'url';

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
    "@storybook/addon-a11y",
  ]
,

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
    ];

    // 2) Força uma ÚNICA instância de React (evita múltiplos Reacts no monorepo)
    viteConfig.resolve = viteConfig.resolve || {};
    viteConfig.resolve.dedupe = [
      ...(viteConfig.resolve.dedupe || []),
      'react',
      'react-dom'
    ];

    // Garante que react/react-dom resolvam sempre a partir da raiz do app,
    // evitando que o packages/react/node_modules (devDep React 19) "vaze" para
    // o bundle e sobrescreva a versão declarada aqui no storybook-react.
    const appRoot = path.resolve(__dirname, '..');
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias || {}),
      // Fixa react/react-dom para o node_modules DESTE app (storybook-react),
      // impedindo que o Vite resolva pelo packages/react/node_modules.
      'react': path.resolve(appRoot, 'node_modules/react'),
      'react-dom': path.resolve(appRoot, 'node_modules/react-dom'),
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
      path.resolve(__dirname, '../../../node_modules'), // addons pnpm virtual store
    ];

    // 6) Virtual module que expõe o conteúdo dos CHANGELOGs em build/dev time
    const fs = await import('node:fs');
    const { exec } = await import('node:child_process');
    const { promisify } = await import('node:util');
    const execAsync = promisify(exec);

    // Auto-descobre todos os pacotes em packages/* que têm CHANGELOG.md
    const packagesRoot = path.resolve(__dirname, '../../../packages');
    const changelogsData = {};
    for (const dir of fs.readdirSync(packagesRoot, { withFileTypes: true })) {
      if (!dir.isDirectory()) continue;
      const changelogPath = path.resolve(packagesRoot, dir.name, 'CHANGELOG.md');
      if (!fs.existsSync(changelogPath)) continue;

      let packageName = null;
      const pkgJsonPath = path.resolve(packagesRoot, dir.name, 'package.json');
      if (fs.existsSync(pkgJsonPath)) {
        try { packageName = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8')).name; } catch {
          // Ignora package.json inválido e tenta identificar o pacote pelo pubspec ou diretório.
        }
      }
      if (!packageName) {
        const pubspecPath = path.resolve(packagesRoot, dir.name, 'pubspec.yaml');
        if (fs.existsSync(pubspecPath)) {
          const m = fs.readFileSync(pubspecPath, 'utf-8').match(/^name:\s*(.+)/m);
          if (m) packageName = m[1].trim();
        }
      }
      if (!packageName) packageName = dir.name;

      try { changelogsData[packageName] = fs.readFileSync(changelogPath, 'utf-8'); } catch {
        // Um changelog ilegível não deve impedir a inicialização do Storybook.
      }
    }

    // Lê datas dos git tags (ex: "@giro-ds/react@4.0.0" -> "2026-03-17")
    const getTagDates = async () => {
      try {
        const { stdout } = await execAsync(
          `git tag --format="%(refname:short)|%(creatordate:short)"`,
          { cwd: path.resolve(__dirname, '../../..') }
        );
        const dates = {};
        for (const line of stdout.split('\n')) {
          const [tag, date] = line.split('|');
          if (tag && date) dates[tag.trim()] = date.trim();
        }
        return dates;
      } catch {
        return {};
      }
    };

    const tagDatesData = await getTagDates();

    const changelogPlugin = {
      name: 'virtual-changelogs',
      resolveId(id) {
        if (id === 'virtual:changelogs') return '\0virtual:changelogs';
      },
      load(id) {
        if (id === '\0virtual:changelogs') {
          // Re-read changelogs fresh on every load (enables HMR)
          const freshChangelogs = {};
          for (const dir of fs.readdirSync(packagesRoot, { withFileTypes: true })) {
            if (!dir.isDirectory()) continue;
            const changelogPath = path.resolve(packagesRoot, dir.name, 'CHANGELOG.md');
            if (!fs.existsSync(changelogPath)) continue;

            this.addWatchFile(changelogPath);

            let packageName = null;
            const pkgJsonPath = path.resolve(packagesRoot, dir.name, 'package.json');
            if (fs.existsSync(pkgJsonPath)) {
              try { packageName = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8')).name; } catch {
                // Ignora package.json inválido e tenta identificar o pacote pelo pubspec ou diretório.
              }
            }
            if (!packageName) {
              const pubspecPath = path.resolve(packagesRoot, dir.name, 'pubspec.yaml');
              if (fs.existsSync(pubspecPath)) {
                const m = fs.readFileSync(pubspecPath, 'utf-8').match(/^name:\s*(.+)/m);
                if (m) packageName = m[1].trim();
              }
            }
            if (!packageName) packageName = dir.name;

            try { freshChangelogs[packageName] = fs.readFileSync(changelogPath, 'utf-8'); } catch {
              // Mantém os demais changelogs disponíveis durante o HMR.
            }
          }

          return [
            `export const changelogs = ${JSON.stringify(freshChangelogs)};`,
            `export const tagDates = ${JSON.stringify(tagDatesData)};`,
          ].join('\n');
        }
      },
    };

    viteConfig.plugins = [...(viteConfig.plugins || []), changelogPlugin];

    return viteConfig;
  }
};

export default config;
