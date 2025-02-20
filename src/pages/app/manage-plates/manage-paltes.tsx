import { Filter } from "lucide-react";

import { useContext } from "react";

import { Helmet } from "react-helmet-async";

import { NewPlateModal } from "./components/new-plate-modal";
import { AddNewPlateButton } from "./components/add-new-plate-button";
import { PlateManagementCard } from "./components/plate-management-card";

import { AppMainContext } from "@/contexts/app-main-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogHeader, DialogTitle, DialogTrigger, DialogContent } from "@/components/ui/dialog";

export function ManagePlates() {
   const { categoryFilter, filteredPlates, onChangeFilter } = useContext(AppMainContext)

   return (
      <div>
         <Helmet title="Gerenciar Pratos" />
         
         <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Gerenciar Pratos</h1>

            <div className="text-muted-foreground w-[168px]">
               <Select onValueChange={onChangeFilter} value={categoryFilter}>
                  <SelectTrigger>
                     <div className="flex items-center gap-1">
                        <Filter size={16} className="mr-1" />
                        <SelectValue placeholder="Filtrar categoria"/>
                     </div>
                  </SelectTrigger>

                  <SelectContent>
                     <SelectItem value="all">Todos os pratos</SelectItem>
                     <SelectItem value="Refeição">Refeições</SelectItem>
                     <SelectItem value="Sobremesa">Sobremesas</SelectItem>
                     <SelectItem value="Bebida">Bebidas</SelectItem>
                  </SelectContent>
               </Select>
            </div>
         </div>

         <div className="grid grid-cols-5 mt-5 gap-x-5 gap-y-10">
            <Dialog>
               <DialogTrigger asChild>
                  <AddNewPlateButton />
               </DialogTrigger>

               <DialogContent>
                  <DialogHeader>
                     <DialogTitle>
                        Adicionar um novo prato
                     </DialogTitle>
                  </DialogHeader>

                  <NewPlateModal />
               </DialogContent>
            </Dialog>

            {filteredPlates.map((plate) => {
               return (
                  <PlateManagementCard
                     key={plate.id}
                     plateInfo={plate}
                  />
               )
            })}
         </div>
      </div>
   )
}