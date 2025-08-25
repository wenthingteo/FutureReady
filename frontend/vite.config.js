import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // now @ points to src
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"], // optional, ensures jsx is resolved
  },
  server: {
    port: 3000,
  },
})
