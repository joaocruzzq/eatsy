import { Plus } from "lucide-react";

import { IngredientTag } from "./ingredient-tag";
import { PlatePhotoInput } from "./plate-photo-input";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { useContext, useState } from "react";
import { PlatesContext } from "@/contexts/plates-context";

const PlateModalFormSchema = z.object({
   id: z.number(),
   image: z.string(),
   name: z.string().min(1, "O nome é obrigatório."),
   category: z.enum(["refeicao", "sobremesa", "bebida"]),
   description: z.string().min(1, "A descrição é obrigatória."),
   price: z.preprocess((val) => Number(val), z.number().min(0.01)),
   ingredients: z.array(
      z.object({
         id: z.number(),
         name: z.string()
      })
   ).min(1, "Adicione pelo menos um ingrediente.")
})

type AlterPlateModalInputs = z.infer<typeof PlateModalFormSchema>

interface EditPlateProps {
   plateId: number | undefined
}

export function AlterPlateModal({ plateId }: EditPlateProps) {
   const { plates, onAddNewPlate } = useContext(PlatesContext)

   const plateToEdit = plateId ? plates.find((plate) => plate.id === plateId) : null

   const { register, reset, setValue, handleSubmit, control, formState: { isSubmitting } } = useForm<AlterPlateModalInputs>({
      resolver: zodResolver(PlateModalFormSchema),
      defaultValues: {
         name: plateToEdit?.name ?? "",
         image: plateToEdit?.image ?? "",
         id: plateToEdit?.id ?? undefined,
         price: plateToEdit?.price ?? undefined,
         ingredients: plateToEdit?.ingredients ?? [],
         description: plateToEdit?.description ?? "",
         category: plateToEdit?.category ?? undefined,
      }
   })

   const { fields, append, remove } = useFieldArray({
      control, name: "ingredients"
   })

   const [newIngredient, setNewIngredient] = useState("")

   function handleAddNewIngredientTag() {
      if(newIngredient.trim() !== "") {
         append({
            id: Math.random(),
            name: newIngredient.trim()
         })

         setNewIngredient("")
      }
   }

   function handleDeleteIngredientTag(id: number) {
      const ingredientID = fields.findIndex((ingredient) => ingredient.id === id)
      
      remove(ingredientID)
   }
   
   function handleSetPlateInformations(data: AlterPlateModalInputs) {
      onAddNewPlate(data)

      reset()
   }

   return (
      <div>
         <form onSubmit={handleSubmit(handleSetPlateInformations)} className="grid gap-4">
            <PlatePhotoInput name={plateToEdit?.name} register={register} setValue={setValue} />

            <div className="grid gap-3">
               <Input type="text" placeholder="Nome do prato" {...register("name")} />

               <div className="flex gap-2">
                  <Input type="number" step={0.01} placeholder="R$ 00,00" {...register("price", {valueAsNumber: true})} />

                  <Controller
                     name="category"
                     control={control}
                     render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange} >
                           <SelectTrigger>
                              <SelectValue placeholder="Categoria" />
                           </SelectTrigger>

                           <SelectContent>
                              <SelectItem value="refeicao">Refeição</SelectItem>
                              <SelectItem value="sobremesa">Sobremesa</SelectItem>
                              <SelectItem value="bebida">Bebida</SelectItem>
                           </SelectContent>
                        </Select>
                     )}
                  />
               </div>

               <Textarea
                  rows={4}
                  className="resize-none"
                  {...register("description")}
                  placeholder="Utilize esse campo para fazer uma descrição breve sobre o prato."
               />

               <div className="flex h-full overflow-auto custom-scrollbar gap-2 bg-neutral-200 dark:bg-neutral-900 py-2 px-2.5 rounded-md">
                  {fields.map((ingredient) => (
                     <IngredientTag
                        key={ingredient.id}
                        name={ingredient.name}
                        id={ingredient.id}
                        onDeleteIngredientTag={handleDeleteIngredientTag}
                     />
                  ))}

                  <div className="flex gap-0.5 border-2 border-dashed border-muted-foreground rounded-sm h-6 px-2 focus-within:border-ring transition">
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
                  <Button type="submit" variant={"secondary"} disabled={isSubmitting} className="disabled:cursor-not-allowed">
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