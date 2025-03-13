import { Pencil, Trash2 } from "lucide-react";

import { PlateType } from "@/contexts/plates-context";

import { AlterPlateModal } from "./alter-plate-modal";

import { AlertModal } from "@/components/alert-modal";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PlateCardProps {
   plateInfo: PlateType
}

export function PlateManagementCard({plateInfo}: PlateCardProps) {
   return (
      <Card className="bg-stone-100 dark:bg-stone-900">
         <CardContent className="h-full">
            <img src={plateInfo.image} className="size-32 mx-auto mb-2 -translate-y-1/4" />

            <div className="flex flex-col justify-between items-center gap-y-3 pt-0 -mt-5">
               <h1 className="font-semibold text-xl text-foreground tracking-wide line-clamp-1">
                  {plateInfo.name}
               </h1>

               <span className="line-clamp-2 tracking-wide min-h-[3.4em] text-xs text-muted-foreground text-justify leading-5">
                  {plateInfo.description}
               </span>

               <div className="w-full flex justify-between items-center my-1">
                  <div className="flex gap-0.5 items-baseline">
                     <span className="text-xs text-muted-foreground">R$</span>

                     <h1 className="text-xl font-medium">
                        {plateInfo.price}
                     </h1>
                  </div>

                  <div className="flex gap-2">
                     <Dialog>
                        <DialogTrigger asChild>
                           <Button className="px-2.5 w-fit" variant={"ghost"}>
                              <Pencil />
                           </Button>
                        </DialogTrigger>

                        <DialogContent>
                           <DialogHeader>
                              <DialogTitle>
                                 Editar prato
                              </DialogTitle>
                           </DialogHeader>

                           <AlterPlateModal
                              plateId={plateInfo.id}
                           />
                        </DialogContent>
                     </Dialog>

                     <AlertDialog>
                        <AlertDialogTrigger>
                           <Button size="icon" variant={"default"}>
                              <Trash2 />
                           </Button>
                        </AlertDialogTrigger>

                        <AlertModal
                           plateId={plateInfo.id}
                           customizedButton="Continuar"
                           title="Tem certeza que deseja excluir?"
                           description="Isso excluirá permanentemente o prato."
                        />
                     </AlertDialog>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   )
}