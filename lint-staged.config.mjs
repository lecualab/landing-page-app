/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*': 'pnpm format:check --write',
};
