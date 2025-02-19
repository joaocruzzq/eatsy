import { createContext, ReactNode } from "react";

interface AppMainContextType {

}

interface AppMainContextProviderProps {
   children: ReactNode
}

export const AppMainContext = createContext({} as AppMainContextType)

export function AppMainContextProvider({children}: AppMainContextProviderProps) {
   return (
      <AppMainContext.Provider value={{}}>
         {children}
      </AppMainContext.Provider>
   )
}