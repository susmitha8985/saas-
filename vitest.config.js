import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

/**
 * Vitest configuration.
 * Uses jsdom environment to simulate browser APIs in Node.
 * Includes global test helpers (describe, it, expect) without explicit imports.
 */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});
