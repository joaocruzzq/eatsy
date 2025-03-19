import { Utensils } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useContext } from "react";
import { DashboardContext } from "@/contexts/dashboard-context";

export function DayOrdersAmountCard() {
   const { ordersToday, ordersYesterday } = useContext(DashboardContext)

   const counterToday = ordersToday.length
   const counterYesterday = ordersYesterday.length

   const ordersDayPercentage = counterYesterday > 0 ? ((counterToday - counterYesterday) / counterYesterday) * 100 : counterToday * 100

   return (
      <Card>
         <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">
               Pedidos (dia)
            </CardTitle>

            <Utensils className="h-4 w-4 text-muted-foreground" />
         </CardHeader>

         <CardContent className="space-y-1">
            <span className="text-2xl font-bold">
               {ordersToday.length}
            </span>

            <p className="text-xs text-muted-foreground">
               <span className={`${ordersDayPercentage > 0 ? "text-emerald-500 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"}`}>
                  {ordersDayPercentage > 0 ? `+${ordersDayPercentage}` : `-${ordersDayPercentage}`}%
               </span> em relação a ontem
            </p>
         </CardContent>
      </Card>
   )
}