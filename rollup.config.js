import { resolve } from 'path';
import json from '@rollup/plugin-json';
import ts from 'rollup-plugin-typescript2';
import { babel } from '@rollup/plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core';
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
    },
    external: ['react', 'styled-components'],
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
      babel({
        extensions: [...DEFAULT_EXTENSIONS, 'ts', 'tsx'],
        babelHelpers: 'bundled',
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              targets: {
                browsers: '> 1%, IE 11, not op_mini all, not dead',
              },
              useBuiltIns: 'usage',
              corejs: { version: '3.9' },
            },
          ],
        ],
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
