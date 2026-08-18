import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  root: resolve(__dirname, "github-pages"),
  base: "./",
  publicDir: resolve(__dirname, "public"),
  css: { postcss: resolve(__dirname, "postcss.config.mjs") },
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, "pages-dist"),
    emptyOutDir: true,
  },
});
