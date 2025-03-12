import { Calculator, Receipt, Wallet } from "lucide-react";

import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useContext } from "react";
import { CustomerCartContext } from "@/contexts/customer-cart-context";

const CashDataFormSchema = z.object({
   cash: z.coerce.number()
})

type CashDataInput = z.infer<typeof CashDataFormSchema>

export function MethodCash() {
   const { customerOrder, onSetPaymentMethod } = useContext(CustomerCartContext)

   const { watch, register, handleSubmit, reset } = useForm<CashDataInput>({
      resolver: zodResolver(CashDataFormSchema)
   })

   const cashInput = watch("cash")
   const orderPrice = customerOrder.reduce((acc, plate) => acc + (plate.price * plate.quantity), 0)

   const moneyExchange = cashInput - orderPrice || 0

   function addCashPayment({ cash }: CashDataInput) {
      try {
         if(moneyExchange >= 0) {
            onSetPaymentMethod({
               method: "cash",
               cashData: cash
            })

            toast.success("Método de pagamento aprovado com sucesso!")

            reset()
         }

         else {
            toast.error("O valor inserido é insuficiente para a compra.")
         }
      }

      catch {
         toast.error("Algo deu errado. Tente novamente.")
      }
   }

   return (
      <form onSubmit={handleSubmit(addCashPayment)} className="grid grid-cols-[1fr_auto] gap-4">
         <div className="p-8 flex flex-col justify-center gap-6 rounded-lg border border-muted/50">
            <p className="text-justify text-muted-foreground">
               Informe o valor que será entregue ao entregador para que possamos calcular o troco corretamente.
            </p>

            <div className="bg-muted rounded-md flex items-center justify-between p-1.5 pl-5 focus-within:ring-1 focus-within:ring-ring">
               <Wallet size={18} />

               <span className="ml-2 text-xs mt-0.5 text-muted-foreground">R$</span>

               <Input
                  type="number"
                  placeholder="00,00"
                  {...register("cash")}
                  className="focus-visible:ring-0 p-1"
               />
            </div>
         </div>

         <div className={`flex h-52 w-52 rounded-lg mt-auto relative overflow-hidden
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
                     R$ {" "}

                     <span className="text-3xl">
                        {moneyExchange.toFixed(2)}
                     </span>
                  </span>
               </div>
            </div>
         </div>

         <div className="flex justify-start col-span-2 mt-1">
            <Button type="submit" disabled={!cashInput} className="ml-auto w-52 transition" variant={"secondary"} size={"lg"}>
               <Receipt />
               Adicionar pagamento
            </Button>
         </div>
      </form>
   )
}