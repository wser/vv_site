import { defineConfig } from 'vite'

export default defineConfig({
  base: '',   // Add relative path to assets folder
  server: {
    open: true, // Automatically open the browser on server start
  },
  build:     {
      outDir: 'dist',// Output directory for the production build
      assetsDir: 'assets',
      rollupOptions: {
          input: './index.html'
    }
  }
});

