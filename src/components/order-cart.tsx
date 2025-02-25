import { OrderPlateCard } from "./order-plate-card";
import { Button } from "./ui/button";
import { SheetContent, SheetDescription, SheetTitle } from "./ui/sheet";

import { useContext } from "react";
import { AppMainContext } from "@/contexts/app-main-context";

export function OrderCart() {
   const { customerOrder } = useContext(AppMainContext)

   return (
      <SheetContent>
         <SheetTitle className="text-xl">
            Meu pedido
         </SheetTitle>
         
         <SheetDescription className="mt-2 tracking-wide">
            Pedido {"#"}3543548657
         </SheetDescription>

         <div className="flex flex-col gap-3 py-4 my-6 border-muted border-y-2">
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
               <span>total do pedido</span>
               <strong>R$ 230,00</strong>
            </div>

            <Button className="w-full">
               Finalizar Pedido
            </Button>
         </footer>
      </SheetContent>
   )
}