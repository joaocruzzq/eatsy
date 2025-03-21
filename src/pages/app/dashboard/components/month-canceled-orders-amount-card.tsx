import { DollarSign } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useContext } from "react";
import { DashboardContext } from "@/contexts/dashboard-context";

export function MonthCanceledOrdersAmountCard() {
   const { ordersThisMonth, ordersLastMonth } = useContext(DashboardContext)

   const canceledThisMonth = ordersThisMonth.filter((order) => {
      return order.status === "canceled"
   })

   const canceledLastMonth = ordersLastMonth.filter((order) => {
      return order.status === "canceled"
   })

   const ordersCanceledThisMonth = canceledThisMonth.length
   const ordersCanceledLastMonth = canceledLastMonth.length

   const canceledPercentage = Math.floor(ordersCanceledLastMonth > 0 ?
      ((ordersCanceledThisMonth - ordersCanceledLastMonth) / ordersCanceledLastMonth) * 100
      : ordersCanceledThisMonth * 100)

   return (
      <Card>
         <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">
               Cancelamentos (mês)
            </CardTitle>

            <DollarSign className="h-4 w-4 text-muted-foreground" />
         </CardHeader>

         <CardContent className="space-y-1">
            <span className="text-2xl font-bold">
               {canceledThisMonth.length}
            </span>

            <p className="text-xs text-muted-foreground">
               <span className={`${canceledPercentage > 0 ? "text-red-500 dark:text-red-400" : "text-emerald-500 dark:text-emerald-400"}`}>
                  {canceledPercentage > 0 ? `+${canceledPercentage}` : `${canceledPercentage}`}%
               </span> em relação ao mês passado
            </p>
         </CardContent>
      </Card>
   )
}