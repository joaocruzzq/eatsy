import { ChartNoAxesCombined, CookingPot, Home, UtensilsCrossed, ConciergeBell } from "lucide-react";

import { Separator } from "./ui/separator";

import { NavLink } from "./nav-link";
import { AccountMenu } from "./account-menu";

import { ThemeToggle } from "./theme/theme-toggle";

export function Header() {
   return (
      <div className="border-b absolute w-full">
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
               <ThemeToggle />

               <AccountMenu />
            </div>
         </div>
      </div>
   )
}