import { Minus, Plus } from "lucide-react";

import { useState } from "react";

export function Stepper() {
   const [quantity, setQuantity] = useState(1)

   function handleIncrementQuantity() {
      if (quantity < 9) {
         setQuantity(prevState => prevState + 1)
      }
   }

   function handleDecrementQuantity() {
      if (quantity > 1) {
         setQuantity(prevState => prevState - 1)
      }
   }

   return (
      <div className="flex gap-1.5 items-center bg-muted rounded-md px-2">
         <Minus size={14} className="cursor-pointer" onClick={handleDecrementQuantity} />
         <span className="-mt-0.5 text-sm text-muted-foreground outline-none bg-transparent">{quantity}</span>
         <Plus size={14} className="cursor-pointer" onClick={handleIncrementQuantity} />
      </div>
   )
}