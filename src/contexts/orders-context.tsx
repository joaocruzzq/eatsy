import { toast } from "sonner";
import { api } from "@/lib/axios";

import { CustomerCartContext } from "./customer-cart-context";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type OrderStatus = "pending" | "preparing" | "delivered"

interface OrderType {
   id: number
   date: Date
   status: OrderStatus
   description: {
      plateName: string
      plateQuantity: number
   }
}

interface OrdersContextType {
   orders: OrderType[]

   ordersFilter: string
   filteredOrders: OrderType[]

   onFilterOrders: (status: string) => void
   onAddNewOrder: (data: OrderType) => void
}

interface OrdersContextProviderProps {
   children: ReactNode
}

export const OrdersContext = createContext({} as OrdersContextType)

export function OrdersContextProvider({ children }: OrdersContextProviderProps) {
   const { customerOrder, onRemoveItemFromCart } = useContext(CustomerCartContext)

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

   const [ordersFilter, setOrdersFilter] = useState("")

   const filteredOrders = orders.filter((order) => {
      if(ordersFilter === "") {
         return true
      }

      return order.status === ordersFilter
   })

   function onFilterOrders(status: string) {
      setOrdersFilter(status === "all" ? "" : status)
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
      }

      if (customerOrder.length > 0) {
         try {
            await api.post("/orders", newOrder)
            toast.success("Pedido feito com sucesso!")
         }
   
         catch {
            toast.error("Erro ao finalizar pedido.")
         }
      }

      else {
         toast.error("O carrinho se encontra vazio.")
      }

      onRemoveItemFromCart([])
   }

   useEffect(() => {
      fetchOrders()
   }, [orders])

   return (
      <OrdersContext.Provider
         value={{
            orders,
            ordersFilter,
            filteredOrders,
            onFilterOrders,
            onAddNewOrder,
         }}
      >
         { children }
      </OrdersContext.Provider>
   )
}