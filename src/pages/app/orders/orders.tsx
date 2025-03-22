import { Helmet } from "react-helmet-async"

import { Filter, Search } from "lucide-react"
import { dateFormatter } from "@/utils/formatters"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { OrderDetails } from "./order-details/order-details"
import { OrdersPagination } from "./orders-pagination/orders-pagination"

import { useContext } from "react"
import { OrdersContext } from "@/contexts/orders-context"

export function Orders() {
   const { orders, filteredOrders, ordersFilter, onFilterOrders, onUpdateOrderStatus } = useContext(OrdersContext)

   console.log(orders)

   return (
      <>
         <Helmet title="Pedidos" />

         <div className="grid grid-cols-[1fr_auto] items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

            <Select onValueChange={onFilterOrders} value={ordersFilter}>
               <SelectTrigger className="w-[148px] text-muted-foreground">
                  <div className="flex items-center gap-1">
                     <Filter size={16} className="mr-1" />
                     <SelectValue placeholder="Filtrar status" />
                  </div>
               </SelectTrigger>

               <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="preparing">Em preparo</SelectItem>
                  <SelectItem value="delivered">Entregue</SelectItem>
                  <SelectItem value="canceled">Cancelado</SelectItem>
               </SelectContent>
            </Select>
         </div>

         <div className="grid mt-5 flex-1">
            <table className="grid flex-1">
               {
                  orders.length > 0 ? (
                     <div className="flex flex-col justify-between">
                        <tbody className="grid gap-3 overflow-hidden mb-4">
                           {
                              filteredOrders.map((order) => (
                                 <tr className={`${order.status === "canceled" && "opacity-50"} flex h-fit text-sm border border-muted tracking-wider bg-background rounded-s-lg rounded-e-lg`}>
                                    <td className={`${order.status === "canceled" && "pointer-events-none"} w-[15%] text-center rounded-s-lg p-2.5`}>
                                       <Select value={order.status} onValueChange={(newStatus) => onUpdateOrderStatus(order.id, newStatus)}>
                                          <SelectTrigger>
                                             <SelectValue className="" placeholder="Status" />
                                          </SelectTrigger>
               
                                          <SelectContent>
                                             <SelectItem value="pending">
                                                <span className="inline-block w-2 h-2 rounded-full mr-2 bg-red-500" />
                                                Pendente
                                             </SelectItem>

                                             <SelectItem value="preparing">
                                                <span className="inline-block w-2 h-2 rounded-full mr-2 bg-yellow-500" />
                                                Em preparo
                                             </SelectItem>
                                                            
                                             <SelectItem value="delivered">
                                                <span className="inline-block w-2 h-2 rounded-full mr-2 bg-green-500" />
                                                Entregue
                                             </SelectItem>

                                             <SelectItem value="canceled">
                                                <span className="inline-block w-2 h-2 rounded-full mr-2 bg-stone-500" />
                                                Cancelado
                                             </SelectItem>
                                          </SelectContent>
                                       </Select>
                                    </td>
               
                                    <td className="w-[15%] text-center py-4 px-3">
                                       {order.id}
                                    </td>
               
                                    <td className="flex-1 py-4 px-3 text-justify">
                                       <div className="line-clamp-1">
                                          {
                                             Array.isArray(order.description) && (
                                                order.description
                                                   .map((plate) => `${plate.quantity} x ${plate.name}`)
                                                   .join(", ")
                                             )
                                          }
                                       </div>
                                    </td>
               
                                    <td className="w-[15%] text-center rounded-e-lg py-4 px-3">
                                       {dateFormatter.format(new Date(order.date))}
                                    </td>

                                    <td className="flex items-center justify-center pr-4">
                                       <Dialog>
                                          <DialogTrigger asChild>
                                             <Button variant={"ghost"} size={"icon"}>
                                                <Search />
                                             </Button>
                                          </DialogTrigger>

                                          <DialogContent>
                                             <DialogHeader>
                                                <span>
                                                   Informações do Pedido
                                                </span>

                                                <div className="flex justify-between text-sm text-muted-foreground">
                                                   <span className="font-mono tracking-wide">
                                                      #{order.id}
                                                   </span>

                                                   <span className="text-xs ">
                                                      {dateFormatter.format(new Date(order.date))}
                                                   </span>
                                                </div>
                                             </DialogHeader>

                                             <OrderDetails
                                                orderId={order.id}
                                             />
                                          </DialogContent>
                                       </Dialog>
                                    </td>
                                 </tr>
                              ))
                           }
                        </tbody>

                        <OrdersPagination />
                     </div>
                  ) : (
                     <div className="grid min-h-[70dvh] justify-center items-center border border-dashed border-muted-foreground/50 dark:border-muted/50 rounded-lg">
                        <span className="text-lg text-muted-foreground dark:text-muted">Ainda não há pedidos registrados.</span>
                     </div>
                  )
               }
            </table>
         </div>
      </>
   )
}