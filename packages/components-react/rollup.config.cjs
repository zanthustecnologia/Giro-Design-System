// packages/components-react/rollup.config.cjs
const path = require('path');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve').nodeResolve;
const postcss = require('rollup-plugin-postcss');
const json = require('@rollup/plugin-json');

const pkg = require('./package.json');
const postcssImport = require('postcss-import');
const postcssDiscardDuplicates = require('postcss-discard-duplicates');
const cssnano = require('cssnano');

module.exports = [
  // Build ESM + CJS
  {
    input: 'src/components/index.ts', // ajuste para .tsx ou .js se for o seu caso
    external: [
      ...Object.keys(pkg.peerDependencies || {}),
      ...Object.keys(pkg.dependencies || {}).filter(
        (d) => !/\.(css|scss)$/.test(d)
      ),
    ],
    plugins: [
      resolve({
        extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'],
      }),
      commonjs(),
      json(),
      postcss({
        extract: path.resolve(__dirname, 'dist/styles.css'),
        modules: {
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
        use: {
          sass: {
            silenceDeprecations: ['legacy-js-api'],
          },
        },
        minimize: true,
        sourceMap: true,

        // ✅ PLUGINS POSTCSS PARA REMOVER DUPLICATAS
        plugins: [
          // 1️⃣ Resolver @import primeiro
          postcssImport({
            path: [
              path.resolve(__dirname, 'src'),
              path.resolve(__dirname, '../tokens/build/css'),
            ],
          }),

          // 2️⃣ Remover duplicatas de regras CSS
          postcssDiscardDuplicates(),

          // 3️⃣ Otimizar e minificar (já remove duplicatas também)
          cssnano({
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true,
                },
                normalizeWhitespace: true,
                // ✅ Remove duplicatas de forma agressiva
                reduceIdents: true,
                discardDuplicates: true,
                mergeRules: true,
              },
            ],
          }),
        ],
      }),
      typescript({
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        declaration: true,
        declarationDir: path.resolve(__dirname, 'dist'),
        rootDir: 'src',
      }),
    ],
    output: [
      {
        file: path.resolve(__dirname, 'dist/index.esm.js'),
        format: 'esm',
        sourcemap: true,
      },
      {
        file: path.resolve(__dirname, 'dist/index.cjs'),
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
    ],
    onwarn(warning, warn) {
      // silenciar warnings comuns de this is undefined em CJS
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      warn(warning);
    },
  },
];
