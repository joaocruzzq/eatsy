import { Minus, Plus } from "lucide-react";

import { useState } from "react";

interface StepperProps {
   itemID: number
   initialValue: number
   onChangeQuantity: (quantity: number) => void
}
export function Stepper({ initialValue, onChangeQuantity}: StepperProps) {
   const [ itemQuantity, setItemQuantity ] = useState(initialValue)

   function handleIncrementQuantity() {
      if (itemQuantity < 9) {
         setItemQuantity(itemQuantity + 1)
         onChangeQuantity(itemQuantity + 1)
      }
   }

   function handleDecrementQuantity() {
      if (itemQuantity > 1) {
         setItemQuantity(itemQuantity - 1)
         onChangeQuantity(itemQuantity - 1)
      }
   }

   return (
      <div className="flex justify-between items-center bg-muted rounded-md px-2 w-16 h-full">
         <Minus size={14} className="cursor-pointer" onClick={handleDecrementQuantity} />
         <span className="-mt-0.5 text-sm text-muted-foreground outline-none bg-transparent">{itemQuantity}</span>
         <Plus size={14} className="cursor-pointer" onClick={handleIncrementQuantity} />
      </div>
   )
}