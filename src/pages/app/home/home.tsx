import { Helmet } from "react-helmet-async"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Banner } from "./components/banner"
import { DishCard } from "@/components/dish-card"

import { useContext } from "react"
import { PlatesContext } from "@/contexts/plates-context"

export function Home() {
   const { filteredPlates, plateFilter, onFilterPlates } = useContext(PlatesContext)

   return (
      <>
         <Helmet title="Home" />

         <Banner />

         <div className="flex flex-col my-8">
            <RadioGroup onValueChange={onFilterPlates} value={plateFilter} className="flex gap-2">
               <div className="flex justify-center items-center relative h-6">
                  <Label className="p-4 font-bevietnam text-xs font-normal tracking-wide">Todos</Label>
                  <RadioGroupItem value="" className="min-h-full w-full absolute data-[state=checked]:bg-[#f5474738]" />
               </div>

               <div className="flex justify-center items-center relative h-6">
                  <Label className="p-4 font-bevietnam text-xs font-normal tracking-wide">Refeições</Label>
                  <RadioGroupItem value="refeicao" className="min-h-full w-full absolute data-[state=checked]:bg-[#f5474738]" />
               </div>

               <div className="flex justify-center items-center relative h-6">
                  <Label className="p-4 font-bevietnam text-xs font-normal tracking-wide">Sobremesas</Label>
                  <RadioGroupItem value="sobremesa" className="min-h-full w-full absolute data-[state=checked]:bg-[#f5474738]" />
               </div>

               <div className="flex justify-center items-center relative h-6">
                  <Label className="p-4 font-bevietnam text-xs font-normal tracking-wide">Bebidas</Label>
                  <RadioGroupItem value="bebida" className="min-h-full w-full absolute data-[state=checked]:bg-[#f5474738]" />
               </div>
            </RadioGroup>
             
            <div className="grid grid-cols-5 justify-center gap-x-5 gap-y-14 pt-20">
               {
                  filteredPlates.length > 0 ? (
                     filteredPlates.map((plate) => {
                        return (
                           <DishCard
                              key={plate.id}
                              plate={plate}
                           />
                        )
                     })
                  ) : (
                     <div className="col-span-5 grid justify-center border-2 border-dashed border-muted-foreground/50 dark:border-muted/50 rounded-lg p-12 -mt-10">
                        <h1 className="text-lg text-muted-foreground dark:text-muted">
                           Nenhum prato encontrado.
                        </h1>
                     </div>
                  )
               }
            </div>
         </div>
      </>
   )
}