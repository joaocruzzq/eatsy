import { CreditCard, DollarSign, QrCode } from "lucide-react";

import { Helmet } from "react-helmet-async";

import { MethodCard } from "./components/method-card";

import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MethodCash } from "./components/method-cash";
import { MethodPix } from "./components/method-pix";

export function OrderPayment() {
   return (
      <>
         <Helmet title="Finalizar Pedido" />

         <div className="grid grid-cols-7 gap-6 my-4">
            <Card className="col-span-4">
               <CardHeader>
                  <CardTitle className="text-xl">
                     Método de pagamento
                  </CardTitle>

                  <CardDescription>
                     Adicione um novo método de pagamento.
                  </CardDescription>

                  <Tabs defaultValue="card" className="pt-4 space-y-4">
                     <TabsList className="grid grid-cols-3 gap-3 flex-1 h-fit bg-transparent">
                        <TabsTrigger value="card" className="flex flex-col gap-1 py-5 justify-center border border-muted data-[state=active]:bg-muted/40" >
                           <CreditCard />
                           Cartão
                        </TabsTrigger>

                        <TabsTrigger value="cash" className="flex flex-col gap-1 py-5 justify-center border border-muted data-[state=active]:bg-muted/40" >
                           <DollarSign />
                           Dinheiro
                        </TabsTrigger>

                        <TabsTrigger value="pix" className="flex flex-col gap-1 py-5 justify-center border border-muted data-[state=active]:bg-muted/40" >
                           <QrCode />
                           Pix
                        </TabsTrigger>
                     </TabsList>

                     <MethodCard />

                     <MethodCash />

                     <MethodPix />
                  </Tabs>
               </CardHeader>
            </Card>
         </div>
      </>
   )
}