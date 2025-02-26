import { Helmet } from "react-helmet-async"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Banner } from "./components/banner"
import { HomeDishCard } from "./components/home-dish-card"

import { useContext } from "react"
import { AppMainContext } from "@/contexts/app-main-context"

export function Home() {
   const { filteredPlates, categoryFilter, onChangeFilter } = useContext(AppMainContext)

   return (
      <>
         <Helmet title="Home" />

         <Banner />

         <div className="flex flex-col my-8">
            <RadioGroup onValueChange={onChangeFilter} value={categoryFilter} className="flex gap-2">
               <div className="flex justify-center items-center relative h-6">
                  <Label className="p-4 font-bevietnam text-xs font-normal tracking-wide">Todos</Label>
                  <RadioGroupItem value="" className="min-h-full w-full absolute data-[state=checked]:bg-[#f5474738]" />
               </div>

               <div className="flex justify-center items-center relative h-6">
                  <Label className="p-4 font-bevietnam text-xs font-normal tracking-wide">Refeições</Label>
                  <RadioGroupItem value="Refeição" className="min-h-full w-full absolute data-[state=checked]:bg-[#f5474738]" />
               </div>

               <div className="flex justify-center items-center relative h-6">
                  <Label className="p-4 font-bevietnam text-xs font-normal tracking-wide">Sobremesas</Label>
                  <RadioGroupItem value="Sobremesa" className="min-h-full w-full absolute data-[state=checked]:bg-[#f5474738]" />
               </div>

               <div className="flex justify-center items-center relative h-6">
                  <Label className="p-4 font-bevietnam text-xs font-normal tracking-wide">Bebidas</Label>
                  <RadioGroupItem value="Bebida" className="min-h-full w-full absolute data-[state=checked]:bg-[#f5474738]" />
               </div>
            </RadioGroup>
             
            <div className="grid grid-cols-5 justify-center gap-x-5 gap-y-14 pt-20">
               {filteredPlates.length > 0 && (
                  filteredPlates.map((plate) => {
                     return (
                        <HomeDishCard
                           key={plate.id}
                           plate={plate}
                        />
                     )
                  })
               )}
            </div>
         </div>
      </>
   )
}