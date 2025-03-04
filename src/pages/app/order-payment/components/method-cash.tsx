import { Calculator, Wallet } from "lucide-react";

import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";

import { HandleBackButton } from "./handle-back-button";
import { FinishOrderButton } from "./finish-order-button";

import { toast } from "sonner";

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useContext } from "react";
import { AppMainContext } from "@/contexts/app-main-context";

const CashDataFormSchema = z.object({
   cash: z.coerce.number()
})

type CashDataInput = z.infer<typeof CashDataFormSchema>

export function MethodCash() {
   const { customerOrder, onAddOrderData } = useContext(AppMainContext)

   const { watch, register, handleSubmit } = useForm<CashDataInput>({
      resolver: zodResolver(CashDataFormSchema)
   })

   const CustomerPayment = watch("cash")
   const orderPrice = customerOrder.reduce((acc, plate) => acc + (plate.price * plate.quantity), 0)

   const moneyExchange = (CustomerPayment || 0) - orderPrice

   function handleAddNewOrder() {
      if (moneyExchange < 0) {
         toast.error("Valor insuficiente. Por favor, digite um valor válido.")

         return
      }

      onAddOrderData()
   }

   return (
      <TabsContent value="cash" className="gap-4 px-1 py-2 h-72">
         <div className="grid grid-cols-[1fr_222px] gap-6 h-full rounded-md border border-muted/50 p-6">
            <form onSubmit={handleSubmit(handleAddNewOrder)} className="grid gap-2">
               <p className="text-justify text-muted-foreground">
                  Informe o valor que será passado ao entregador para que possamos calcular o seu troco.
               </p>

               <div className="bg-muted rounded-md flex items-center justify-between p-1 pl-4 mb-auto focus-within:ring-1 focus-within:ring-ring">
                  <Wallet size={16} />

                  <span className="ml-2 text-xs mt-1 text-muted-foreground">R$</span>

                  <Input
                     type="number"
                     placeholder="00,00"
                     {...register("cash")}
                     className="focus-visible:ring-0 p-1"
                  />
               </div>

               <div className="flex flex-col gap-2 mt-auto">
                  <HandleBackButton />

                  <FinishOrderButton />
               </div>
            </form>

            <div className={`flex flex-col rounded-lg mt-auto h-full relative overflow-hidden
            ${moneyExchange < 0 ? "bg-red-950" : moneyExchange > 0 ? "bg-green-950" : "bg-muted"}`} >

               <div className={`absolute size-96 rounded-full  brightness-125 opacity-75
               ${moneyExchange < 0 ? "bg-red-950" : moneyExchange > 0 ? "bg-green-950" : "bg-muted"}`}/>

               <div className="grid z-10 m-auto gap-2">
                  <Calculator strokeWidth={1} size={56} className="m-auto" />

                  <div className="grid text-center">
                     <span className="text-xs leading-4 tracking-wide font-light">
                        Troco a receber:
                     </span>

                     <span className="text-xl font-semibold">
                        R$ {moneyExchange.toFixed(2)}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </TabsContent>
   )
}