import colors from "tailwindcss/colors"

import { BarChart } from "lucide-react";

import { ResponsiveContainer, Pie, PieChart, Cell } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useContext } from "react";
import { OrdersContext } from "@/contexts/orders-context";

const COLORS = [
   colors.red[500],
   colors.orange[500],
   colors.amber[500],
   colors.green[500],
   colors.teal[500],
   colors.indigo[400],
]

type PlateCount = {
   [key: string]: number
}

type DescriptionItem = {
   name: string;
   quantity: number;
 }

export function PopularProductsChart() {
   const { orders } = useContext(OrdersContext)

   const plateCount: PlateCount = orders.reduce((acc, order) => {
      if (Array.isArray(order.description)) {
         order.description.forEach((item: DescriptionItem) => {
            const { name, quantity } = item;
     
            if (name && quantity) {
               acc[name] = (acc[name] || 0) + quantity;
            }
         });
      }

      return acc
   }, {} as PlateCount)

   const revenueData = Object.entries(plateCount)
   .map(([product, amount]) => ({ product, amount}))
   .sort((a, b) => b.amount - a.amount).slice(0, 6)

   return (
      <Card className="col-span-3">
         <CardHeader className="pb-8">
            <div className="flex items-center justify-between">
               <CardTitle className="text-base font-medium">
                  Produtos populares
               </CardTitle>

               <BarChart className="w-4 h-4 text-muted-foreground" />
            </div>
         </CardHeader>

         <CardContent>
            <ResponsiveContainer width="100%" height={240}>
               <PieChart style={{ fontsize: 12 }}>
                  <Pie
                     data={revenueData}
                     dataKey="amount"
                     nameKey="product"
                     cx="50%"
                     cy="50%"
                     strokeWidth={6}
                     labelLine={false}
                     label={({
                        cx,
                        cy,
                        midAngle,
                        innerRadius,
                        outerRadius,
                        value,
                        index,
                      }) => {
                        const RADIAN = Math.PI / 180
                        const radius = 12 + innerRadius + (outerRadius - innerRadius)
                        const x = cx + radius * Math.cos(-midAngle * RADIAN)
                        const y = cy + radius * Math.sin(-midAngle * RADIAN)
                      
                        return (
                          <text
                            x={x}
                            y={y}
                            className="fill-muted-foreground text-xs"
                            textAnchor={x > cx ? 'start' : 'end'}
                            dominantBaseline="central"
                          >
                            {revenueData[index].product.length > 12
                              ? revenueData[index].product.substring(0, 8).concat('...')
                              : revenueData[index].product}{' '}
                            ({value})
                          </text>
                        )
                      }}
                  >
                     {revenueData.map((_, index) => {
                        return (
                           <Cell key={`cell-${index}`} fill={COLORS[index]} className="stroke-background hover:opacity-80 transition-opacity" />
                        )
                     })}
                  </Pie>
               </PieChart>
            </ResponsiveContainer>
         </CardContent>
      </Card>
   )
}