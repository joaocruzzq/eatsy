import { ChartNoAxesCombined, CookingPot, Home, LogOut, UsersRound, UtensilsCrossed } from "lucide-react";

import { Separator } from "./ui/separator";

import { NavLink } from "./nav-link";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function Header() {
   return (
      <div className="border-b">
         <div className="flex h-16 items-center gap-6 px-6">
            <div className="flex gap-4 items-center">
               <CookingPot className="h-6 w-6" />
               <h1 className="text-lg font-semibold text-indigo-500">Admin</h1>
            </div>

            <Separator orientation="vertical" className="h-6" />

            <nav className="flex w-full justify-between">
               <div className="flex items-center space-x-4 lg:space-x-6">
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

                  <NavLink to="/colaboradores">
                     <UsersRound className="h-4 w-4" />
                     Colaboradores
                  </NavLink>
               </div>

               <div className="flex gap-4">
                  

                  <NavLink to="/sign-in">
                     <LogOut className="h-4 w-4 " />
                     Logout
                  </NavLink>

                  <Button variant={"outline"} asChild >
                     <Link to="/sign-up">
                        Adicionar colaborador
                     </Link>
                  </Button>
               </div>
            </nav>
         </div>
      </div>
   )
}