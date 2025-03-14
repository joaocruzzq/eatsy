import { toast } from "sonner";
import { api } from "@/lib/axios";

import { CustomerCartContext } from "./customer-cart-context";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type OrderStatus = "pending" | "preparing" | "delivered"

type FilteredDescription = {
   plateName: string
   plateQuantity: number
}

interface OrderType {
   id: number
   date: Date
   status: OrderStatus
   description: FilteredDescription
}

interface OrdersContextType {
   orders: OrderType[]

   ordersFilter: string
   filteredOrders: OrderType[]

   onAddNewOrder: () => void
   onFilterOrders: (status: string) => void

   onUpdateOrderStatus: (orderId: number, newOrderStatus: string) => void
}

interface OrdersContextProviderProps {
   children: ReactNode
}

export const OrdersContext = createContext({} as OrdersContextType)

export function OrdersContextProvider({ children }: OrdersContextProviderProps) {
   const { address, payment, customerOrder, onRemoveItemFromCart } = useContext(CustomerCartContext)

   const [orders, setOrders] = useState<OrderType[]>([])

   async function fetchOrders() {
      const ordersList = await api.get("orders", {
         params: {
            _sort: "date",
            _order: "desc"
         }
      })

      setOrders(ordersList.data)
   }

   console.log(orders)

   const [ordersFilter, setOrdersFilter] = useState("")

   const filteredOrders = orders.filter((order) => {
      if (ordersFilter === "all" || ordersFilter === "") {
         return true;
      }

      return order.status === ordersFilter;
   });
   
   function onFilterOrders(status: string) {
      setOrdersFilter(status === "all" ? "" : status);
   }
   

   async function onAddNewOrder() {
      const formattedDescription = customerOrder.map((item) => ({
         name: item.name,
         quantity: item.quantity
      }))

      const newOrder = {
         date: new Date(),
         status: "pending",
         description: formattedDescription,
         id: Math.floor(Date.now() + Math.random() * 1000),
         
         payment,
         address
      }

      if (customerOrder.length > 0) {
         try {
            await api.post("/orders", newOrder)
            toast.success("Pedido feito com sucesso!")

            onRemoveItemFromCart()
         }
         
         catch {
            toast.error("Erro ao finalizar pedido.")
         }
      }
      
      else {
         toast.error("O carrinho se encontra vazio.")
      }

      fetchOrders()
   }

   async function onUpdateOrderStatus(orderId: number, newOrderStatus: string) {
      try {
         await api.patch(`/orders/${orderId}`, { status: newOrderStatus })
         toast.success("Status alterado com sucesso.")

         fetchOrders()
      }

      catch {
         toast.error("Erro ao atualziar status.")
      }
   }

   useEffect(() => {
      fetchOrders()
   }, [])

   return (
      <OrdersContext.Provider
         value={{
            orders,
            ordersFilter,
            filteredOrders,
            onFilterOrders,
            onAddNewOrder,
            onUpdateOrderStatus,
         }}
      >
         { children }
      </OrdersContext.Provider>
   )
}