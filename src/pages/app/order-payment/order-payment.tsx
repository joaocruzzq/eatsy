import { ClipboardPen, CreditCard, DollarSign, HousePlus, QrCode } from "lucide-react";

import { Helmet } from "react-helmet-async";

import { MethodPix } from "./components/method-pix";
import { MethodCash } from "./components/method-cash";
import { MethodCard } from "./components/method-card";
import { OrderPlateCard } from "@/components/order-plate-card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useContext, useState } from "react";
import { AppMainContext } from "@/contexts/app-main-context";


import * as z from "zod"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const AddressFormSchema = z.object({
   CEP: z.string(),
   city: z.string(),
   state: z.string(),
   street: z.string(),
   number: z.string(),
   neighborhood: z.string(),
   complement: z.string().optional(),
   additionalInfo: z.string().optional()
})

type AddressInputs = z.infer<typeof AddressFormSchema>

const BrazilianStates = [
   'AC',
   'AL',
   'AP',
   'AM',
   'BA',
   'CE',
   'DF',
   'ES',
   'GO',
   'MA',
   'MS',
   'MT',
   'MG',
   'PA',
   'PB',
   'PR',
   'PE',
   'PI',
   'RJ',
   'RN',
   'RS',
   'RO',
   'RR',
   'SC',
   'SP',
   'SE',
   'TO',
]

export function OrderPayment() {
   const { customerOrder } = useContext(AppMainContext)

   const { register, control, handleSubmit, watch, reset } = useForm<AddressInputs>({
      resolver: zodResolver(AddressFormSchema)
   })

   const { CEP, city, neighborhood, number, state, street} = watch()
   const isAddressInputsEmpty = !CEP || !city || !neighborhood || !number || !state || !street

   const [address, setAddress] = useState<AddressInputs>()

   function handleAddAddress(data: AddressInputs) {
      try {
         setAddress(data)
         toast.success("Endereço adicionado com sucesso!")

         reset()
      }
   
      catch {
         toast.error("Endereço inválido. Verifique os campos e tente novamente.")
      }
   }

   return (
      <>
         <Helmet title="Finalizar Pedido" />

         <div className="grid grid-cols-7 gap-6 my-auto">
            <Tabs defaultValue="deliveryInfo" className="col-span-4 space-y-3">
               <TabsList className="grid grid-cols-2 h-fit">
                  <TabsTrigger value="deliveryInfo" className="p-2">
                     Entrega
                  </TabsTrigger>

                  <TabsTrigger value="paymentMethod" className="p-2">
                     Pagamento
                  </TabsTrigger>
               </TabsList>

               <TabsContent value="deliveryInfo">
                  <Card>
                     <CardHeader>
                        <CardTitle className="text-xl">
                           Endereço de entrega
                        </CardTitle>

                        <CardDescription>
                           Informe o endereço onde deseja receber seu pedido.
                        </CardDescription>
                     </CardHeader>

                     <CardContent>
                        <form onSubmit={handleSubmit(handleAddAddress)} className="flex flex-col h-full gap-5">
                           <div className="grid grid-cols-6 gap-4">
                              <Input
                                 type="text"
                                 placeholder="CEP"
                                 className="col-span-2"
                                 {...register("CEP")}
                              />

                              <Input
                                 type="text"
                                 placeholder="Rua"
                                 className="col-span-6"
                                 {...register("street")}
                              />
                           </div>

                           <div className="grid grid-cols-6 gap-3">
                              <Input
                                 type="text"
                                 placeholder="Número"
                                 className="col-span-2"
                                 {...register("number")}
                              />

                              <Input
                                 type="text"
                                 placeholder="Complemento"
                                 className="col-span-4"
                                 {...register("complement")}
                              />
                           </div>

                           <div className="grid grid-cols-6 gap-3">
                              <Input
                                 type="text"
                                 placeholder="Bairro"
                                 className="col-span-2"
                                 {...register("neighborhood")}
                              />
                              
                              <div className="grid col-span-4 grid-cols-5 gap-3">
                                 <Input
                                    type="text"
                                    placeholder="Cidade"
                                    className="col-span-4"
                                    {...register("city")}
                                 />

                                 <Controller
                                    name="state"
                                    control={control}
                                    render={({ field }) => (
                                       <Select value={field.value} onValueChange={field.onChange}>
                                          <SelectTrigger>
                                             <SelectValue placeholder="UF" />
                                          </SelectTrigger>

                                          <SelectContent>
                                             {
                                                BrazilianStates.map((state, i) => (
                                                   <SelectItem key={i} value={state}>
                                                      {state}
                                                   </SelectItem>
                                                ))
                                             }
                                          </SelectContent>
                                       </Select>
                                    )}
                                 />
                              </div>
                           </div>

                           <Textarea
                              rows={4}
                              className="h-full resize-none"
                              {...register("additionalInfo")}
                              placeholder="Observações adicionais"
                           />
                           
                           <div className="w-52 ml-auto mt-1">
                              <Button type="submit" disabled={isAddressInputsEmpty} className="w-full transition" variant={"secondary"} size={"lg"}>
                                 <HousePlus />
                                 Adicionar endereço
                              </Button>
                           </div>
                        </form>
                     </CardContent>
                  </Card>
               </TabsContent>

               <TabsContent value="paymentMethod">
                  <Card className="col-span-7">
                     <CardHeader>
                        <CardTitle className="text-xl">
                           Método de pagamento
                        </CardTitle>

                        <CardDescription>
                           Escolha o método de pagamento abaixo.
                        </CardDescription>
                     </CardHeader>

                     <CardContent>
                        <Tabs defaultValue="card" className="grid grid-rows-[auto_1fr] m-0 gap-4">
                           <TabsList className="grid grid-cols-3 gap-3 h-fit bg-transparent p-0">
                              <TabsTrigger value="card" className="grid gap-1 py-5 border border-muted data-[state=active]:bg-muted/40">
                                 <CreditCard className="mx-auto" />
                                 Cartão
                              </TabsTrigger>

                              <TabsTrigger value="cash" className="grid gap-1 py-5 border border-muted data-[state=active]:bg-muted/40">
                                 <DollarSign className="mx-auto" />
                                 Dinheiro
                              </TabsTrigger>

                              <TabsTrigger value="pix" className="grid gap-1 py-5 border border-muted data-[state=active]:bg-muted/40">
                                 <QrCode className="mx-auto" />
                                 Pix
                              </TabsTrigger>
                           </TabsList>

                           <TabsContent value="card">
                              <MethodCard />
                           </TabsContent>

                           <TabsContent value="cash">
                              <MethodCash />
                           </TabsContent>

                           <TabsContent value="pix">
                              <MethodPix />
                           </TabsContent>
                        </Tabs>
                     </CardContent>
                  </Card>
               </TabsContent>
            </Tabs>

            <Card className="col-span-3 grid grid-rows-[auto_1fr] ">
               <CardHeader>
                  <CardTitle className="text-xl">
                     Resumo do pedido
                  </CardTitle>

                  <CardDescription>
                     Confira abaixo os itens selecionados
                  </CardDescription>
               </CardHeader>

               <CardContent className="grid grid-rows-[1fr_auto]">
                  <div className="grid grid-cols-2 gap-6 border-muted border-y-2 pt-8 pb-2 justify-between">
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
                           <div className="flex flex-col col-span-2 gap-6 text-muted justify-center items-center h-full">
                              <ClipboardPen size={96} className="mx-auto opacity-50" strokeWidth={1}/>

                              <span className="text-lg text-center leading-5">
                                 Ainda não há <br /> itens no pedido.
                              </span>
                           </div>
                        )
                     }
                  </div>

                  <div className="flex mt-auto justify-between py-3">
                     <span>Total</span>

                     <span className="text-sm">R$
                        <strong className="text-xl"> 00,00</strong>
                     </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-1">
                     {/* <HandleBackButton /> */}
                     {/* <FinishOrderButton /> */}
                  </div>
               </CardContent>
            </Card>
         </div>
      </>
   )
}