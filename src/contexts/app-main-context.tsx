import { createContext, ReactNode } from "react";

import { PlatesContextProvider } from "./plates-context";
import { OrdersContextProvider } from "./orders-context";
import { CustomerCartProvider } from "./customer-cart-context";

interface AppMainContextProviderProps {
   children: ReactNode
}

export const AppMainContext = createContext({})

export function AppMainContextProvider({ children }: AppMainContextProviderProps) {
   return (
      <AppMainContext.Provider value={{}}>
         <CustomerCartProvider>
            <OrdersContextProvider>
               <PlatesContextProvider>
                  {children}
               </PlatesContextProvider>
            </OrdersContextProvider>
         </CustomerCartProvider>
      </AppMainContext.Provider>
   )
}