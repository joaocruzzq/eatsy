import { api } from "@/lib/axios";

import { createContext, ReactNode, useEffect, useState } from "react";

type Tags = {
   id: number
   name: string
}

export interface PlatesProps {
   id: number
   price: number
   name: string
   description: string
   tags: Tags[]
}

interface AppMainContextType {
   plates: PlatesProps[]
}

interface AppMainContextProviderProps {
   children: ReactNode
}

export const AppMainContext = createContext({} as AppMainContextType)

export function AppMainContextProvider({children}: AppMainContextProviderProps) {
   const [plates, setPlates] = useState<PlatesProps[]>([])
   
   useEffect(() => {
      async function fetchPlates() {
         const platesList = await api.get("/plates")
   
         setPlates(platesList.data)
      }
   
      fetchPlates()
   }, [])
      
   return (
      <AppMainContext.Provider
         value={{
            plates
         }}
      >
         {children}
      </AppMainContext.Provider>
   )
}