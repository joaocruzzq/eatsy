import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "@/lib/axios";
import { OrderType } from "./orders-context";

interface DashboardContextType {
   ordersToday: OrderType[]
   ordersLastMonth: OrderType[]
}

interface DashboardContextProviderProps {
   children: ReactNode
}

export const DashboardContext = createContext({} as DashboardContextType)

export function DashboardContextProvider({ children }: DashboardContextProviderProps) {
   const [ordersToday, setOrdersToday] = useState<OrderType[]>([])
   const [ordersLastMonth, setOrdersLastMonth] = useState<OrderType[]>([])

   async function getRevenueData() {
      const today = new Date()

      const pastDate = new Date()
      pastDate.setDate(today.getDate() - 30)

      const { data: orders } = await api.get<OrderType[]>("/orders")

      const todayOrders = orders.filter((order) => order.date === new Date())

      setOrdersToday(todayOrders)

      const lastMonthOrders = orders.filter((order) => {
         const orderDate = new Date(order.date)
         return orderDate >= pastDate && orderDate <= today
      })

      setOrdersLastMonth(lastMonthOrders)
   }

   useEffect(() => {
      getRevenueData()
   }, [])

   return (
      <DashboardContext.Provider
         value={{
            ordersToday,
            ordersLastMonth
         }}
      >
         { children }
      </DashboardContext.Provider>
   )
}