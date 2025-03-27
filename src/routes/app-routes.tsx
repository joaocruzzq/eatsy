import { AppLayout } from "@/pages/_layouts/app";

import { Home } from "@/pages/app/home/home";
import { Orders } from "@/pages/app/orders/orders";
import { DashBoard } from "@/pages/app/dashboard/dashboard";
import { ManagePlates } from "@/pages/app/manage-plates/manage-paltes";
import { OrderPayment } from "@/pages/app/order-payment/order-payment";
import { PlateDetails } from "@/pages/app/plate-details/plate-details";

export const appRoutes = [
   {
      path: '/',
      element: <AppLayout />,

      children: [
         { path: '/', element: <Home /> },
         { path: '/orders', element: <Orders /> },
         { path: '/dashboard', element: <DashBoard /> },
         { path: '/order-payment', element: <OrderPayment /> },
         { path: '/plate-details/:id', element: <PlateDetails /> },
         { path: '/manage-plates/:id?', element: <ManagePlates /> },
      ],
   }
]