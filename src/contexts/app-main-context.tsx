import { api } from "@/lib/axios";

import { createContext, ReactNode, useEffect, useState } from "react";

export interface Ingredient {
   id: number
   name: string
}

export interface PlateType {
   id: number
   name: string
   price: number
   quantity: number
   description: string
   ingredients: Ingredient[]
   category: "Refeição" | "Sobremesa" | "Bebida"
}

interface AppMainContextType {
   query: string

   plates: PlateType[]
   categoryFilter: string
   filteredPlates: PlateType[]

   fetchPlates: (query?: string) => void
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

   const [query, setQuery] = useState("")

   async function fetchPlates(query?: string) {
      setQuery(query || "")

      const platesList = await api.get("/plates", {
         params: {
            q: query
         }
      })

      setPlates(platesList.data)
   }
   
   

   useEffect(() => {
      fetchPlates()
   }, [])
      
   return (
      <AppMainContext.Provider
         value={{
            query,
            plates,
            categoryFilter,
            filteredPlates,
            onChangeFilter,
            fetchPlates,
         }}
      >
         {children}
      </AppMainContext.Provider>
   )
}