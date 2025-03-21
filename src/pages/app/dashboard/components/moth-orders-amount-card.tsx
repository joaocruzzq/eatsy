import { Utensils } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useContext } from "react";
import { DashboardContext } from "@/contexts/dashboard-context";

export function MonthOrdersAmountCard() {
   const { ordersThisMonth, ordersLastMonth } = useContext(DashboardContext)

   const counterThisMonth = ordersThisMonth.length
   const counterLastMonth = ordersLastMonth.length

   const ordersMonthPercentage = Math.floor(counterLastMonth > 0 ? ((counterThisMonth - counterLastMonth) / counterLastMonth) * 100 : counterThisMonth * 100)

   return (
      <Card>
         <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">
               Pedidos (mês)
            </CardTitle>

            <Utensils className="h-4 w-4 text-muted-foreground" />
         </CardHeader>

         <CardContent className="space-y-1">
            <span className="text-2xl font-bold">
               {ordersThisMonth.length}
            </span>

            <p className="text-xs text-muted-foreground">
               <span className={`${ordersMonthPercentage > 0 ? "text-emerald-500 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
                  {ordersMonthPercentage > 0 ? `+${ordersMonthPercentage}` : `${ordersMonthPercentage}`}%
               </span> em relação ao mês passado
            </p>
         </CardContent>
      </Card>
   )
}