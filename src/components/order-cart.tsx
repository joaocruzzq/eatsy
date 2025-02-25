import { OrderPlateCard } from "./order-plate-card";
import { Button } from "./ui/button";
import { SheetContent, SheetDescription, SheetTitle } from "./ui/sheet";

import { useContext } from "react";
import { AppMainContext } from "@/contexts/app-main-context";

export function OrderCart() {
   const { customerOrder } = useContext(AppMainContext)

   const totalOrderPrice = customerOrder.reduce((acc, plate) => acc + (plate.price * plate.quantity), 0)

   return (
      <SheetContent>
         <SheetTitle className="text-xl">
            Meu pedido
         </SheetTitle>
         
         <SheetDescription className="mt-2 tracking-wide">
            Pedido {"#"}3543548657
         </SheetDescription>

         <div className="flex flex-col gap-3 py-3 my-6 border-muted border-y-2 h-[74%] overflow-auto custom-scrollbar">
            {
               customerOrder.length > 0 ? (
                  <>
                     {customerOrder.map((plate) => (
                        <OrderPlateCard
                           key={plate.id}
                           plate={plate}
                        />
                     ))}
                  </>
               ) : (
                  <div>
                     <span>Nenhum item no carrinho</span>
                  </div>
               )
            }
         </div>

         <footer className="grid gap-2">
            <div className="flex justify-between">
               <span className="text-xl">Total:</span>

               <strong className="font-semibold text-xl">
                  <span className="font-normal text-base mr-1">R$</span>
                  {totalOrderPrice.toFixed(2)}
               </strong>
            </div>

            <Button className="w-full">
               Finalizar Pedido
            </Button>
         </footer>
      </SheetContent>
   )
}