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
   const { onDeleteItemFromOrder, onChangeItemQuantity } = useContext(AppMainContext)

   function handleChangeQuantity(newQuantity: number) {
      onChangeItemQuantity(plate.id, newQuantity)
   }

   function handleDeleteItemFromCart() {
      onDeleteItemFromOrder(plate.id)
   }

   return (
      <Card className="bg-stone-100/50 dark:bg-stone-900/50 rounded-md h-fit">
         <CardContent className="flex relative gap-3 p-0">
            <div className="absolute min-h-full min-w-full overflow-clip -z-10">
               <img src={plate.plateIMG} className="size-36 absolute translate-x-[170%]  opacity-5" />
            </div>

            <div className="flex w-full px-4 pt-2 pb-3">
               <div className="grid w-fit absolute gap-1 -translate-y-8 justify-center">
                  <img src={plate.plateIMG} className="max-w-20" />

                  <span className="text-xs mx-auto text-muted-foreground opacity-30">
                     {plate.category}
                  </span>
               </div>

               <div className="grid w-2/3 ml-auto gap-2.5">
                  <div className="flex justify-between items-center">
                     <span>{plate.name}</span>

                     <span className="text-muted-foreground text-sm mr-0.5">
                        {plate.quantity} x {plate.price}
                     </span>
                  </div>
                  
                  <div className="flex items-baseline gap-0.5">
                     <span className="text-xs font-light">R$</span>

                     <span className="text-xl leading-4 font-semibold">
                        {(plate.price * plate.quantity).toFixed(2)}
                     </span>

                     <div className="flex gap-2 ml-auto h-8 items-baseline">
                        <Stepper initialValue={plate.quantity} itemID={plate.id} onChangeQuantity={handleChangeQuantity} />

                        <Button size="icon" variant="outline" onClick={handleDeleteItemFromCart} >
                           <Trash2 />
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   )
}