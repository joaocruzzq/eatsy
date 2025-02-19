import { Pen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import plateIMG from "@/assets/plate-seafood.svg"

export function PlateManagementCard() {
   return (
      <Card className="flex flex-col h-80 items-center rounded-lg justify-center gap-1 bg-neutral-200 dark:bg-neutral-900">
         <CardContent className=" flex flex-col items-center gap-2 p-4">
            <img src={plateIMG} className="w-32" />

            <div className="flex flex-col text-center">
               <h1 className="font-semibold text-xl text-foreground">Torradas de Parma</h1>

               <span className="text-xs text-muted-foreground leading-5 text-justify">
                  Presunto de parma e rúcula em um pão com fermentação natural.
               </span>

               <div className="flex gap-1 items-baseline justify-center mt-1">
                  <span className="text-xs text-muted-foreground">R$</span>
                  <h1 className="text-xl font-medium">21,90</h1>
               </div>
            </div>
         </CardContent>

         <Button className="w-full h-full mt-auto rounded-t-none hover:opacity-80 transition-opacity">
            <Pen />
            <p>Editar Prato</p>
         </Button>
      </Card>
   )
}