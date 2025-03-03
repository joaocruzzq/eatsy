import { ShoppingCart } from "lucide-react";

import { HandleBackButton } from "./handle-back-button";
import { InterativeCredicCard } from "./interative-credit-card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { onFormatCPF, onFormatCardNumber } from "@/utils/formatters"

import { useContext } from "react";
import { AppMainContext, OrderDataType } from "@/contexts/app-main-context";

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const CardDataFormSchema = z.object({
   method: z.string(),
   cardName: z.string().min(1),
   ownerCPF: z.string().min(14),
   cardNumber: z.string().min(19),
   expirationM: z.string().min(2),
   expirationY: z.string().min(2),
   verificationCode: z.string().min(3)
})

type CardDataInputs = z.infer<typeof CardDataFormSchema>

export function MethodCard() {
   const { customerOrder, onAddOrderData } = useContext(AppMainContext)

   const { watch, register, setValue, handleSubmit } = useForm<CardDataInputs>({
      resolver: zodResolver(CardDataFormSchema)
   })
   
   const expirationM = watch("expirationM") || "MM"
   const expirationY = watch("expirationY") || "YY"

   const cardOwnerName = watch("cardName") || "XXXX XXXX XXXX"

   const cardNumberValue = watch("cardNumber") || "**** **** **** 0000"

   const cardPaymentMethod = watch("method") || "-"
   const FormattedMethod = cardPaymentMethod === "credit" ? "Crédito" : cardPaymentMethod === "debit" ? "Débito" : "-"

   function handleAddNewOrder() {
      const filteredDescription = customerOrder.map((plate) => ({
         name: plate.name,
         quantity: plate.quantity
      }))

      const newOrderData: OrderDataType = {
         id: Math.floor(Date.now() + Math.random() * 1000),
         description: filteredDescription,
         status: "pending",
         date: new Date()
      }

      onAddOrderData(newOrderData)
   }

   return (
      <TabsContent value="card" className="gap-4 px-1 py-2 h-72">
         <form onSubmit={handleSubmit(handleAddNewOrder)} className="grid grid-cols-[auto_1fr] gap-4">
            <InterativeCredicCard
               method={FormattedMethod}
               cardNumber={cardNumberValue}
               cardOwnerName={cardOwnerName}
               expirationMonth={expirationM}
               expirationYear={expirationY}
            />

            <div className="flex flex-col justify-between">
               <Input
                  type="text"
                  placeholder="Nome no cartão"
                  {...register("cardName")}
               />

               <Input
                  type="text"
                  maxLength={19}
                  value={watch("cardNumber")}
                  onChange={(e) => onFormatCardNumber(e, setValue)}
                  placeholder="Número do cartão"
               />

               <div className="grid grid-cols-2 gap-3">
                  <Input
                     type="text"
                     maxLength={3}
                     placeholder="CVV"
                     {...register("verificationCode")}
                  />

                  <div className="grid grid-cols-[64px_auto_64px] gap-1 items-center">
                     <Select onValueChange={(value) => setValue("expirationM", value)}>
                        <SelectTrigger>
                           <SelectValue placeholder="MM" />
                        </SelectTrigger>

                        <SelectContent>
                           {Array.from({ length: 12 }, (_, i) => {
                              const month = (i + 1).toString().padStart(2, "0")

                              return (
                                 <SelectItem key={month} value={`${month}`}>
                                    {month}
                                 </SelectItem>
                              )
                           })}
                        </SelectContent>
                     </Select>

                     <span className="text-muted text-xl">/</span>

                     <Select onValueChange={(value) => setValue("expirationY", value)}>
                        <SelectTrigger>
                           <SelectValue placeholder="YY" />
                        </SelectTrigger>

                        <SelectContent>
                           {Array.from({ length: 12 }, (_, i) => {
                              const year = new Date().getFullYear() %  100 + i

                              return (
                                 <SelectItem key={year} value={`${year}`}>
                                    {year}
                                 </SelectItem>
                              )
                           })}
                        </SelectContent>
                     </Select>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-3">
                  <Input
                     type="text"
                     maxLength={14}
                     value={watch("ownerCPF")}
                     onChange={(e) => onFormatCPF(e, setValue)}
                     placeholder="CPF"
                  />

                  <Select onValueChange={(value) => setValue("method", value)} >
                     <SelectTrigger>
                        <SelectValue placeholder="Método" />
                     </SelectTrigger>

                     <SelectContent>
                        <SelectItem value="credit">Crédito</SelectItem>
                        <SelectItem value="debit">Débito</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
            </div>

            <HandleBackButton />

            <Button size="lg" type="submit" className="mt-3">
               <ShoppingCart />
               Finalizar pedido
            </Button>
         </form>
      </TabsContent>
   )
}