import react from '@vitejs/plugin-react';
import webfontDownload from 'vite-plugin-webfont-dl';
import viteImagemin from 'vite-plugin-imagemin';
import tsconfigPaths from 'vite-tsconfig-paths';
import cleanPlugin from 'vite-plugin-clean';

const srcFolder = `./src`;

export const paths = {
   src: {
      spriteIcons: `${srcFolder}/assets/icons/**/*.svg`,
      favIcon: `${srcFolder}/assets/favicon.svg`,
   },
};

export const prodConfig = {
   base: '',
   plugins: [
      react(),
      cleanPlugin(),
      webfontDownload(),
      tsconfigPaths(),
      viteImagemin({
         gifsicle: {
            optimizationLevel: 3,
            interlaced: false,
         },
         optipng: {
            optimizationLevel: 3,
         },
         mozjpeg: {
            quality: 83,
         },
         pngquant: {
            quality: [0.8, 0.9],
            speed: 4,
         },
         svgo: {
            plugins: [
               {
                  name: 'removeViewBox',
                  active: false,
               },
               {
                  name: 'removeEmptyAttrs',
                  active: false,
               },
               {
                  params: {
                     name: 'removeAttrs',
                     attrs: '(width|height)',
                  },
               },
            ],
         },
      }),
   ],
   css: {
      modules: {
         localsConvention: 'camelCase',
      },
      preprocessorOptions: {
         scss: {
            additionalData: `@use "../src/scss/tools/vars" as v; @use "../src/scss/tools/mixins" as m; @use "../src/scss/tools/functions" as f; @use "../src/scss/tools/extends";`,
         },
      },
   },
   build: {
      rollupOptions: {
         input: {
            main: './index.html',
         },
      },
   },
};
