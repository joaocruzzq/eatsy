import { Pencil, ShoppingCart, Trash2 } from "lucide-react"

import { Stepper } from "./stepper"
import { OrderCart } from "./order-cart"
import { AlertModal } from "./alert-modal"

import {
   Dialog,
   DialogTitle,
   DialogHeader,
   DialogTrigger,
   DialogContent,
} from "./ui/dialog"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { AlertDialog, AlertDialogTrigger } from "./ui/alert-dialog"

import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { PlateType } from "@/contexts/plates-context"
import { AppMainContext } from "@/contexts/app-main-context"
import { CustomerCartContext } from "@/contexts/customer-cart-context"

import { AlterPlateModal } from "@/pages/app/manage-plates/components/alter-plate-modal"

interface HomePlateCardType {
   plate: PlateType
}

export function DishCard({ plate }: HomePlateCardType) {
   const { user } = useContext(AppMainContext)
   const { onAddItemToCart } = useContext(CustomerCartContext)

   const [itemQuantity, setItemQuantity] = useState(1)
   
   function handleAddPlateToOrder() {
      onAddItemToCart({
         ...plate,
         quantity: itemQuantity
      })
   }

   const navigate = useNavigate()

   function navigateToPlate() {
      navigate(`/plate-details/${plate.id}`)
   }

   return (
      <Card className="bg-stone-100 dark:bg-stone-900">
         <CardContent>
            <img src={plate.image} className="size-32 mx-auto mb-2 -translate-y-1/4 cursor-pointer" onClick={navigateToPlate} />

            <div className="flex flex-col items-center gap-y-3 pt-0 -mt-5">
               <h1 className="font-semibold text-xl text-foreground tracking-wide line-clamp-1">
                  {plate.name}
               </h1>

               <span className="text-xs text-muted-foreground text-justify leading-5 line-clamp-2 tracking-wide">
                  {plate.description}
               </span>

               <div className="w-full flex justify-between items-center my-1">
                  <div className="flex gap-0.5 items-baseline">
                     <span className="text-xs text-muted-foreground">R$</span>

                     <h1 className="text-xl font-medium">
                        {plate.price}
                     </h1>
                  </div>

                  {
                     user?.role === "admin" ? (
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
                                    plateId={plate.id}
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
                                 plateId={plate.id}
                                 customizedButton="Continuar"
                                 title="Tem certeza que deseja excluir?"
                                 description="Isso excluirá permanentemente o prato."
                              />
                           </AlertDialog>
                        </div>
                     ) : (
                        <div className="flex gap-1.5">
                           <Stepper itemID={plate.id} initialValue={itemQuantity} onChangeQuantity={setItemQuantity} />
                           
                           <Sheet>
                              <SheetTrigger>
                                 <Button size="icon" variant={"default"} onClick={handleAddPlateToOrder}>
                                    <ShoppingCart />
                                 </Button>
                              </SheetTrigger>

                              <OrderCart />
                           </Sheet>
                        </div>
                     )
                  }
               </div>
            </div>
         </CardContent>
      </Card>
   )
}