'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var resolve = require('@rollup/plugin-node-resolve');
var commonjs = require('@rollup/plugin-commonjs');
var babel = require('@rollup/plugin-babel');
var postcss = require('rollup-plugin-postcss');
var typescript = require('@rollup/plugin-typescript');
var peerDepsExternal = require('rollup-plugin-peer-deps-external');
var packageJson = require('./package.json');
var dts = require('rollup-plugin-dts');

var rollup_config = {
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
            extract: true, // Extrai CSS para um arquivo separado
            minimize: true, // Minifica o CSS
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

exports.default = rollup_config;
