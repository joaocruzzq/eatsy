import { DollarSign } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useContext } from "react";
import { DashboardContext } from "@/contexts/dashboard-context";

export function MothRevenueCard() {
   const { ordersLastMonth } = useContext(DashboardContext)

   const monthRevenue = ordersLastMonth.reduce((acc, order) => acc + Number(order.total) || 0, 0)

   return (
      <Card>
         <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">
               Receita total (mês)
            </CardTitle>

            <DollarSign className="h-4 w-4 text-muted-foreground" />
         </CardHeader>

         <CardContent className="space-y-1">
            <span className="text-2xl font-bold">
               R$ {monthRevenue.toFixed(2)}
            </span>

            <p className="text-xs text-muted-foreground">
               <span className="text-emerald-500 dark:text-emerald-400">+2%</span> em relação ao mês passado
            </p>
         </CardContent>
      </Card>
   )
}