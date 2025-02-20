import { ShoppingCart } from "lucide-react";

import plateIMG from "@/assets/plate-seafood.svg"

import { Stepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { PlateType } from "@/contexts/app-main-context"

interface PlateProps {
   plate: PlateType
}

export function HomeDishCard({ plate }: PlateProps) {
   return (
      <Card className="bg-stone-900">
         <CardContent>
            <img src={plateIMG} className="size-32 mx-auto mb-2 -translate-y-1/4" />

            <div className="flex flex-col items-center gap-y-3 pt-0 -mt-5">
               <h1 className="font-semibold text-xl text-foreground tracking-wide">
                  {plate.name}
               </h1>

               <span className="text-xs text-muted-foreground text-justify leading-5 line-clamp-2 tracking-wide">
                  {plate.description}
               </span>

               <div className="w-full flex justify-between items-center my-1">
                  <div className="flex gap-0.5 items-baseline">
                     <span className="text-xs text-muted-foreground">R$</span>

                     <h1 className="text-xl font-medium">
                        {plate.price.toFixed(2)}
                     </h1>
                  </div>

                  <div className="flex gap-1.5">
                     <Stepper />
                     
                     <Button className="px-2.5" variant={"default"}>
                        <ShoppingCart />
                     </Button>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   )
}