import { ArrowLeftToLine, ClipboardPen, CreditCard, DollarSign, QrCode, ShoppingCart } from "lucide-react";

import { Helmet } from "react-helmet-async";

import { MethodPix } from "./components/method-pix";
import { MethodCash } from "./components/method-cash";
import { MethodCard } from "./components/method-card";

import { OrderPlateCard } from "@/components/order-plate-card";
import { DeliveryInfoForm } from "./components/delivery-info-form";

import { Button } from "@/components/ui/button";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { OrdersContext } from "@/contexts/orders-context";
import { CustomerCartContext } from "@/contexts/customer-cart-context";

export function OrderPayment() {
   const { onAddNewOrder } = useContext(OrdersContext)
   const { customerOrder } = useContext(CustomerCartContext)

   const { handleSubmit } = useForm()

   function handleAddNewOrder(data: any) {
      onAddNewOrder(data)
      console.log(data)
   }

   const navigate = useNavigate()

   const totalOrderPrice = customerOrder.reduce((acc, plate) => acc + (plate.price * plate.quantity), 0)

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
                  <DeliveryInfoForm />
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

            <Card className="col-span-3 grid grid-rows-[auto_1fr]">
               <CardHeader>
                  <CardTitle className="text-xl">
                     Resumo do pedido
                  </CardTitle>

                  <CardDescription>
                     Confira abaixo os itens selecionados
                  </CardDescription>
               </CardHeader>

               <CardContent>
                  <form onSubmit={handleSubmit(handleAddNewOrder)} className="grid grid-rows-[1fr_auto_auto] h-[438px]">
                     <div className="flex flex-col overflow-y-auto custom-scrollbar pr-3 border-y border-muted py-4 gap-4">
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
                              <div className="flex flex-col col-span-2 gap-6 text-muted justify-center items-center flex-1">
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
                           <strong className="text-xl ml-1">{totalOrderPrice.toFixed(2)}</strong>
                        </span>
                     </div>

                     <div className="grid grid-cols-2 gap-4 mt-1">
                        <Button type="button" variant="outline" size={"lg"} onClick={() => navigate(-1)}>
                           <ArrowLeftToLine />
                           Voltar
                        </Button>

                        <Button type="submit" size={"lg"}>
                           <ShoppingCart />
                           Finalizar pedido
                        </Button>
                     </div>
                  </form>
               </CardContent>
            </Card>
         </div>
      </>
   )
}