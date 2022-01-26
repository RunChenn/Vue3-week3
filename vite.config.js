import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 全局css
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "./src/scss/custom.scss";`,
  //     },
  //   },
  // },
  server: {
    host: '0.0.0.0',
    //   port: 3000,
    //   // open: true,
    //   proxy: {
    //     '/api/md': {
    //       target: '',
    //       changeOrigin: true, // 支持跨域
    //       rewrite: (path) => path.replace(/^\/api/, ''),
    //     },
    //   },
  },
});
