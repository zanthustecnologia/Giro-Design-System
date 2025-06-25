import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
// import { terser } from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import packageJson from './package.json';

export default {
    input: './packages/index.jsx', // Entrada principal da biblioteca
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
            extensions: ['.jsx', '.js']
        }),
        commonjs(), // Converte CommonJS para ES Modules
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
        }),
        postcss({
            extract: true, // Extrai CSS para um arquivo separado
            minimize: true, // Minifica o CSS
            sourceMap: 'inline'
        }),
        // terser(), // Minifica o JavaScript
    ],
    external: ['react', 'react-dom'], // Exclui React e ReactDOM do bundle
};