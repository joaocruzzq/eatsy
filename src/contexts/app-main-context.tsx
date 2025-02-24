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
   quantity: number
   description: string
   ingredients: Ingredient[]
   category: "Refeição" | "Sobremesa" | "Bebida"
}

interface PlateOnOrderType {
   id: number
   name: string
   price: number
   quantity: number
   plateIMG: string
}

interface AppMainContextType {
   query: string

   plates: PlateType[]

   categoryFilter: string
   filteredPlates: PlateType[]

   customerOrder: PlateOnOrderType[]

   fetchPlates: (query?: string) => void
   onChangeFilter: (value: string) => void

   onDeletePlate: (id: number) => void
   onAddNewPlate: (data: PlateType) => void
   onAddPlatePhoto: (platePhoto: string) => void

   onAddPlateToOrder: (plate: PlateOnOrderType) => void
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

   const [plateIMG, setPlateIMG] = useState<string | null>(null)

   function onAddPlatePhoto(platePhoto: string) {
      setPlateIMG(platePhoto)
   }

   async function onAddNewPlate(data: PlateType) {
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
         }

         else {
            await api.put(`/plates/${data.id}`, plateData)
            toast.success("Prato atualizado com sucesso!")
         }

         setPlateIMG(null)
      }

      catch {
         toast.error("Erro ao salvar prato, tente novamente.")
      }

      fetchPlates()
   }

   function onDeletePlate(id: number) {
      api.delete(`/plates/${id}`)
      fetchPlates()
   }

   const [customerOrder, setCustomerOrder] = useState<PlateOnOrderType[]>([])

   function onAddPlateToOrder(plateData: PlateOnOrderType) {
      const alreadyOnOrder = customerOrder.find((plate) => plate.id === plateData.id)

      if (alreadyOnOrder) {
         const updatedPlateQuantity = customerOrder.map((plate) => plate.id === plateData.id ? {
            id: plate.id,
            name: plate.name,
            price: plate.price,
            plateIMG: plate.plateIMG,
            quantity: plate.quantity + plateData.quantity
         } : plate)

         setCustomerOrder(updatedPlateQuantity)
      }

      else {
         setCustomerOrder((prevState) => [...prevState, plateData])
      }
   }

   useEffect(() => {
      fetchPlates()
   }, [customerOrder])
      
   return (
      <AppMainContext.Provider
         value={{
            query,
            fetchPlates,

            categoryFilter,
            filteredPlates,
            onChangeFilter,

            plates,
            onDeletePlate,
            onAddNewPlate,
            onAddPlatePhoto,

            customerOrder,
            onAddPlateToOrder,
         }}
      >
         {children}
      </AppMainContext.Provider>
   )
}