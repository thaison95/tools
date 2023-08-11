import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "TS Passio Orders",
        short_name: "PassioOrders",
        description: "Order now, pay later",
        theme_color: "#a6cc3a",
        icons: [
          {
            "src": "/passio_512.png",
            "type": "image/png",
            "sizes": "512x512"
          },
          {
            "src": "/passio_192.png",
            "type": "image/png",
            "sizes": "192x192"
          }
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
  "server.hmr.overlay": false,
  publicDir: "assets",
});
