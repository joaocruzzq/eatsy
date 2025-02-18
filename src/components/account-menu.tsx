import { ChevronDown, LogOut } from "lucide-react";

import { Button } from "./ui/button";
import { NavLink } from "./nav-link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "./ui/dropdown-menu";

export function AccountMenu() {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex select-none items-center gap-2">
               Minha Conta
               <ChevronDown className="h-4 w-4" />
            </Button>
         </DropdownMenuTrigger>

         <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col">
               <span>João Pedro Cruz</span>
               <span className="text-xs font-normal text-muted-foreground">joaocruzzq@icloud.com</span>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <NavLink className="w-full" to="#">
               <DropdownMenuItem className="text-rose-500 dark:text-rose-400 cursor-pointer">
                  <LogOut />
                  <span>Sair da conta</span>
               </DropdownMenuItem>
            </NavLink>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}