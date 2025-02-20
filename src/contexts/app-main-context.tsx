import { api } from "@/lib/axios";

import { createContext, ReactNode, useEffect, useState } from "react";

interface Tag {
   id: number
   name: string
}

export interface PlateType {
   id: number
   tags: Tag[]
   name: string
   price: number
   quantity: number
   description: string
   category: "Refeição" | "Sobremesa" | "Bebida"
}

interface AppMainContextType {
   plates: PlateType[]
   categoryFilter: string
   filteredPlates: PlateType[]
   onChangeFilter: (value: string) => void
}

interface AppMainContextProviderProps {
   children: ReactNode
}

export const AppMainContext = createContext({} as AppMainContextType)

export function AppMainContextProvider({children}: AppMainContextProviderProps) {
   const [plates, setPlates] = useState<PlateType[]>([])

   const [categoryFilter, setCatgoryFilter] = useState("")
   
   const filteredPlates = plates.filter((plate) => {
      if(categoryFilter === "") {
         return true
      }

      return plate.category === categoryFilter
   })

   function onChangeFilter(value: string) {
      setCatgoryFilter(value === "all" ? "" : value)
   }
   
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
            plates,
            categoryFilter,
            filteredPlates,
            onChangeFilter
         }}
      >
         {children}
      </AppMainContext.Provider>
   )
}