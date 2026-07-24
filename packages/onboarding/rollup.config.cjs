const path = require('path');
const fs = require('fs');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve').nodeResolve;
const postcss = require('rollup-plugin-postcss');
const dts = require('rollup-plugin-dts').default;

const pkg = require('./package.json');

module.exports = [
  // Build ESM + CJS
  {
    input: 'src/index.ts',
    external: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
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
      postcss({
        extract: 'styles.css',
        inject: false,
        modules: {
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
        autoModules: true,
        use: [
          ['sass', {
            api: 'modern',
            silenceDeprecations: ['legacy-js-api']
          }]
        ],
        minimize: true,
      }),
      typescript({
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        declaration: true,
        declarationDir: path.resolve(__dirname, 'dist/dts-temp'),
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
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      warn(warning);
    },
  },
  // Build .d.ts
  {
    input: 'dist/dts-temp/index.d.ts',
    output: {
      file: path.resolve(__dirname, 'dist/index.d.ts'),
      format: 'esm',
    },
    plugins: [
      dts(),
      {
        name: 'cleanup-dts-temp',
        closeBundle() {
          const dtsTemp = path.resolve(__dirname, 'dist/dts-temp');
          if (fs.existsSync(dtsTemp)) {
            fs.rmSync(dtsTemp, { recursive: true, force: true });
            console.log('✔ Cleaned up dts-temp directory');
          }
        }
      }
    ],
    external: [/\.s?css$/],
  },
];
