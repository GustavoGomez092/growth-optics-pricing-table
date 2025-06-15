import { defineConfig, type UserConfigExport } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import mockData from "./src/mockData.json"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  let config: UserConfigExport = {}
  if (mode === "production") {
    config = {
      build: {
        lib: {
          entry: resolve(__dirname, "./src/main.tsx"),
          name: "PricingTable",
          // the proper extensions will be added
          fileName: "pricing-table",
        },
        rollupOptions: {
          // make sure to externalize deps that shouldn't be bundled
          // into your library
          external: [
            "react",
            "react/jsx-runtime",
            "react-dom",
            "react-dom/client",
            "gsap",
          ],
          output: {
            // Provide global variables to use in the UMD build
            // for externalized deps
            globals: {
              react: "react",
              "react/jsx-runtime": "jsxRuntime",
              "react-dom": "ReactDOM",
              "react-dom/client": "ReactDOMClient",
              gsap: "gsap",
            },
          },
        },
      },
      plugins: [tailwindcss()],
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
