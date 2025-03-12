import { InterativeCredicCard } from "./interative-credit-card";

import { toast } from "sonner";
import { Receipt } from "lucide-react";

import { useContext } from "react";
import { CustomerCartContext } from "@/contexts/customer-cart-context";

import { onFormatCPF, onFormatCardNumber } from "@/utils/formatters"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import * as z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const CardDataFormSchema = z.object({
   method: z.string(),
   cardName: z.string().min(1),
   expirationM: z.string().min(2),
   expirationY: z.string().min(2),
   ownerCPF: z.string().length(14),
   cardNumber: z.string().length(19),
   verificationCode: z.string().length(3)
})

type CardInputs = z.infer<typeof CardDataFormSchema>

export function MethodCard() {
   const { watch, register, control, reset, handleSubmit, setValue } = useForm<CardInputs>({
      resolver: zodResolver(CardDataFormSchema)
   })

   const setCardPaymentMethod = watch("method") || "-"
   const formattedPaymentMethod = setCardPaymentMethod === "credit" ? "Crédito" : setCardPaymentMethod === "debit" ? "Débito" : "-"

   const setCardOwnerName = watch("cardName") || "XXXX XXXX XXXX"
   const setCardNumber = watch("cardNumber") || "**** **** **** 0000"

   const setExpirationM = watch("expirationM") || "MM"
   const setExpirationY = watch("expirationM") || "YY"

   const { cardName, cardNumber, expirationM, expirationY, method, ownerCPF, verificationCode} = watch()
   const isCardInputsEmpty = !cardName || !cardNumber || !expirationM || !expirationY || !method || !ownerCPF || !verificationCode

   const { onSetPaymentMethod } = useContext(CustomerCartContext)

   function addCardPayment(data: CardInputs) {
      try {
         onSetPaymentMethod({
            method: "card",
            cardData: data
         })

         toast.success("Método de pagamento aprovado com sucesso!")

         reset()
      }

      catch {
         toast.error("Erro ao adicionar cartão. Tente novamente.")
      }
   }

   return (
      <form onSubmit={handleSubmit(addCardPayment)} className="grid grid-cols-[auto_1fr] gap-4 h-fit">
         <InterativeCredicCard
            method = {formattedPaymentMethod}
            cardNumber = {setCardNumber}
            expirationM = {setExpirationM}
            expirationY = {setExpirationY}
            cardOwnerName = {setCardOwnerName}
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
               value={watch("cardNumber") || ""}
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
                  <Controller 
                     name="expirationM"
                     control={control}
                     render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
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
                     )}
                  />

                  <span className="text-muted text-xl">/</span>

                  <Controller
                     name="expirationY"
                     control={control}
                     render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
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
                     )}
                  />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
               <Input
                  type="text"
                  maxLength={14}
                  value={watch("ownerCPF") || ""}
                  onChange={(e) => onFormatCPF(e, setValue)}
                  placeholder="CPF"
               />

               <Controller
                  name="method"
                  control={control}
                  render={({ field }) => (
                     <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                           <SelectValue placeholder="Método" />
                        </SelectTrigger>

                        <SelectContent>
                           <SelectItem value="credit">Crédito</SelectItem>
                           <SelectItem value="debit">Débito</SelectItem>
                        </SelectContent>
                     </Select>
                  )}
               />
            </div>
         </div>

         <div className="flex justify-start col-span-2 mt-1">
            <Button type="submit" disabled={isCardInputsEmpty} className="ml-auto w-52 transition" variant={"secondary"} size={"lg"}>
               <Receipt />
               Adicionar pagamento
            </Button>
         </div>
      </form>
   )
}