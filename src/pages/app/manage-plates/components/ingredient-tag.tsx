import { X } from "lucide-react";

interface TagProps {
   name?: string
}

export function IngredientTag({name}: TagProps) {
   return (
      <div className="flex gap-2 bg-muted rounded-sm py-0.5 px-2 h-fit">
         <span className="text-sm">
            {name}
         </span>

         <button type="button">
            <X size={14} />
         </button>
      </div>
   )
}