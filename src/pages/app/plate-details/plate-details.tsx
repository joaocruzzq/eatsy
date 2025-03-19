import { ChevronLeft, ShoppingCart } from "lucide-react"

import { Helmet } from "react-helmet-async"

import { Stepper } from "@/components/stepper"
import { Button } from "@/components/ui/button"

import { useNavigate, useParams } from "react-router-dom"

import { useContext, useState } from "react"
import { PlatesContext } from "@/contexts/plates-context"
import { CustomerCartContext } from "@/contexts/customer-cart-context"

export function PlateDetails() {
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

         <div className="grid grid-cols-[auto_1fr] flex-1 max-w-[86%] gap-12 mx-auto items-center">
            <img src={plateToShow?.image} />

            <div className="grid justify-between">
               <div className="flex justify-between">
                  <h1 className="flex font-semibold text-4xl items-center gap-2">
                     {plateToShow?.name}
                  </h1>

                  <Button variant={"link"} className="flex text-lg leading-3 items-start" onClick={() => navigate(-1)}>
                     <ChevronLeft />
                     <span>voltar</span>
                  </Button>
               </div>

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

               <div className="flex mt-12 items-end gap-6">
                  <span className="text-lg"> R$ {" "}
                     <span className="text-3xl font-semibold">
                        {plateToShow?.price}
                     </span>
                  </span>

                  <div className="flex gap-2">
                     <Stepper
                        itemID={plateId}
                        initialValue={itemQuantity}
                        onChangeQuantity={setItemQuantity}
                     />

                     <Button size={"lg"} className="font-normal" onClick={handleAddPlateToOrder}>
                        <ShoppingCart />
                        Adicionar ao pedido
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}