import colors from "tailwindcss/colors"

import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useContext } from "react";
import { OrdersContext } from "@/contexts/orders-context";

export function RevenueChart() {
   const { orders } = useContext(OrdersContext)

   const graphicDateFormatter = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit"
   })

   const filter7LastDays = Array(7).fill(null).map((_, index) => {
      const today = new Date()

      today.setDate(today.getDate() - (6 - index))
      return graphicDateFormatter.format(today)
   })

   const revenueData = filter7LastDays.map((date) => {
      const filterRevenue = orders
      .filter((order) => graphicDateFormatter.format(new Date(order.date)) === date)
      .reduce((acc, order) => isNaN(Number(order.total)) ? acc : acc + Number(order.total), 0)

      return {
         date,
         revenue: filterRevenue
      }
   })

   return (
      <Card className="col-span-6">
         <CardHeader className="flex-row items-center justify-between pb-8">
            <div className="space-y-1">
               <CardTitle className="text-base font-medium">
                  Receita no período
               </CardTitle>

               <CardDescription>
                  Receita diária no período
               </CardDescription>
            </div>
         </CardHeader>

         <CardContent>
            <ResponsiveContainer width="100%" height={240}>
               <LineChart data={revenueData} style={{ fontsize: 12 }}>
                  <XAxis
                     dataKey="date"
                     tickLine={false}
                     axisLine={false}
                     dy={16}
                  />

                  <YAxis
                     stroke="#888"
                     axisLine={false}
                     tickLine={false}
                     width={90}
                     tickFormatter={(value: number) =>
                        value.toLocaleString("pt-BR", {
                           style: "currency",
                           currency: "BRL"
                        })
                     }
                  />

                  <CartesianGrid vertical={false} className="stroke-muted" />

                  <Line type="linear" strokeWidth={2} dataKey="revenue" stroke={colors.orange[600]} />
               </LineChart>
            </ResponsiveContainer>
         </CardContent>
      </Card>
   )
}