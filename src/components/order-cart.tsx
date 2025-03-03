import { OrderPlateCard } from "./order-plate-card";
import { Button } from "./ui/button";
import { SheetContent, SheetDescription, SheetTitle } from "./ui/sheet";

import { useContext } from "react";
import { AppMainContext, OrderDataType } from "@/contexts/app-main-context";
import { ClipboardPen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function OrderCart() {
   const { customerOrder, onAddOrderData } = useContext(AppMainContext)

   const totalOrderPrice = customerOrder.reduce((acc, plate) => acc + (plate.price * plate.quantity), 0)

   const navigate = useNavigate()

   // function handleAddNewOrder() {
   //    const filteredDescription = customerOrder.map((plate) => ({
   //       name: plate.name,
   //       quantity: plate.quantity
   //    }))

   //    const newOrderData: OrderDataType = {
   //       id: Math.floor(Date.now() + Math.random() * 1000),
   //       description: filteredDescription,
   //       status: "pending",
   //       date: new Date()
   //    }

   //    onAddOrderData(newOrderData)
   // }

   return (
      <SheetContent>
         <SheetTitle className="text-xl">
            Meu pedido
         </SheetTitle>
         
         <SheetDescription className="mt-2 tracking-wide">
            Pedido
         </SheetDescription>

         <div className="flex flex-col gap-10 pt-10 pb-3 my-6 border-muted border-y-2 h-[74%] overflow-auto custom-scrollbar">
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
                  <div className="flex flex-col gap-6 text-muted justify-center items-center h-full">
                     <ClipboardPen size={96} className="mx-auto opacity-50" strokeWidth={1}/>

                     <span className="text-lg text-center leading-5">
                        Ainda não há <br /> itens no pedido.
                     </span>
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

            <Button className="w-full" onClick={() => navigate("/order-payment")} /* onClick={handleAddNewOrder} */>
               Finalizar Pedido
            </Button>
         </footer>
      </SheetContent>
   )
}