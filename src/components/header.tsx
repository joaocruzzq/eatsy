import { ChartNoAxesCombined, CookingPot, Home, UtensilsCrossed, ConciergeBell, ShoppingCart } from "lucide-react";

import { NavLink } from "./nav-link";
import { OrderCart } from "./order-cart";
import { AccountMenu } from "./account-menu";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Sheet, SheetTrigger } from "./ui/sheet";

import { ThemeToggle } from "./theme/theme-toggle";

import { useContext } from "react";
import { CustomerCartContext } from "@/contexts/customer-cart-context";

export function Header() {
   const { customerOrder } = useContext(CustomerCartContext)

   const totalItemsOnCart = customerOrder.reduce((acc, plate) => acc + plate.quantity, 0)

   return (
      <div className="border-b fixed z-50 w-full select-none bg-transparent backdrop-blur-3xl">
         <div className="flex h-16 items-center gap-6 px-6 max-w-screen-xl mx-auto">
            <div className="flex gap-3 items-center">
               <CookingPot className="h-6 w-6" />

               <div className="flex flex-col center">
                  <h1 className="text-lg leading-4 font-semibold tracking-wide">
                     Eatsy
                  </h1>

                  <span className="text-xs leading-3 text-ring">
                     admin
                  </span>
               </div>
            </div>

            <Separator orientation="vertical" className="h-6" />

            <nav className="flex items-center space-x-4 lg:space-x-6">
               <NavLink to="/">
                  <Home className="h-4 w-4" />
                  Início
               </NavLink>

               <NavLink to="/manage-plates">
                  <UtensilsCrossed className="h-4 w-4" />
                  Gerenciar Pratos
               </NavLink>

               <NavLink to="/orders">
                  <ConciergeBell className="h-4 w-4" />
                  Pedidos
               </NavLink>

               <NavLink to="/dashboard">
                  <ChartNoAxesCombined className="h-4 w-4" />
                  Dashboard
               </NavLink>
            </nav>

            <div className="ml-auto flex items-center gap-2">
               <AccountMenu />
               <ThemeToggle />

               <Sheet>
                  <SheetTrigger>
                     <Button variant="outline" size="icon" className="relative mr-1">
                        {
                           customerOrder.length > 0 && (
                              <div className="flex w-5 h-5 items-center justify-center absolute rounded-full bg-primary -translate-y-[75%] translate-x-[75%]">
                                 {totalItemsOnCart}
                              </div>
                           )
                        }

                        <ShoppingCart />
                     </Button>
                  </SheetTrigger>

                  <OrderCart />
               </Sheet>
            </div>
         </div>
      </div>
   )
}