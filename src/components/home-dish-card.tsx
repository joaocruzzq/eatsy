import { ShoppingCart } from "lucide-react";

import { Button } from "./ui/button";

import plateIMG from "../assets/plate-parma.svg"

export function HomeDishCard() {
   return (
      <div className="flex flex-col max-w-60 mt-10 rounded-md text-center bg-zinc-300 dark:bg-zinc-900">
         <img src={plateIMG} className="size-32 mx-auto mb-2 -translate-y-1/4" />

         <div className="flex flex-col gap-y-3 p-6 pt-0 -mt-5">
            <h1 className="font-semibold text-xl text-foreground">Torradas de Parma</h1>

            <span className="text-xs text-muted-foreground leading-5">
               Presunto de parma e rúcula em um pão com fermentação natural.
            </span>

            <div className="flex justify-between my-1 items-center">
               <div className="flex gap-1 items-baseline">
                  <span className="text-xs text-muted-foreground">R$</span>
                  <h1 className="text-xl font-medium">21,90</h1>
               </div>

               <Button className="px-2.5" variant={"outline"}>
                  <ShoppingCart />
               </Button>
            </div>
         </div>
      </div>
   )
}