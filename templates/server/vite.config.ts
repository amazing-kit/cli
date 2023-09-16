import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    build: {
      target: 'node18', // not sure if this is needed
      ssr: true, // without this, the build will integrate all dependencies into the output file

      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        formats: ['esm'], // without this, the build will be for esm and cjs
      }
    },
  };
});
