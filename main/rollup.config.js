import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';
import dts from 'rollup-plugin-dts'

export default {
    input: 'src/index.ts',
    output: [
        {
            format: 'es',
            file: pkg.module,
            exports: 'named',
            sourcemap: true
        }
    ],
    plugins: [
        typescript({useTsconfigDeclarationDir: true}),
        // // allow to bundle library in common js format
        // commonjs(),
        postcss({
            modules: true,
            use: ['sass'],
        }),
        {
            // path to your declaration files root
            input: './dist/dts/index.d.ts',
            output: [{ file: 'dist/index.d.ts', format: 'es' }],
            plugins: [dts()],
        },
    ],
};