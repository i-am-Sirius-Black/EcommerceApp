import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL, // Accessing VITE_API_URL from the .env file
        changeOrigin: true,
        secure: false, // Disable SSL verification if you're using HTTP 
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
