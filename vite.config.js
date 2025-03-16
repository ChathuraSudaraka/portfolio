import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
  },
  plugins: [
    react({
      include: "**/*.tsx",
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 800, // Increase the warning limit to 800KB if needed
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor packages
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom")
            ) {
              return "react-vendor";
            }
            return "vendor"; // Other node_modules
          }

          // UI components
          if (id.includes("/components/common/")) {
            return "ui-components";
          }

          // Blog-related functionality
          if (
            id.includes("/Pages/Blog") ||
            id.includes("/Pages/CreateBlog") ||
            id.includes("/Pages/BlogPage")
          ) {
            return "blog-features";
          }

          // Legal pages
          if (id.includes("/Pages/Legal/")) {
            return "legal-pages";
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@pages": path.resolve(__dirname, "src/Pages"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
});
