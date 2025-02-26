import { Trash2 } from "lucide-react";
import { Stepper } from "./stepper";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

import { useContext } from "react";
import { AppMainContext, PlateOnOrderType } from "@/contexts/app-main-context";

interface OrderPlateCardProps {
   plate: PlateOnOrderType
}

export function OrderPlateCard({ plate }: OrderPlateCardProps) {
   const { onChangeItemQuantity } = useContext(AppMainContext)

   function handleChangeQuantity(newQuantity: number) {
      onChangeItemQuantity(plate.id, newQuantity)
   }

   return (
      <Card className="bg-stone-100/50 dark:bg-stone-900/50 rounded-md">
         <CardContent className="flex gap-4 p-3 relative overflow-hidden">
            <img src={plate.plateIMG} className="absolute -z-10 size-36 translate-x-[150%] -translate-y-[50%] opacity-5" />

            <div>
               <img src={plate.plateIMG} className="max-w-16" />
            </div>

            <div className="flex flex-col justify-between flex-1">
               <div className="flex justify-between items-center">
                  <span className="text-lg font-bevietnam">
                     {plate.name}
                  </span>

                  <div className="text-sm text-muted-foreground">
                     <span className="text-xs mr-0.5">R$</span>
                     {plate.price}
                  </div>
               </div>

               <div className="flex items-baseline justify-between">
                  <div className="flex gap-1.5 items-baseline text-sm">
                     <span>{plate.quantity}
                        <span className="ml-0.5">x</span>
                     </span>

                     &bull;

                     <span className="text-xs">
                        R$
                        <span className="font-semibold text-lg ml-0.5">
                           {(plate.price * plate.quantity).toFixed(2)}
                        </span>
                     </span>
                  </div>

                  <div className="flex gap-2 h-8 items-center">
                     <Stepper itemID={plate.id} initialValue={plate.quantity} onChangeQuantity={handleChangeQuantity} />

                     <Button size="icon" variant="secondary">
                        <Trash2 />
                     </Button>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   )
}