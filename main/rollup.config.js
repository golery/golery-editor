import typescript from '@rollup/plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

export default {
    input: 'src/index.ts',
    output: [
        {
            format: 'es',
            file: pkg.module
        }
    ],
    plugins: [
        typescript(),
        // allow to bundle library in common js format
        commonjs(),
        postcss({
            modules: true,
            use: ['sass'],
        })
    ],
};