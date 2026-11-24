import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/github': {
        target: 'https://api.github.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/github/, ''),
      },
      '/api/leetcode': {
        target: 'https://leetcode-api-faisalshohag.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/leetcode/, ''),
      },
      '/api/hackerrank': {
        target: 'https://www.hackerrank.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/hackerrank/, ''),
      },
      '/api/contributions': {
        target: 'https://github-contributions-api.jogruber.de',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/contributions/, '/v4'),
      },
    },
  },
});
