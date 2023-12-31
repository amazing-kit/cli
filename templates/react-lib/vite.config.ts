import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    plugins: [react()],
    build: {
      target: 'node18', // not sure if this is needed
      ssr: true, // without this, the build will integrate all dependencies into the output file

      envDir: resolve(__dirname, '../..'),

      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        formats: ['esm'], // without this, the build will be for esm and cjs
      }
    },
  };
});