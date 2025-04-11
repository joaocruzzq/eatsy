import { ChevronLeft, Pencil, ShoppingCart } from "lucide-react"

import { Helmet } from "react-helmet-async"

import {
   Dialog,
   DialogTitle,
   DialogHeader,
   DialogTrigger,
   DialogContent,
} from "@/components/ui/dialog"

import { Stepper } from "@/components/stepper"
import { Button } from "@/components/ui/button"

import { useNavigate, useParams } from "react-router-dom"

import { useContext, useState } from "react"
import { PlatesContext } from "@/contexts/plates-context"
import { AppMainContext } from "@/contexts/app-main-context"
import { CustomerCartContext } from "@/contexts/customer-cart-context"

import { AlterPlateModal } from "../manage-plates/components/alter-plate-modal"

export function PlateDetails() {
   const { user } = useContext(AppMainContext)

   const { id } = useParams()
   const plateId = Number(id)

   const { onAddItemToCart } = useContext(CustomerCartContext)

   const { plates } = useContext(PlatesContext)

   const plateToShow = plates.find((plate) => plate.id === plateId)

   const navigate = useNavigate()

   const [itemQuantity, setItemQuantity] = useState(1)

   function handleAddPlateToOrder() {
      if(!plateToShow) return

      onAddItemToCart({
         ...plateToShow,
         quantity: itemQuantity
      })
   }

   return (
      <>
         <Helmet title={`${plateToShow?.name}`}/>

         <Button variant={"link"} className="flex w-fit leading-3 text-xl mt-2 mb-4" onClick={() => navigate(-1)}>
            <ChevronLeft />
            <span>voltar</span>
         </Button>

         <div className="grid justify-items-center sm:grid-cols-[auto_1fr] flex-1 max-w-[86%] gap-6 sm:gap-8 mx-auto items-center">  
            <img src={plateToShow?.image} className="w-64 sm:w-fit" />

            <div className="grid justify-between">
               <h1 className="flex font-semibold text-4xl items-center gap-2">
                  {plateToShow?.name}
               </h1>

               <span className="flex text-xl text-justify font-light my-6">
                  {plateToShow?.description}
               </span>

               <div className="flex gap-2 max-w-full flex-wrap">
                  {plateToShow?.ingredients.map((ingredient) => (
                     <span className="bg-muted px-3 py-1 rounded-md text-sm font-light text-nowrap">
                        {ingredient.name}
                     </span>
                  ))}
               </div>

               <div className="flex mt-12 mb-2 items-end sm:gap-6">
                  <span className="text-lg"> R$ {" "}
                     <span className="text-3xl font-semibold">
                        {plateToShow?.price}
                     </span>
                  </span>

                  <div className="flex gap-2 ml-auto sm:ml-0">
                     {user?.role === "customer" ? (
                        <>
                        <Stepper
                           itemID={plateId}
                           initialValue={itemQuantity}
                           onChangeQuantity={setItemQuantity}
                        />

                        <Button size={"lg"} className="font-normal" onClick={handleAddPlateToOrder}>
                           <ShoppingCart />
                           Adicionar ao pedido
                        </Button>
                        </>
                     ) : (
                        <Dialog>
                           <DialogTrigger asChild>
                              <Button size={"lg"} className="font-normal" onClick={handleAddPlateToOrder}>
                                 <Pencil />
                                 Editar informações
                              </Button>
                           </DialogTrigger>

                           <DialogContent>
                              <DialogHeader>
                                 <DialogTitle>
                                    Editar prato
                                 </DialogTitle>
                              </DialogHeader>

                              <AlterPlateModal
                                 plateId={plateId}
                              />
                           </DialogContent>
                        </Dialog>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}