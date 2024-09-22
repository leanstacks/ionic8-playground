/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { coverageConfigDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  plugins: [react(), legacy()],
  resolve: {
    alias: {
      __fixtures__: '/src/__fixtures__',
      assets: '/src/assets',
      common: '/src/common',
      pages: '/src/pages',
      test: '/src/test',
    },
  },
  test: {
    coverage: {
      provider: 'v8',
      exclude: [
        '**/__fixtures__/**',
        '**/__mocks__/**',
        'src/main.tsx',
        'src/test',
        'capacitor.config.ts',
        ...coverageConfigDefaults.exclude,
      ],
    },
    globals: true,
    environment: 'jsdom',
    mockReset: true,
    setupFiles: './src/setupTests.ts',
  },
});
