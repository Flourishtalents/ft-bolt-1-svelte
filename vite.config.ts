import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '$lib': resolve('./src/lib'),
      '$app': resolve('./src/app')
    }
  },
  server: {
    hmr: {
      // Improve HMR stability in cloud environments
      overlay: false, // Disable error overlay to prevent fetch issues
      timeout: 60000, // Increase timeout to 60 seconds
    },
    // Allow connections from any host (cloud environment)
    host: true,
    // Configure WebSocket properly for cloud environments
    proxy: {},
  },
  // Optimize build for better performance
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          vendor: ['svelte'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
          icons: ['lucide-svelte']
        }
      }
    }
  }
})
