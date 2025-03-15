import { HousePlus } from "lucide-react";

import { toast } from "sonner";

import { useContext, useState } from "react";
import { OrdersContext } from "@/contexts/orders-context"; 

import { onFormatCEP } from "@/utils/formatters";
import { BrazilianStatesList } from "@/utils/brazilian-states-list";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

const AddressFormSchema = z.object({
   city: z.string().min(1),
   CEP: z.string().length(9),
   street: z.string().min(1),
   number: z.string().min(1),
   state: z.string().length(2),
   neighborhood: z.string().min(1),
   complement: z.string().optional(),
   additionalInfo: z.string().optional()
})

type AddressInputs = z.infer<typeof AddressFormSchema>

export function DeliveryInfoForm() {
   const { onAddAddress } = useContext(OrdersContext)

   const { register, control, handleSubmit, watch, reset, setValue } = useForm<AddressInputs>({
      resolver: zodResolver(AddressFormSchema)
   })

   const { CEP, city, neighborhood, number, state, street} = watch()
   const isAddressInputsEmpty = !CEP || !city || !neighborhood || !number || !state || !street
   
   const [isDisabled, setIsDisabled] = useState({
      city: false,
      state: false,
      street: false,
      neighborhood: false,
   })

   async function searchAddressByCEP(CEP: string) {
      try {
         const response = await fetch(`https://viacep.com.br/ws/${CEP}/json/`)

         const data = await response.json()

         if(data.erro) {
            return
         }

         else {
            setValue("state", data.uf || "")
            setValue("city", data.localidade || "")
            setValue("street", data.logradouro || "")
            setValue("neighborhood", data.bairro || "")

            setIsDisabled({
               state: !!data.uf,
               city: !!data.localidade,
               street: !!data.logradouro,
               neighborhood: !!data.bairro,
            })
         }
      }

      catch {
         toast.error("Erro ao buscar endereço.")
      }
   }

   function handleCEPChange(e: React.ChangeEvent<HTMLInputElement>) {
      const cepValue = e.target.value
      onFormatCEP(e, setValue)

      if(cepValue.length === 9) {
         searchAddressByCEP(cepValue)
      }

      else {
         setValue("city", "")
         setValue("state", "")
         setValue("street", "")
         setValue("neighborhood", "")

         setIsDisabled({
            city: false,
            state: false,
            street: false,
            neighborhood: false,
         })
      }
   };

   function handleAddAddress(data: AddressInputs) {
      try {
         onAddAddress(data)
         toast.success("Endereço adicionado com sucesso!")

         setIsDisabled({
            city: false,
            state: false,
            street: false,
            neighborhood: false,
         })
         
         reset()
      }
   
      catch {
         toast.error("Endereço inválido. Verifique os campos e tente novamente.")
      }
   }

   return (
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
                     maxLength={9}
                     placeholder="CEP"
                     className="col-span-2"
                     value={watch("CEP")}
                     onChange={handleCEPChange}
                  />

                  <Input
                     type="text"
                     placeholder="Rua"
                     className="col-span-6"
                     {...register("street")}
                     disabled={isDisabled.street}
                  />
               </div>

               <div className="grid grid-cols-6 gap-3">
                  <Input
                     type="number"
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
                     disabled={isDisabled.neighborhood}
                  />
                              
                  <div className="grid col-span-4 grid-cols-5 gap-3">
                     <Input
                        type="text"
                        placeholder="Cidade"
                        className="col-span-4"
                        {...register("city")}
                        disabled={isDisabled.city}
                     />

                     <Controller
                        name="state"
                        control={control}
                        render={({ field }) => (
                           <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger disabled={isDisabled.state}>
                                 <SelectValue placeholder="UF" />
                              </SelectTrigger>

                              <SelectContent>
                                 {
                                    BrazilianStatesList.map((state, i) => (
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
   )
}