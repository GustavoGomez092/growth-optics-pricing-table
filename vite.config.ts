import { defineConfig, type UserConfigExport } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import mockData from "./src/mockData"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  let config: UserConfigExport = {}
  if (mode === "production") {
    config = {
      define: {
        "process.env.NODE_ENV": JSON.stringify(mode),
      },
      build: {
        lib: {
          entry: resolve(__dirname, "./src/main.tsx"),
          name: "PricingTable",
          // the proper extensions will be added
          fileName: "pricing-table",
          formats: ["es"],
        },
      },
      plugins: [tailwindcss(), react()],
    }
  } else if (mode === "development") {
    config = {
      define: {
        pricingComponentData: mockData, // Mock data for development
      },
      plugins: [tailwindcss(), react()],
    }
  }
  return config
})
