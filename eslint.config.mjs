import globals from 'globals';
import tsParser from '@typescript-eslint/parser';

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';

/**
 * The ESLint configuration in "flat config" format.
 *
 * Note: This configuration uses helper functions from `typescript-eslint`.
 *
 * @see {@link https://eslint.org/docs/latest/use/configure/ Configure ESLint}
 * @see {@link https://typescript-eslint.io/packages/typescript-eslint typescript-eslint}
 */
export default tseslint.config(
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-empty-object-type': ['error', { allowWithName: 'Props$' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    // global ignores
    // do not add any other keys to this object
    ignores: ['android/', 'coverage/', 'dist/'],
  },
);
