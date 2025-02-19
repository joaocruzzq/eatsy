import { Helmet } from "react-helmet-async";

import { Plus } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectItem, SelectValue, SelectContent, SelectTrigger } from "@/components/ui/select";

import { CancelModal } from "./components/cancel-modal";
import { IngredientTag } from "./components/ingredient-tag";
import { PlatePhotoInput } from "./components/plate-photo-input";

export function AddNewPlate() {
   return (
      <div className="flex flex-col gap-4">
         <Helmet title="Adicionar Prato" />
               
         <h1 className="text-3xl font-bold tracking-tight">Adicionar Prato</h1>

         <form className="grid gap-y-6">
            <div className="grid grid-cols-9 gap-8 mt-4">
               <div className="flex flex-col gap-y-3 col-span-3">
                  <Label className="font-normal">Adicione uma foto</Label>

                  <PlatePhotoInput />
               </div>

               <div className="grid col-span-6 gap-y-8">
                  <div className="grid grid-cols-5 gap-4 ">
                     <div className="flex flex-col gap-y-3 col-span-2">
                        <Label className="font-normal">Nome do prato</Label>
                        <Input placeholder="Ex: Salada Ceasar" className="h-10" type="text" />
                     </div>

                     <div className="flex flex-col gap-y-3">
                        <Label className="font-normal">Preço</Label>
                        <Input className="h-10" type="number" step="0.01" placeholder="R$ 00,00" />
                     </div>

                     <div className="flex flex-col gap-y-3 col-span-2">
                        <Label className="font-normal">Selecione a categoria</Label>

                        <Select>
                           <SelectTrigger className="text-muted-foreground h-10">
                              <SelectValue placeholder="Categoria" />
                           </SelectTrigger>

                           <SelectContent>
                              <SelectItem value="refeicao">Refeição</SelectItem>
                              <SelectItem value="sorbemesa">Sobremesa</SelectItem>
                              <SelectItem value="bebida">Bebida</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                  </div>

                  <div className="flex flex-col gap-y-3 col-span-3">
                     <Label className="font-normal">Descrição</Label>
                     <Textarea rows={6} className="resize-none" placeholder="Utilize esse campo para fazer uma descrição breve sobre o prato." />
                  </div>

                  <div className="flex flex-col gap-y-3">
                     <Label className="font-normal">Ingredientes</Label>

                     <div className="flex h-full max-w-[810px] overflow-auto custom-scrollbar gap-3 bg-neutral-200 dark:bg-neutral-900 py-2 px-2.5 rounded-md">
                        <IngredientTag />

                        <div className="flex gap-2 border-2 border-dashed border-muted-foreground rounded-sm h-full px-2 focus-within:border-ring transition">
                           <input type="text" placeholder="adicionar" className="bg-transparent outline-none text-sm w-14" />

                           <button>
                              <Plus size={16} />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex gap-2 ml-auto">
               <Button type="button" variant="secondary">Adicionar prato</Button>

               <AlertDialog>
                  <AlertDialogTrigger>
                     <Button type="button" variant="destructive">
                        Cancelar
                     </Button>
                  </AlertDialogTrigger>

                  <CancelModal />
               </AlertDialog>
            </div>
         </form>
      </div>
   )
}