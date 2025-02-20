import { X } from "lucide-react";

export function IngredientTag() {
   return (
      <div className="flex gap-2 bg-muted rounded-sm py-0.5 px-2 h-fit">
         <span className="text-sm">teste</span>

         <button type="button">
            <X size={14} />
         </button>
      </div>
   )
}