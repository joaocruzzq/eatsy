import { Plus } from "lucide-react";

export function AddNewPlateButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
   return (
      <button {...props} className="flex flex-col border border-dashed border-primary rounded-lg items-center justify-center hover:bg-primary transition-all">
         <Plus size={36} />
         <span className="text-xl text-center">Adicionar um <br /> novo prato</span>
      </button>
   )
}