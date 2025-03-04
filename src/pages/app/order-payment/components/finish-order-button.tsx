import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ButtonProps {
   onClick?: () => void
}

export function FinishOrderButton({ onClick }: ButtonProps) {
   return (
      <Button type="submit" onClick={onClick}>
         <ShoppingCart />
         Finalizar pedido
      </Button>
   )
}