import { createContext, ReactNode } from "react";

import { PlatesContextProvider } from "./plates-context";
import { OrdersContextProvider } from "./orders-context";
import { CustomerCartProvider } from "./customer-cart-context";
import { DashboardContextProvider } from "./dashboard-context";

interface AppMainContextProviderProps {
   children: ReactNode
}

export const AppMainContext = createContext({})

export function AppMainContextProvider({ children }: AppMainContextProviderProps) {
   return (
      <AppMainContext.Provider value={{}}>
         <CustomerCartProvider>
            <OrdersContextProvider>
               <DashboardContextProvider>
                  <PlatesContextProvider>
                     {children}
                  </PlatesContextProvider>
               </DashboardContextProvider>
            </OrdersContextProvider>
         </CustomerCartProvider>
      </AppMainContext.Provider>
   )
}