import { useContext } from "react"
import { OrdersContext } from "@/contexts/orders-context"
import { Label } from "@/components/ui/label"

interface OrderDetailsProps {
   orderId: number
}

export function OrderDetails({ orderId }: OrderDetailsProps) {
   const { orders } = useContext(OrdersContext)

   const orderToShow = orders.find((order) => order.id === orderId)

   const formattedPaymentMethod =
   orderToShow?.payment.method === "pix" ? "Pix" :
   orderToShow?.payment.method === "card" ? "Cartão" :
   orderToShow?.payment.method === "cash" && "Dinheiro"

   return (
      <div className="font-mono">
         <div className="px-4 py-2 bg-muted/50 rounded-md text-sm">
            {Array.isArray(orderToShow?.description) && (
               orderToShow.description.map((order) => `${order.quantity} x ${order.name}`).join(", ")
            )}
         </div>

         <div className="grid space-y-3 py-4">
            <div>
               <Label className="text-muted-foreground font-normal">
                  Método de pagamento: 
               </Label>

               <span className="text-sm tracking-wide">
                  {" "}{formattedPaymentMethod}
               </span>

               {orderToShow?.payment.method === "cash" && (
                  <div>
                     <Label className="text-muted-foreground font-normal">
                        Troco do cliente:
                     </Label>

                     <span className="text-sm tracking-wide">
                        {" "} {(orderToShow.payment.cashData - orderToShow.total).toFixed(2)}
                     </span>
                  </div>
               )}
            </div>

            <div className="grid space-y-1">
               <Label className="text-muted-foreground font-normal">
                  Endereço de entrega:
               </Label>

               <span className="text-sm tracking-wide">
                  {orderToShow?.address.street} nº {orderToShow?.address.number}
                  {orderToShow?.address.complement && ` ${orderToShow.address.complement}`},
                  {" "}{orderToShow?.address.neighborhood}
               </span>
            </div>
         </div>
      </div>
   )
}