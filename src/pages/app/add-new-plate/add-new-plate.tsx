import { Helmet } from "react-helmet-async";

import { ImageUp, Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectValue, SelectContent, SelectTrigger } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function AddNewPlate() {
   return (
      <div className="flex flex-col gap-4">
         <Helmet title="Adicionar Prato" />
               
         <h1 className="text-3xl font-bold tracking-tight">Adicionar Prato</h1>

         <form className="grid gap-y-6">
            <div className="grid grid-cols-9 gap-10 mt-4">
               <div className="flex flex-col gap-y-3 col-span-3">
                  <Label className="font-normal text-base">Adicione uma foto</Label>

                  <div className="flex flex-col h-full border border-dashed border-muted justify-center items-center rounded-lg p-6">
                     <ImageUp size={36} className="mb-6" />
                     <h1 className="text-lg">Selecionar arquivo</h1>
                  </div>
               </div>

               <div className="grid col-span-6 gap-y-6">
                  <div className="grid grid-cols-5 gap-4 ">
                     <div className="flex flex-col gap-y-3 col-span-2">
                        <Label className="font-normal text-base">Nome do prato</Label>
                        <Input className="h-10" type="text" />
                     </div>

                     <div className="flex flex-col gap-y-3">
                        <Label className="font-normal text-base">Preço</Label>
                        <Input className="h-10" type="number" step="0.01" />
                     </div>

                     <div className="flex flex-col gap-y-3 col-span-2">
                        <Label className="font-normal text-base">Selecione a categoria</Label>

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

                  <div className="grid grid-cols-5 gap-4">
                     <div className="flex flex-col gap-y-3 col-span-3">
                        <Label className="font-normal text-base">Descrição</Label>
                        <Textarea rows={12} className="resize-none" />
                     </div>

                     <div className="flex flex-col gap-y-3 col-span-2">
                        <Label className="font-normal text-base">Adicione ingredientes</Label>

                        <div className="flex h-full gap-3 bg-zinc-200 dark:bg-zinc-900 py-2.5 px-3.5 rounded-lg">
                           <div className="flex gap-2 bg-muted rounded-sm py-0.5 px-3 h-fit">
                              <span>teste</span>

                              <button>
                                 <X size={14} />
                              </button>
                           </div>

                           <div className="flex gap-2 border-2 border-dashed border-muted rounded-sm py-0.5 px-3 h-fit">
                              <input type="text" placeholder="adicionar" className="bg-transparent outline-none text-sm w-14" />

                              <button>
                                 <Plus size={16} />
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-2 w-[312px] gap-3 ml-auto">
               <Button variant="secondary" className="h-10">Cancelar</Button>
               <Button variant="default" className="h-10">Adicionar prato</Button>
            </div>
         </form>
      </div>
   )
}