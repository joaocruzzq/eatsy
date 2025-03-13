import { toast } from "sonner";
import { api } from "@/lib/axios";

import { CustomerCartContext } from "./customer-cart-context";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type PlateCategory = "refeicao" | "sobremesa" | "bebida"

type Ingredientes = {
   id: number
   name: string
}

export interface PlateType {
   id: number
   name: string
   price: number
   image: string
   description: string
   category: PlateCategory
   ingredients: Ingredientes[]
}

interface PlatesContextType {
   query: string

   plates: PlateType[]

   plateFilter: string
   filteredPlates: PlateType[]

   onAddPlateIMG: (image: string) => void
   onAddNewPlate: (data: PlateType) => void
   onDeletePlate: (plateID: number) => void

   fetchPlates: (query?: string) => void
   onFilterPlates: (category: string) => void
}

interface PlatesContextProviderProps {
   children: ReactNode
}

export const PlatesContext = createContext({} as PlatesContextType)

export function PlatesContextProvider({ children }: PlatesContextProviderProps) {
   const { onRemoveItemFromCart } = useContext(CustomerCartContext)

   const [plates, setPlates] = useState<PlateType[]>([])

   const [query, setQuery] = useState("")

   async function fetchPlates(query?: string) {
      setQuery(query || "")

      const platesList = await api.get("/plates", {
         params: {
            _sort: "name",
            _order: "asc",
            q: query
         }
      })

      setPlates(platesList.data)
   }

   const [plateFilter, setPlateFilter] = useState("")

   const filteredPlates = plates.filter((plate) => {
      if(plateFilter === "") {
         return true
      }

      return plate.category === plateFilter
   })

   function onFilterPlates(category: string) {
      setPlateFilter(category === "all" ? "" : category)
   }

   const [plateIMG, setPlateIMG] = useState<string | null>(null)

   function onAddPlateIMG(image: string) {
      setPlateIMG(image)
   }

   async function onAddNewPlate(data: PlateType) {
      const isNewPlate = !data.id

      const plateId = data.id ?? Math.floor(Date.now() + Math.random() * 1000)

      const plateData = {
         ...data,
         id: plateId,
         price: data.price.toFixed(2),
         image: plateIMG ? plateIMG?.toString() : data.image
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
         toast.error("Erro ao salvar prato.")
      }

      fetchPlates()
   }

   async function onDeletePlate(plateID?: number) {
      await api.delete(`/plates/${plateID}`).then(() => {
         onRemoveItemFromCart(plateID)
      })

      fetchPlates()
   }

   useEffect(() => {
      fetchPlates()
   }, [])

   useEffect(() => {
      setPlateFilter("");
   }, [location])

   return (
      <PlatesContext.Provider
         value={{
            query,
            plates,
            plateFilter,
            filteredPlates,
            onFilterPlates,
            onAddPlateIMG,
            onAddNewPlate,
            onDeletePlate,
            fetchPlates,
         }}
      >
         { children }
      </PlatesContext.Provider>
   )
}