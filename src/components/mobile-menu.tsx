import {
   Home,
   LogOut,
   ConciergeBell,
   UtensilsCrossed,
   ChartNoAxesCombined
} from "lucide-react";

import { NavLink } from "./nav-link";
import { Button } from "./ui/button";
import { SheetContent, SheetTitle } from "./ui/sheet";

import { useContext } from "react";
import { AppMainContext } from "@/contexts/app-main-context";

import { useNavigate } from "react-router-dom";

export function MobileMenu() {
   const { user } = useContext(AppMainContext)

   const navigate = useNavigate()

   function handleSignOut() {
      localStorage.removeItem("@eatsy:user")

      navigate("/")
      location.reload()
   }
   
   return (
      <SheetContent className="grid grid-rows-[auto_auto_1fr_auto]">
         <SheetTitle className="text-3xl">
            Menu
         </SheetTitle>

         <div className="text-muted-foreground tracking-wide">
            <p className="text-md font-semibold">{user?.name}</p>
            <span className="font-normal text-sm">{user?.email}</span>
         </div>

         <div className="py-6 space-y-4 border-y-2 flex-1">
            <NavLink to="/">
               <Home className="h-4 w-4 mr-1" />
               <span className="text-xl tracking-wide">Início</span>
            </NavLink>

            <NavLink to="/orders">
               <ConciergeBell className="h-4 w-4 mr-1" />
               <span className="text-xl tracking-wide">Pedidos</span>
            </NavLink>

            {
               user?.role === "admin" && (
                  <>
                  <NavLink to="/manage-plates">
                     <UtensilsCrossed className="h-4 w-4 mr-1" />
                     <span className="text-xl tracking-wide">Gerenciar Pratos</span>
                  </NavLink>

                  <NavLink to="/dashboard">
                     <ChartNoAxesCombined className="h-4 w-4 mr-1" />
                     <span className="text-xl tracking-wide">Dashboard</span>
                  </NavLink>
                  </>
               )
            }
         </div>

         <div className="pb-2">
            <Button variant={"link"} onClick={handleSignOut} className="p-0 m-0">
               <LogOut size={32} />
               <span className="text-xl tracking-wide">Sair da conta</span>
            </Button>
         </div>
      </SheetContent>
   )
}