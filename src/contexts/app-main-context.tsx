import { createContext, ReactNode, useEffect, useState } from "react";

import { PlatesContextProvider } from "./plates-context";
import { OrdersContextProvider } from "./orders-context";
import { CustomerCartProvider } from "./customer-cart-context";
import { DashboardContextProvider } from "./dashboard-context";

type UserProps = {
   id: number
   name: string
   email: string
   role: "admin" | "customer"
}

interface AppMainContextType {
   user: UserProps | null
}

interface AppMainContextProviderProps {
   children: ReactNode
}

export const AppMainContext = createContext({} as AppMainContextType)

export function AppMainContextProvider({ children }: AppMainContextProviderProps) {
   const [user, setUser] = useState<UserProps | null>(null)

   useEffect(() => {
      const loadedUser = localStorage.getItem("@eatsy:user")

      if(loadedUser) {
         const parsedUser = JSON.parse(loadedUser)
         setUser(parsedUser)
      }
   }, [])
   
   return (
      <AppMainContext.Provider value={{ user }}>
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