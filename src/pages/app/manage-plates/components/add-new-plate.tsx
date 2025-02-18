import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AddNewPlate() {
   const navigate = useNavigate()

   return (
      <button onClick={() => navigate("/add-new-plate")} className="flex flex-col border border-dashed border-primary rounded-lg items-center justify-center hover:bg-primary transition-all">
         <Plus size={36} />
         <span className="text-xl text-center">Adicionar um <br /> novo prato</span>
      </button>
   )
}