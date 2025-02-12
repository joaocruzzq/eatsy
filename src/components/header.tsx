import { ChartNoAxesCombined, CookingPot, Home, UtensilsCrossed } from "lucide-react";

import { NavLink } from "./nav-link";
import { Separator } from "./ui/separator";
import { AccountMenu } from "./account-menu";
import { ThemeToggle } from "./theme/theme-toggle";

export function Header() {
   return (
      <div className="border-b ">
         <div className="flex h-16 items-center gap-6 px-6 max-w-screen-xl mx-auto">
            <div className="flex gap-3 items-center">
               <CookingPot className="h-6 w-6" />

               <div className="flex flex-col center">
                  <h1 className="text-lg leading-4 font-semibold">
                     Eatsy
                  </h1>

                  <span className="text-xs leading-3 text-indigo-500 dark:text-indigo-400">
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

               <NavLink to="/pedidos">
                  <UtensilsCrossed className="h-4 w-4" />
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