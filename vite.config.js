import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the build works both locally and when served from a
// GitHub Pages project subpath (e.g. /Fincast/).
export default defineConfig({
  base: "./",
  plugins: [react()],
});
