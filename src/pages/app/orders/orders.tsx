import { Helmet } from "react-helmet-async"

import { Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { dateFormatter } from "@/utils/formatters"

import { useContext } from "react"
import { OrdersContext } from "@/contexts/orders-context"
import { OrdersPagination } from "./orders-pagination/orders-pagination"

export function Orders() {
   const { orders, filteredOrders, ordersFilter, onFilterOrders, onUpdateOrderStatus } = useContext(OrdersContext)

   console.log(orders)

   return (
      <>
         <Helmet title="Pedidos" />

         <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

            <div className="text-muted-foreground">
               <Select onValueChange={onFilterOrders} value={ordersFilter}>
                  <SelectTrigger className="w-[148px]">
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
                  </SelectContent>
               </Select>
            </div>
         </div>

         <div className="mt-5">
            <table className="w-full">
               {
                  orders.length > 0 ? (
                     <>
                     <tbody className="grid gap-3 max-h-[552px] overflow-hidden mb-4">
                        {
                           filteredOrders.map((order) => (
                              <tr className="flex text-sm border border-muted tracking-wider bg-background rounded-s-lg rounded-e-lg">
                                 <td className="w-[15%] text-center rounded-s-lg p-2.5">
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
                                       </SelectContent>
                                    </Select>
                                 </td>
            
                                 <td className="w-[15%] text-center py-4 px-3">
                                    {order.id}
                                 </td>
            
                                 <td className="flex-1 py-4 px-3 text-justify">
                                    {
                                       Array.isArray(order.description) && (
                                          order.description
                                             .map((plate) => `${plate.quantity} x ${plate.name}`)
                                             .join(", ")
                                       )
                                    }
                                 </td>
            
                                 <td className="w-[15%] text-center rounded-e-lg py-4 px-3 pr-5">
                                    {dateFormatter.format(new Date(order.date))}
                                 </td>
                              </tr>
                           ))
                        }
                     </tbody>

                     <OrdersPagination />
                     </>
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