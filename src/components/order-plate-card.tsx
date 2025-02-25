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
         <CardContent className="flex gap-3 py-2.5 px-3 relative overflow-hidden">
            <img src={plate.plateIMG} className="absolute size-36 -translate-x-[50%] translate-y-[30%] opacity-5" />

            <div>
               <img src={plate.plateIMG} className="max-w-16" />
            </div>

            <div className="grid w-full gap-1">
               <div className="flex w-full justify-between text-lg">
                  <span className="font-semibold">
                     {plate.name}
                  </span>

                  <span className="flex items-baseline gap-0.5 font-semibold">
                     <span className="font-normal text-xs">R$</span>
                     {(plate.price * plate.quantity).toFixed(2)}
                  </span>
               </div>

               <div className="flex justify-between items-center">
                  <div className="flex gap-1 items-baseline text-sm">
                     <span>{plate.price.toFixed(2)}</span>

                     &bull;

                     <span>{plate.category}</span>
                  </div>

                  <div className="flex h-8 gap-2 items-center">
                     <Stepper itemID={plate.id} initialValue={plate.quantity} onChangeQuantity={handleChangeQuantity} />

                     <Button size="icon" variant="outline">
                        <Trash2 />
                     </Button>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   )
}