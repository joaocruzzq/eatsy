import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { AddNewPlate } from "./components/add-new-plate";
import { PlateManagementCard } from "./components/plate-management-card";

export function ManagePlates() {
   return (
      <div>
         <Helmet title="Gerenciar Pratos" />
         
         <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Gerenciar Pratos</h1>

            <div className="text-muted-foreground w-44">
               <Select>
                  <SelectTrigger>
                     <div className="flex items-center gap-1">
                        <Filter size={16} className="mr-1" />
                        <SelectValue placeholder="Filtrar categoria"/>
                     </div>
                  </SelectTrigger>

                  <SelectContent>
                     <SelectItem value="all">Todos</SelectItem>
                     <SelectItem value="refeicao">Refeições</SelectItem>
                     <SelectItem value="sobremesa">Sobremesas</SelectItem>
                     <SelectItem value="bebida">Bebidas</SelectItem>
                  </SelectContent>
               </Select>
            </div>
         </div>

         <div className="grid grid-cols-5 mt-5 gap-x-5 gap-y-10">
            <AddNewPlate />
            <PlateManagementCard />
            <PlateManagementCard />
            <PlateManagementCard />
            <PlateManagementCard />
         </div>
      </div>
   )
}