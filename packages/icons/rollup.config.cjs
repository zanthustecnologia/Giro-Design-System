// Rollup 4 — build ESM + CJS
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const typescript = require('@rollup/plugin-typescript');

module.exports = {
  input: 'src/index.tsx', // ajuste se seu entry for .ts
  output: [
    { file: 'dist/index.esm.js', format: 'esm', sourcemap: true },
    { file: 'dist/index.cjs.js', format: 'cjs', sourcemap: true, exports: 'named' }
  ],
  external: [
    'react',
    'react/jsx-runtime',
    '@fluentui/react-icons'
  ],
  plugins: [
    nodeResolve({ extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'] }),
    commonjs(),
    json(),
    typescript({ tsconfig: './tsconfig.json' })
  ]
};
