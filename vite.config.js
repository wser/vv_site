import { defineConfig } from 'vite'

export default defineConfig({
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

