// eslint.config.js
import path from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export default [
  ...compat.extends('airbnb-base'),
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        gsap: 'readonly',
        Swal: 'readonly',
        IonIcon: 'readonly',
      },
    },
    rules: {
      'no-console': 'warn',
      'import/extensions': ['error', 'always', { ignorePackages: true }],
      'no-underscore-dangle': [
        'error',
        {
          allowAfterThis: true,
          allow: ['__filename', '__dirname'],
        },
      ],
      'no-new': 'off',
      'class-methods-use-this': 'off',
      'no-param-reassign': ['warn', { props: false }],
      indent: ['error', 2],
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
      'max-len': [
        'error',
        {
          code: 100,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  {
    files: ['eslint.config.js', 'webpack.common.js', 'webpack.dev.js', 'webpack.prod.js'],
    rules: {
      'import/no-extraneous-dependencies': ['error', {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      }],
    },
  },
];
