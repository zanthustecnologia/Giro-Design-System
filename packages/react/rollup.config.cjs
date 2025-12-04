// packages/components-react/rollup.config.cjs
const path = require('path');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve').nodeResolve;
const postcss = require('rollup-plugin-postcss');
const json = require('@rollup/plugin-json');
const dts = require('rollup-plugin-dts').default;

const pkg = require('./package.json');

module.exports = [
  // Build ESM + CJS
  {
    input: 'src/components/index.ts',
    external: [
      'react',
      'react-dom',
      'react/jsx-runtime',
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
        extract: 'styles.css',
        inject: false,
        modules: {
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
        autoModules: true,
        use: ['sass'],
        minimize: true,
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
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      warn(warning);
    },
  },
  {
    input: 'dist/components/index.d.ts',
    output: {
      file: path.resolve(__dirname, 'dist/index.d.ts'),
      format: 'esm',
    },
    plugins: [dts()],
    external: [/\.s?css$/],
  },
];
