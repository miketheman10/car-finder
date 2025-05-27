import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // or 'frontend' if that's where your source is
  server: {
    port: 5173,
  },
});
