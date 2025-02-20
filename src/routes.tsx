import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";

import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";

import { Home } from "./pages/app/home/home";
import { Orders } from "./pages/app/orders/orders";
import { DashBoard } from "./pages/app/dashboard/dashboard";
import { ManagePlates } from "./pages/app/manage-plates/manage-paltes";

export const router = createBrowserRouter([
   {
      path: '/',
      element: <AppLayout />,

      children: [
         { path: '/', element: <Home /> },
         { path: '/orders', element: <Orders /> },
         { path: '/dashboard', element: <DashBoard /> },
         { path: '/manage-plates', element: <ManagePlates /> },
      ]
   },

   {
      path: '/',
      element: <AuthLayout />,

      children: [
         { path: '/sign-in', element: <SignIn /> },
         { path: '/sign-up', element: <SignUp /> },
      ]
   }
])