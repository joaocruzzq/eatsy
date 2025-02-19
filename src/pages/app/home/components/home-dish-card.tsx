import { Pencil, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";

import plateIMG from "@/assets/plate-seafood.svg"

import { PlatesProps } from "@/contexts/app-main-context"

interface PlateCardProps {
   plateInfo: PlatesProps
}

export function HomeDishCard({ plateInfo }: PlateCardProps) {
   return (
      <div className="flex flex-col max-w-60 rounded-lg text-center bg-neutral-200 dark:bg-neutral-900">
         <img src={plateIMG} className="size-32 mx-auto mb-2 -translate-y-1/4" />

         <div className="flex flex-col gap-y-3 p-6 pt-0 -mt-5">
            <h1 className="font-semibold text-xl text-foreground">
               {plateInfo.name}
            </h1>

            <span className="text-xs text-muted-foreground text-justify leading-5 line-clamp-2 tracking-wide">
               {plateInfo.description}
            </span>

            <div className="flex justify-between my-1 items-center">
               <div className="flex gap-1 items-baseline">
                  <span className="text-xs text-muted-foreground">R$</span>

                  <h1 className="text-xl font-medium">
                     {plateInfo.price.toFixed(2)}
                  </h1>
               </div>

               <div className="flex gap-2">
                  <Button className="px-2.5 w-fit" variant={"ghost"}>
                     <Pencil />
                  </Button>

                  <Button className="px-2.5 w-fit" variant={"default"}>
                     <ShoppingCart />
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}