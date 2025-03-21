import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { api } from "@/lib/axios";
import { OrdersContext, OrderType } from "./orders-context";

interface DashboardContextType {
   ordersToday: OrderType[]
   ordersYesterday: OrderType[]
   ordersThisMonth: OrderType[]
   ordersLastMonth: OrderType[]
}

interface DashboardContextProviderProps {
   children: ReactNode
}

export const DashboardContext = createContext({} as DashboardContextType)

export function DashboardContextProvider({ children }: DashboardContextProviderProps) {
   const { orders } = useContext(OrdersContext)

   const [ordersToday, setOrdersToday] = useState<OrderType[]>([])
   
   const [ordersYesterday, setOrdersYesterday] = useState<OrderType[]>([])

   const [ordersThisMonth, setOrdersThisMonth] = useState<OrderType[]>([])

   const [ordersLastMonth, setOrdersLastMonth] = useState<OrderType[]>([])

   async function getRevenueData() {
      const { data } = await api.get<OrderType[]>("/orders")

      const today = new Date()

      const todayOrders = data.filter((order) => {
         return new Date(order.date).toDateString() === today.toDateString()
      })

      setOrdersToday(todayOrders)

      const yesterday = new Date()
      yesterday.setDate(today.getDate() - 1)

      const yesterdayOrders = data.filter((order) => {
         return new Date(order.date).toDateString() === yesterday.toDateString()
      })

      setOrdersYesterday(yesterdayOrders)

      const thisMonth = today.getMonth()

      const thisMonthOrders = data.filter((order) => {
         return new Date(order.date).getMonth() === thisMonth
      })

      setOrdersThisMonth(thisMonthOrders)

      const lastMonth = thisMonth === 0 ? 11 : thisMonth -1

      const lastMonthOrders = data.filter((order) => {
         return new Date(order.date).getMonth() === lastMonth
      })

      setOrdersLastMonth(lastMonthOrders)
   }

   useEffect(() => {
      getRevenueData()
   }, [orders])

   return (
      <DashboardContext.Provider
         value={{
            ordersToday,
            ordersYesterday,
            ordersThisMonth,
            ordersLastMonth
         }}
      >
         { children }
      </DashboardContext.Provider>
   )
}