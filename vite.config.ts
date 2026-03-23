import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
// Import from vitest/config instead of vite
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    // This tells Vitest to look in your root /tests folder, not /src
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
  },
})