import "./index.css"

import { Helmet, HelmetProvider } from "react-helmet-async"

import { Toaster } from "sonner"

import { router } from "./routes"
import { RouterProvider } from "react-router-dom"

import { ThemeProvider } from "./components/theme/theme-provider"
import { AppMainContextProvider } from "./contexts/app-main-context"

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="eatsy-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | Eatsy" />
        <Toaster richColors closeButton />

        <AppMainContextProvider>
          <RouterProvider router={router} />
        </AppMainContextProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
