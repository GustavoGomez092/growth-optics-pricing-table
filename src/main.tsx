import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import type { PricingModule } from "./interfaces/App.interface.ts"

// extend the window object to include the PricingComponentData
declare global {
  interface Window {
    pricingComponentData: PricingModule
  }
}

createRoot(document.getElementById("pricing-table-container")!).render(
  <StrictMode>
    <App data={window.pricingComponentData} />
  </StrictMode>
)
