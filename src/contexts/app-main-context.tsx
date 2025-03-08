import { createContext, ReactNode } from "react";

import { PlatesContextProvider } from "./plates-context";
import { OrdersContextProvider } from "./orders-context";
import { CustomerCartProvider } from "./customer-cart-context";

interface AppMainContextProviderProps {
   children: ReactNode
}

export const AppMainContex = createContext({})

export function AppMainContexProvider({ children }: AppMainContextProviderProps) {
   return (
      <AppMainContex.Provider value={{}}>
         <CustomerCartProvider>
            <OrdersContextProvider>
               <PlatesContextProvider>
                  {children}
               </PlatesContextProvider>
            </OrdersContextProvider>
         </CustomerCartProvider>
      </AppMainContex.Provider>
   )
}