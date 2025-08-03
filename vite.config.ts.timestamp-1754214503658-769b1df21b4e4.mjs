// vite.config.ts
import { defineConfig } from "file:///app/code/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///app/code/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
import { resolve } from "path";
var vite_config_default = defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      "$lib": resolve("./src/lib"),
      "$app": resolve("./src/app")
    }
  },
  server: {
    hmr: {
      // Improve HMR stability in cloud environments
      overlay: false,
      // Disable error overlay to prevent fetch issues
      timeout: 6e4
      // Increase timeout to 60 seconds
    },
    // Allow connections from any host (cloud environment)
    host: true,
    // Configure WebSocket properly for cloud environments
    proxy: {}
  },
  // Optimize build for better performance
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          vendor: ["svelte"],
          firebase: ["firebase/app", "firebase/auth", "firebase/firestore", "firebase/storage"],
          icons: ["lucide-svelte"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwL2NvZGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9hcHAvY29kZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vYXBwL2NvZGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgc3ZlbHRlIH0gZnJvbSAnQHN2ZWx0ZWpzL3ZpdGUtcGx1Z2luLXN2ZWx0ZSdcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3N2ZWx0ZSgpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnJGxpYic6IHJlc29sdmUoJy4vc3JjL2xpYicpLFxuICAgICAgJyRhcHAnOiByZXNvbHZlKCcuL3NyYy9hcHAnKVxuICAgIH1cbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgaG1yOiB7XG4gICAgICAvLyBJbXByb3ZlIEhNUiBzdGFiaWxpdHkgaW4gY2xvdWQgZW52aXJvbm1lbnRzXG4gICAgICBvdmVybGF5OiBmYWxzZSwgLy8gRGlzYWJsZSBlcnJvciBvdmVybGF5IHRvIHByZXZlbnQgZmV0Y2ggaXNzdWVzXG4gICAgICB0aW1lb3V0OiA2MDAwMCwgLy8gSW5jcmVhc2UgdGltZW91dCB0byA2MCBzZWNvbmRzXG4gICAgfSxcbiAgICAvLyBBbGxvdyBjb25uZWN0aW9ucyBmcm9tIGFueSBob3N0IChjbG91ZCBlbnZpcm9ubWVudClcbiAgICBob3N0OiB0cnVlLFxuICAgIC8vIENvbmZpZ3VyZSBXZWJTb2NrZXQgcHJvcGVybHkgZm9yIGNsb3VkIGVudmlyb25tZW50c1xuICAgIHByb3h5OiB7fSxcbiAgfSxcbiAgLy8gT3B0aW1pemUgYnVpbGQgZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICAvLyBTcGxpdCB2ZW5kb3IgY2h1bmtzIGZvciBiZXR0ZXIgY2FjaGluZ1xuICAgICAgICAgIHZlbmRvcjogWydzdmVsdGUnXSxcbiAgICAgICAgICBmaXJlYmFzZTogWydmaXJlYmFzZS9hcHAnLCAnZmlyZWJhc2UvYXV0aCcsICdmaXJlYmFzZS9maXJlc3RvcmUnLCAnZmlyZWJhc2Uvc3RvcmFnZSddLFxuICAgICAgICAgIGljb25zOiBbJ2x1Y2lkZS1zdmVsdGUnXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2TSxTQUFTLG9CQUFvQjtBQUMxTyxTQUFTLGNBQWM7QUFDdkIsU0FBUyxlQUFlO0FBR3hCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxPQUFPLENBQUM7QUFBQSxFQUNsQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxRQUFRLFFBQVEsV0FBVztBQUFBLE1BQzNCLFFBQVEsUUFBUSxXQUFXO0FBQUEsSUFDN0I7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixLQUFLO0FBQUE7QUFBQSxNQUVILFNBQVM7QUFBQTtBQUFBLE1BQ1QsU0FBUztBQUFBO0FBQUEsSUFDWDtBQUFBO0FBQUEsSUFFQSxNQUFNO0FBQUE7QUFBQSxJQUVOLE9BQU8sQ0FBQztBQUFBLEVBQ1Y7QUFBQTtBQUFBLEVBRUEsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBO0FBQUEsVUFFWixRQUFRLENBQUMsUUFBUTtBQUFBLFVBQ2pCLFVBQVUsQ0FBQyxnQkFBZ0IsaUJBQWlCLHNCQUFzQixrQkFBa0I7QUFBQSxVQUNwRixPQUFPLENBQUMsZUFBZTtBQUFBLFFBQ3pCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
