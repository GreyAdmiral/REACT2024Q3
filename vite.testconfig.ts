import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
   plugins: [react(), tsconfigPaths()],
   test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: 'vitest.setup.ts',
   },
   base: '',
   css: {
      devSourcemap: false,
      modules: {
         localsConvention: 'camelCase',
      },
      preprocessorOptions: {
         scss: {
            additionalData: `@use "../src/scss/tools/vars" as v; @use "../src/scss/tools/mixins" as m; @use "../src/scss/tools/functions" as f; @use "../src/scss/tools/extends";`,
         },
      },
   },
});
