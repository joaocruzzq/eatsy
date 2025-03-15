import { Trash2 } from "lucide-react";

import { Stepper } from "./stepper";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

import { useContext } from "react";
import { ItemOnCartType, CustomerCartContext } from "@/contexts/customer-cart-context";

interface OrderPlateCardProps {
   plate: ItemOnCartType
}

export function OrderPlateCard({ plate }: OrderPlateCardProps) {
   const { onRemoveItemFromCart, onChangeItemQuantity } = useContext(CustomerCartContext)

   function handleChangeQuantity(newQuantity: number) {
      onChangeItemQuantity(plate.id, newQuantity)
   }

   function handleDeleteItemFromCart() {
      onRemoveItemFromCart(plate.id)
   }

   return (
      <Card className="bg-stone-100/50 dark:bg-stone-900/50 rounded-md h-fit">
         <CardContent className="flex relative p-0">
            <div className="absolute min-h-full min-w-full overflow-clip -z-10">
               <img src={plate.image} className="size-36 absolute translate-x-[170%] opacity-5" />
            </div>

            <div className="flex w-full gap-3.5 px-3 pt-2 pb-2.5">
               <div className="grid w-fit justify-center">
                  <img src={plate.image} className="max-w-[72px]" />
               </div>

               <div className="grid flex-1 w-2/3 gap-2.5">
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

                     <div className="flex gap-2 ml-auto h-9 items-baseline">
                        <Stepper initialValue={plate.quantity} itemID={plate.id} onChangeQuantity={handleChangeQuantity} />

                        <Button size="icon" variant="ghost" onClick={handleDeleteItemFromCart} className="text-destructive hover:bg-destructive/50 hover:text-foreground/70" >
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