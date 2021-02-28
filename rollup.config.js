import { resolve } from 'path';
import json from '@rollup/plugin-json';
import ts from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import sourceMaps from 'rollup-plugin-sourcemaps';

const outputConfigs = {
  cjs: {
    file: resolve('dist/index.js'),
    format: 'cjs',
  },
  esm: {
    file: resolve('dist/index.mjs'),
    format: 'esm',
  },
};

const configs = ['cjs', 'esm'].map((format, index) => {
  return {
    input: resolve('src/index.ts'),
    output: {
      ...outputConfigs[format],
      freeze: false,
      esModule: true,
      sourcemap: true,
      globals: {
        react: 'React',
      },
    },
    plugins: [
      json({
        namedExports: false,
      }),
      ts({
        check: index === 0,
        tsconfig: resolve('tsconfig.json'),
        tsconfigOverride: {
          compilerOptions: {
            baseUrl: './src',
            module: 'esnext',
            jsx: 'react',
            ...(index === 0
              ? { sourceMap: true, declaration: true }
              : { sourceMap: false, declaration: false }),
          },
          exclude: ['**/test', 'demo'],
        },
      }),
      sourceMaps(),
      terser({
        module: true,
        ecma: 5,
        toplevel: format === 'cjs',
      }),
    ],
  };
});

export default configs;
