import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/collectui': {
        target: 'https://dev.dikahadir.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/collectui/, '')
      }
    }
  }
});
