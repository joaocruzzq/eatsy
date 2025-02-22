import { Plus } from "lucide-react";

import { IngredientTag } from "./ingredient-tag";
import { PlatePhotoInput } from "./plate-photo-input";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@/components/ui/dialog";
import { AppMainContext } from "@/contexts/app-main-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { toast } from "sonner";

import { api } from "@/lib/axios";
import { useContext, useState } from "react";

const PlateModalFormSchema = z.object({
   name: z.string(),
   price: z.coerce.number(),
   category: z.enum(["Refeição", "Sobremesa", "Bebida"]),
   description: z.string(),
   ingredients: z.array(
      z.object({
         id: z.number(),
         name: z.string()
      })
   )
})

type AlterPlateModalInputs = z.infer<typeof PlateModalFormSchema>

interface EditPlateProps {
   plateId: number | undefined
}

export function AlterPlateModal({ plateId }: EditPlateProps) {
   const { plates } = useContext(AppMainContext)

   const { register, handleSubmit, control, reset } = useForm<AlterPlateModalInputs>({
      resolver: zodResolver(PlateModalFormSchema)
   })

   const { fields, append, remove } = useFieldArray({
      control, name: "ingredients"
   })

   const filteredPlate = plates.find((plate) => plate.id === plateId)

   const [newIngredient, setNewIngredient] = useState("")

   const [plateIMG, setPlateIMG] = useState<File | null>(null)

   async function handleAddANewPlate(data: AlterPlateModalInputs) {
      try {
         let imageBase64 = null

         if (plateIMG) {
            const reader = new FileReader()

            reader.readAsDataURL(plateIMG)

            imageBase64 = await new Promise((resolve) => {
               reader.onload = () => resolve(reader.result)
            })
         }

         await api.post("/plates", {
            name: data.name,
            price: data.price,
            category: data.category,
            description: data.description,
            ingredients: data.ingredients,
            plateIMG: imageBase64
         })

         toast.success("Prato adicionado com sucesso!")

         setPlateIMG(null)
         reset()
      }

      catch {
         toast.error("Erro ao adicionar prato, tente novamente.")
      }
   }

   function handleAddNewIngredientTag() {
      if(newIngredient.trim() !== "") {
         append({
            id: fields.length + 1,
            name: newIngredient.trim()
         })

         setNewIngredient("")
      }
   }

   // function handleDeleteIngredientTag(id: number) {
   //    remove(id)
   // }

   return (
      <div>
         <form onSubmit={handleSubmit(handleAddANewPlate)} className="grid gap-4">
            <PlatePhotoInput onImageUpload={setPlateIMG} />

            <div className="grid gap-3">
               <Input type="text" placeholder="Nome do prato" {...register("name")} value={filteredPlate?.name} />

               <div className="flex gap-2">
                  <Input type="price" step={0.01} placeholder="R$ 00,00" {...register("price")} value={filteredPlate?.price} />

                  <Controller
                     name="category"
                     control={control}
                     render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange} defaultValue={filteredPlate?.category}>
                           <SelectTrigger>
                              <SelectValue placeholder="Categoria" />
                           </SelectTrigger>

                           <SelectContent>
                              <SelectItem value="Refeição">Refeição</SelectItem>
                              <SelectItem value="Sobremesa">Sobremesa</SelectItem>
                              <SelectItem value="Bebida">Bebida</SelectItem>
                           </SelectContent>
                        </Select>
                     )}
                  />
               </div>

               <Textarea
                  rows={4}
                  className="resize-none"
                  {...register("description")}
                  value={filteredPlate?.description}
                  placeholder="Utilize esse campo para fazer uma descrição breve sobre o prato."
               />

               <div className="flex h-full overflow-auto custom-scrollbar gap-2 bg-neutral-200 dark:bg-neutral-900 py-2 px-2.5 rounded-md" {...register("ingredients")}>
                  {
                     filteredPlate ? (
                        filteredPlate.ingredients.map((ingredient) => {
                           return (
                              <IngredientTag key={ingredient.id} name={ingredient.name} />
                           )
                        })
                     ) : (
                        fields.map((ingredient) => {
                           return (
                              <IngredientTag key={ingredient.id} name={ingredient.name} />
                           )
                        })
                     )
                  }

                  <div className="flex gap-0.5 border-2 border-dashed border-muted-foreground rounded-sm h-full px-2 focus-within:border-ring transition">
                     <input
                        type="text"
                        value={newIngredient}
                        placeholder="ingrediente"
                        onChange={(e) => setNewIngredient(e.target.value)}
                        className="bg-transparent outline-none text-sm w-[72px]"
                     />

                     <button type="button" className="w-fit" onClick={handleAddNewIngredientTag}>
                        <Plus size={16} />
                     </button>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-2 mt-2">
                  <Button type="submit" variant={"secondary"}>
                     Concluir
                  </Button>

                  <DialogClose asChild>
                     <Button type="button" variant={"default"}>Cancelar</Button>
                  </DialogClose>
               </div>
            </div>
         </form>
      </div>
   )
}