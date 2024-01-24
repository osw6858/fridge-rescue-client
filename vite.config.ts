import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

const env = loadEnv(process.env.NODE_ENV, process.cwd(), '');

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: env.VITE_SERVER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
