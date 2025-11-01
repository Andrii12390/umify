import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './jest.setup.ts',
    include: ['**/__tests__/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/__e2e__/**', 'node_modules', 'dist'],
  },
});
