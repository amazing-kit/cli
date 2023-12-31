import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'app.127.0.0.1.nip.io',
    origin: 'https://app.127.0.0.1.nip.io',
    port: 3080,
  }
});
