import { X } from "lucide-react";

interface TagProps {
   id: number
   name: string
   onDeleteIngredientTag: (id: number) => void
}

export function IngredientTag({name, id, onDeleteIngredientTag}: TagProps) {
   return (
      <div className="flex whitespace-nowrap items-center gap-2 bg-muted rounded-sm py-0.5 px-2 h-6">
         <span className="text-sm flex leading-3">
            {name}
         </span>

         <button type="button" onClick={() => onDeleteIngredientTag(id)}>
            <X size={14} />
         </button>
      </div>
   )
}