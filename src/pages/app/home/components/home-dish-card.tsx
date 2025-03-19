import { ShoppingCart } from "lucide-react";

import { Stepper } from "@/components/stepper";
import { OrderCart } from "@/components/order-cart";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import { useNavigate } from "react-router-dom";

import { useContext, useState } from "react"
import { PlateType } from "@/contexts/plates-context";
import { CustomerCartContext } from "@/contexts/customer-cart-context";

interface HomePlateCardType {
   plate: PlateType
}

export function HomeDishCard({ plate }: HomePlateCardType) {
   const { onAddItemToCart } = useContext(CustomerCartContext)

   const [itemQuantity, setItemQuantity] = useState(1)
   
   function handleAddPlateToOrder() {
      onAddItemToCart({
         ...plate,
         quantity: itemQuantity
      })
   }

   const navigate = useNavigate()

   function navigateToPlate() {
      navigate(`/plate-details/${plate.id}`)
   }

   return (
      <Card className="bg-stone-100 dark:bg-stone-900">
         <CardContent>
            <img src={plate.image} className="size-32 mx-auto mb-2 -translate-y-1/4 cursor-pointer" onClick={navigateToPlate} />

            <div className="flex flex-col items-center gap-y-3 pt-0 -mt-5">
               <h1 className="font-semibold text-xl text-foreground tracking-wide line-clamp-1">
                  {plate.name}
               </h1>

               <span className="text-xs text-muted-foreground text-justify leading-5 line-clamp-2 tracking-wide">
                  {plate.description}
               </span>

               <div className="w-full flex justify-between items-center my-1">
                  <div className="flex gap-0.5 items-baseline">
                     <span className="text-xs text-muted-foreground">R$</span>

                     <h1 className="text-xl font-medium">
                        {plate.price}
                     </h1>
                  </div>

                  <div className="flex gap-1.5">
                     <Stepper itemID={plate.id} initialValue={itemQuantity} onChangeQuantity={setItemQuantity} />
                     
                     <Sheet>
                        <SheetTrigger>
                           <Button size="icon" variant={"default"} onClick={handleAddPlateToOrder}>
                              <ShoppingCart />
                           </Button>
                        </SheetTrigger>

                        <OrderCart />
                     </Sheet>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   )
}