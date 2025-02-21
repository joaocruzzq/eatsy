import { Plus } from "lucide-react";

import { PlatePhotoInput } from "./plate-photo-input";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function NewPlateModal() {
   return (
      <div>
         <form className="grid gap-4">
            <PlatePhotoInput />

            <div className="grid gap-3">
               <Input type="text" placeholder="Nome do prato" />

               <div className="flex gap-2">
                  <Input type="number" step={0.01} placeholder="R$ 00,00" />

                  <Select >
                     <SelectTrigger>
                        <SelectValue placeholder="Categoria" />
                     </SelectTrigger>

                     <SelectContent>
                        <SelectItem value="Refeição">Refeição</SelectItem>
                        <SelectItem value="Sobremesa">Sobremesa</SelectItem>
                        <SelectItem value="Bebida">Bebida</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               <Textarea placeholder="Utilize esse campo para fazer uma descrição breve sobre o prato." className="resize-none" rows={4} />

               <div className="flex h-full overflow-auto custom-scrollbar gap-2 bg-neutral-200 dark:bg-neutral-900 py-2 px-2.5 rounded-md">
                  <div className="flex gap-0.5 border-2 border-dashed border-muted-foreground rounded-sm h-full px-2 focus-within:border-ring transition">
                     <input type="text" placeholder="ingrediente" className="bg-transparent outline-none text-sm w-[72px]" />

                     <button type="button" className="w-fit">
                        <Plus size={16} />
                     </button>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-2 mt-2">
                  <Button type="button" variant={"secondary"}>
                     Concluir
                  </Button>

                  <DialogClose asChild>
                     <Button type="button" variant={"default"}>Cancelar</Button>
                  </DialogClose>
               </div>
            </div>
         </form>
      </div>
   )
}