import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import {dts} from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import packageJson from './package.json' assert { type: 'json' };

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      resolve({
        extensions: ['.tsx', '.jsx', '.ts']
      }),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
      }),
      postcss({
        inject: true,
        extract: false,
        minimize: true,
        sourceMap: false,
      }),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: 'src/index.tsx',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    // plugins: [dts()],
  },
];