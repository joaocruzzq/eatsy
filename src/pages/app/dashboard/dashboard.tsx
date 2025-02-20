import { Helmet } from "react-helmet-async";

import { RevenueChart } from "./components/revenue-chart";
import { PopularProductsChart } from "./components/popular-products-chart";

import { MothRevenueCard } from "./components/moth-revenue-card";
import { DayOrdersAmountCard } from "./components/day-orders-amount-card";
import { MonthOrdersAmountCard } from "./components/moth-orders-amount-card";
import { MonthCanceledOrdersAmountCard } from "./components/month-canceled-orders-amount-card";

export function DashBoard() {
   return (
      <div className="flex flex-col gap-5">
         <Helmet title="Dashboard" />
         
         <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

         <div className="grid grid-cols-4 gap-4">
            <MothRevenueCard />
            <MonthOrdersAmountCard />
            <DayOrdersAmountCard />
            <MonthCanceledOrdersAmountCard />
         </div>

         <div className="grid grid-cols-9 gap-4">
            <RevenueChart />
            <PopularProductsChart />
         </div>
      </div>
   )
}