import { api } from "@/lib/axios";

import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

export interface Ingredient {
   id: number
   name: string
}

export interface PlateType {
   id: number
   name: string
   price: number
   plateIMG: string
   description: string
   ingredients: Ingredient[]
   category: "Refeição" | "Sobremesa" | "Bebida"
}

interface AppMainContextType {
   query: string

   plates: PlateType[]
   categoryFilter: string
   filteredPlates: PlateType[]

   deletePlate: (id: number) => void
   fetchPlates: (query?: string) => void
   onChangeFilter: (value: string) => void

   onAddPlatePhoto: (platePhoto: string) => void
   onAddPlateData: (data: PlateType) => void
}

interface AppMainContextProviderProps {
   children: ReactNode
}

export const AppMainContext = createContext({} as AppMainContextType)

export function AppMainContextProvider({children}: AppMainContextProviderProps) {
   const [plates, setPlates] = useState<PlateType[]>([])

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

   function deletePlate(id: number) {
      api.delete(`/plates/${id}`)
      fetchPlates()
   }









   const [plateIMG, setPlateIMG] = useState<string | null>(null)

   function onAddPlatePhoto(platePhoto: string) {
      setPlateIMG(platePhoto)
   }

   async function onAddPlateData(data: PlateType) {
      const isNewPlate = !data.id

      const plateData = {
         ...data,
         id: isNewPlate ? plates.length + 1 : data.id,
         plateIMG: plateIMG ? plateIMG?.toString() : data.plateIMG,
      }

      try {
         if (isNewPlate) {
            await api.post("/plates", plateData)
            toast.success("Prato adicionado com sucesso!")

            console.log("Prato a adicionar", plateData)
         }

         else {
            await api.put(`/plates/${data.id}`, plateData)
            toast.success("Prato atualizado com sucesso!")

            console.log("Prato a atualizar", plateData)
         }

         setPlateIMG(null)
      }

      catch {
         toast.error("Erro ao salvar prato, tente novamente.")
      }

      fetchPlates()
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
            onAddPlateData,
            deletePlate,
            onAddPlatePhoto
         }}
      >
         {children}
      </AppMainContext.Provider>
   )
}