import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
// import { terser } from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import packageJson from './package.json';

export default {
    input: './packages/index.tsx', // Entrada principal da biblioteca
    output: [
        {
            file: packageJson.main, // Saída para CommonJS
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: packageJson.module, // Saída para ES Modules
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        peerDepsExternal(), // Exclui dependências externas do bundle
        resolve({
            extensions: ['.tsx', '.jsx', '.ts']
        }),
        commonjs(), // Converte CommonJS para ES Modules
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
        }),
        postcss({
            extract: true,
            minimize: true, 
            sourceMap: 'inline'
        }),
        typescript({
            tsconfig: './tsconfig.json'
        }),
        {
            input: "src/index.ts",
            output: [{ file: "dist/index.d.ts", format: "esm" }],
            plugins: [dts.default()],
        },
        // terser(), // Minifica o JavaScript
    ],
    external: ['react', 'react-dom'], // Exclui React e ReactDOM do bundle
};