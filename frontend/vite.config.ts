import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "ایران‌نما | Iran Nema",
        short_name: "ایران‌نما",
        description: "تجربه بازدید مجازی از جاذبه‌های گردشگری ایران",
        theme_color: "#0f766e",
        background_color: "#f8fafc",
        display: "standalone",
        dir: "rtl",
        lang: "fa",
        icons: [
          {
            src: "/favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
