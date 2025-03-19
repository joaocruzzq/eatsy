import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "@/lib/axios";
import { OrderType } from "./orders-context";

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

   const [ordersToday, setOrdersToday] = useState<OrderType[]>([])

   const [ordersYesterday, setOrdersYesterday] = useState<OrderType[]>([])

   const [ordersThisMonth, setOrdersThisMonth] = useState<OrderType[]>([])

   const [ordersLastMonth, setOrdersLastMonth] = useState<OrderType[]>([])

   async function getRevenueData() {
      const { data: orders } = await api.get<OrderType[]>("/orders")

      const today = new Date()
      const todayString = today.toDateString()

      const todayOrders = orders.filter((order) => {
         const orderDate = new Date(order.date)
         return orderDate.toDateString() === todayString
      })

      setOrdersToday(todayOrders)

      const yesterday = new Date()
      yesterday.setDate(today.getDate() - 1)

      const yesterdayOrders = orders.filter((order) => {
         const orderDate = new Date(order.date)
         return orderDate === yesterday
      })

      setOrdersYesterday(yesterdayOrders)

      const past30Days = new Date()
      past30Days.setDate(today.getDate() - 30)
      
      const thisMonthOrders = orders.filter((order) => {
         const orderDate = new Date(order.date)
         return orderDate >= past30Days && orderDate <= today
      })

      setOrdersThisMonth(thisMonthOrders)

      const past60Days = new Date()
      past60Days.setDate(today.getDate() - 60)

      const lastMonthOrders = orders.filter((order) => {
         const orderDate = new Date(order.date)
         return orderDate >= past60Days && orderDate <= past30Days
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
            ordersYesterday,
            ordersThisMonth,
            ordersLastMonth
         }}
      >
         { children }
      </DashboardContext.Provider>
   )
}