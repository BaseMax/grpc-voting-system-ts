import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    alias: {
      '@app/common': './libs/common/src',
    },
    root: './',
  },
  resolve: {
    alias: {
      '@app/common': './libs/common/src',
    },
  },
  plugins: [swc.vite()],
});
