import { ArrowLeftToLine, CreditCard, DollarSign, QrCode, ShoppingCart } from "lucide-react";

import { InterativeCredicCard } from "./components/interative-credit-card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { onFormatCPF, onFormatCardNumber } from "@/utils/formatters"

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

export function OrderPayment() {
   const { watch, register, setValue, handleSubmit } = useForm<CardDataInputs>({
      resolver: zodResolver(CardDataFormSchema)
   })

   const cardPaymentMethod = watch("method") || "-"
   const FormattedMethod = cardPaymentMethod === "credit" ? "Crédito" : cardPaymentMethod === "debit" ? "Débito" : "-"

   const cardNumberValue = watch("cardNumber") || "**** **** **** 0000"

   const cardOwnerName = watch("cardName") || "XXXX XXXX XXXX"

   const expirationM = watch("expirationM") || "MM"
   const expirationY = watch("expirationY") || "YY"

   return (
      <div className="grid grid-cols-7 gap-6 my-8">
         <Card className="col-span-4">
            <CardHeader>
               <CardTitle className="text-xl">
                  Método de pagamento
               </CardTitle>

               <CardDescription>
                  Adicione um novo método de pagamento.
               </CardDescription>

               <Tabs defaultValue="card" className="pt-4 space-y-6">
                  <TabsList className="grid grid-cols-3 gap-3 flex-1 h-fit bg-transparent">
                     <TabsTrigger value="card" className="flex flex-col gap-1 py-3 justify-center border border-muted data-[state=active]:bg-muted/40" >
                        <CreditCard />
                        Cartão
                     </TabsTrigger>

                     <TabsTrigger value="cash" className="flex flex-col gap-1 py-3 justify-center border border-muted data-[state=active]:bg-muted/40" >
                        <DollarSign />
                        Dinheiro
                     </TabsTrigger>

                     <TabsTrigger value="pix" className="flex flex-col gap-1 py-3 justify-center border border-muted data-[state=active]:bg-muted/40" >
                        <QrCode />
                        Pix
                     </TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="grid grid-cols-[auto_1fr] gap-4 px-1 py-2">
                     <InterativeCredicCard
                     method={FormattedMethod}
                     cardNumber={cardNumberValue}
                     cardOwnerName={cardOwnerName}
                     expirationMonth={expirationM}
                     expirationYear={expirationY}
                     />

                     <form onSubmit={handleSubmit(console.log)} className="flex flex-col flex-1 justify-between">
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
                     </form>
                     
                     <Button variant="secondary" className="mt-2 ">
                        <ArrowLeftToLine />
                        Voltar
                     </Button>

                     <Button type="submit" className="mt-2">
                        <ShoppingCart />
                        Finalizar pedido
                     </Button>
                  </TabsContent>
               </Tabs>
            </CardHeader>
         </Card>
      </div>
   )
}