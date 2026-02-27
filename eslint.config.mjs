// @ts-check

import eslint from '@eslint/js';
import rxjs from '@smarttools/eslint-plugin-rxjs';
import stylistic from '@stylistic/eslint-plugin';
import vitest from '@vitest/eslint-plugin';
import angular from 'angular-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import sonarjs from 'eslint-plugin-sonarjs';
import testingLibrary from 'eslint-plugin-testing-library';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    name: 'Base',
    extends: [eslint.configs.recommended],
    rules: {
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    },
  },
  {
    name: 'TypeScript',
    files: ['**/*.ts'],
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.cjs', 'vitest.setup.ts'],
        },
      },
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-extraneous-class': [
        'error',
        { allowWithDecorator: true },
      ],
    },
  },
  {
    name: 'TypeScript Strict',
    files: ['**/*.ts'],
    ignores: ['**/*.spec.ts'],
    extends: [...tseslint.configs.strictTypeChecked],
    rules: {
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
      '@typescript-eslint/member-ordering': [
        'error',
        { default: ['signature', 'field', 'constructor', 'method'] },
      ],
    },
  },
  {
    name: 'SonarJS',
    files: ['**/*.ts'],
    // @ts-expect-error - SonarJS plugin has no proper types declared
    extends: [sonarjs.configs.recommended],
    rules: {
      'sonarjs/redundant-type-aliases': 'off',
      'sonarjs/argument-type': 'off',
      'sonarjs/todo-tag': 'warn',
    },
  },
  {
    name: 'RxJS',
    files: ['**/*.ts'],
    extends: [rxjs.configs.recommended],
    rules: {
      '@smarttools/rxjs/no-unsafe-takeuntil': [
        'error',
        { alias: ['takeUntilDestroyed'] },
      ],
    },
  },
  {
    name: 'Angular',
    files: ['**/*.ts'],
    extends: [...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/no-input-rename': 'off',
      '@angular-eslint/no-output-rename': 'off',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    name: 'Base (tests)',
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      'sonarjs/no-identical-functions': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-nested-functions': 'off',
      'sonarjs/no-base-to-string': 'off',
    },
  },
  {
    files: ['**/*.spec.ts'],
    ...vitest.configs.recommended,
  },
  {
    name: 'Testing Library',
    files: ['**/*.spec.ts'],
    ...testingLibrary.configs['flat/angular'],
  },
  {
    name: 'Disable type check for JavaScript',
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: { globals: { ...globals.node } },
  },
  {
    name: 'Angular HTML',
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
  },
  {
    name: 'Stylistic',
    extends: [
      stylistic.configs.customize({
        semi: true,
        quoteProps: 'as-needed',
        indent: 2,
        arrowParens: true,
        braceStyle: '1tbs',
      }),
    ],
    rules: {
      '@stylistic/lines-between-class-members': [
        'error',
        { enforce: [{ blankLine: 'always', prev: '*', next: 'method' }] },
      ],
      '@stylistic/operator-linebreak': [
        'error',
        'after',
        { overrides: { '?': 'before', ':': 'before' } },
      ],
    },
  },
  eslintPluginPrettierRecommended,
);
