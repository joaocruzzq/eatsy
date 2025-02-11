import "./index.css"

import { Helmet, HelmetProvider } from "react-helmet-async"

import { router } from "./routes"
import { RouterProvider } from "react-router-dom"

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Eatsy" />
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
