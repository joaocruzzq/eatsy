import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";

import { ResponsiveContainer, Pie, PieChart, Cell } from "recharts"

import colors from "tailwindcss/colors"

const revenueData = [
   { product: "Prato 01", amount: 40 },
   { product: "Prato 02", amount: 30 },
   { product: "Prato 03", amount: 50 },
   { product: "Prato 04", amount: 16 },
   { product: "Prato 05", amount: 26 },
]

const COLORS = [
   colors.sky[600],
   colors.amber[600],
   colors.violet[600],
   colors.emerald[600],
   colors.rose[600],
]

export function PopularProductsChart() {
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
                              ? revenueData[index].product.substring(0, 12).concat('...')
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