// @ts-check

const eslint = require('@eslint/js');
const rxjs = require('@smarttools/eslint-plugin-rxjs');
const stylistic = require('@stylistic/eslint-plugin');
const angular = require('angular-eslint');
const jasmine = require('eslint-plugin-jasmine');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const sonarjs = require('eslint-plugin-sonarjs');
const testingLibrary = require('eslint-plugin-testing-library');
const globals = require('globals');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
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
          allowDefaultProject: ['eslint.config.cjs'],
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
    // @ts-expect-error - RxJS plugin has no proper types declared
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
    name: 'Jasmine',
    files: ['**/*.spec.ts'],
    plugins: { jasmine },
    languageOptions: { globals: { ...globals.jasmine } },
    extends: [
      // @ts-expect-error - `jasmine` uses 0 | 1 | 2 for severity
      jasmine.configs.recommended,
    ],
    rules: {
      'jasmine/missing-expect': 2,
    },
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
