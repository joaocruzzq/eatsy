import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";

import { SignIn } from "./pages/auth";
import { Home } from "./pages/app/home";

export const router = createBrowserRouter([
   {
      path: '/',
      element: <AppLayout />,

      children: [
         { path: '/', element: <Home /> }
      ]
   },

   {
      path: '/sign-in',
      element: <AuthLayout />,

      children: [
         { path: '/sign-in', element: <SignIn /> }
      ]
   }
])