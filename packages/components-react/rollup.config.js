import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import packageJson from './package.json' assert { type: 'json' };
import ignore from 'rollup-plugin-ignore';
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
            resolve({
                extensions: ['.tsx', '.jsx', '.ts', '.js'],
            }),
            commonjs(),
            babel({
                extensions: ['.tsx', '.ts', '.jsx', '.js'],
                babelHelpers: 'bundled',
                exclude: 'node_modules/**',
            }),
            postcss({
                extract: 'styles.css',
                inject: false,
                minimize: true,
                sourceMap: true,
            }),
            typescript({
                tsconfig: './tsconfig.json',
            }),
        ],
        external: ['react', 'react-dom'],
    },
    {
        input: 'src/index.tsx',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [
            ignore(['**/*.scss', '**/*.css']),
            dts()
        ],
    },
];