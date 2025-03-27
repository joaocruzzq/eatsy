import { AuthLayout } from "@/pages/_layouts/auth";

import { SignIn } from "@/pages/auth/sign-in";
import { SignUp } from "@/pages/auth/sign-up";

import { Navigate } from "react-router-dom";

const userData = localStorage.getItem("@eatsy:user")

export const authRoutes = [
   {
      path: '/',
      element: <AuthLayout />,
   
      children: [
         { path: '/', element: <SignIn /> },
         { path: '/sign-up', element: <SignUp /> },

         ...(!userData ? [{ path: "*", element: <Navigate to="/" /> }] : [])
      ]
   }
]