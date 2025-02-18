import { Plus } from "lucide-react";

export function AddNewPlate() {
   return (
      <button className="flex flex-col h-80 border border-dashed border-primary items-center rounded-lg justify-center gap-1 px-9 hover:bg-primary transition-all">
         <Plus size={36} />
         <span className="text-xl text-center">Adicionar um <br /> novo prato</span>
      </button>
   )
}