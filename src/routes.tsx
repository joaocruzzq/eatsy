import { createBrowserRouter } from "react-router-dom";

import { appRoutes } from "./routes/app-routes";
import { authRoutes } from "./routes/auth-routes";

const isAuthenticated = !!localStorage.getItem("@eatsy:user")

export const router = createBrowserRouter(
   isAuthenticated ? appRoutes : authRoutes
);