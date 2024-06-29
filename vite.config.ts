/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { coverageConfigDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy()],
  resolve: {
    alias: {
      __fixtures__: '/src/__fixtures__',
      api: '/src/api',
      assets: '/src/assets',
      components: '/src/components',
      hooks: '/src/hooks',
      pages: '/src/pages',
      providers: '/src/providers',
      test: '/src/test',
      utils: '/src/utils',
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
