import { ImageUp } from "lucide-react";

import { PlatesContext } from "@/contexts/plates-context";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";

interface PlatePhotoInputProps {
   name: string | undefined
   register: any
   setValue: (name: "image", value: string) => void
}

export function PlatePhotoInput({ name, register, setValue }: PlatePhotoInputProps) {
   const { onAddPlateIMG } = useContext(PlatesContext)

   const fileInputRef = useRef<HTMLInputElement | null>(null)

   const [fileName, setFileName] = useState<string | null>(null)

   function handleUploadPhoto() {
      fileInputRef.current?.click()
   }

   function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
      if(event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0]

         const reader = new FileReader()

         reader.readAsDataURL(file)

         reader.onload = () => {
            const imageBase64 = reader.result as string

            setFileName(file.name)
            onAddPlateIMG(imageBase64)
            setValue("image", imageBase64);
         }

      }
   }

   useEffect(() => {
      if(name) {
         setFileName(name);
      }
   }, [name])

   return (
      <div className="flex flex-col h-full border border-dashed text-muted-foreground/60 border-input bg-transparent shadow-sm justify-center items-center rounded-lg p-6 hover:border-ring hover:text-foreground hover:bg-muted/20 transition">
         <input type="file" {...register("image", {required: true})} ref={fileInputRef} onChange={handleFileChange} className="hidden" />

         <button type="button" onClick={handleUploadPhoto} className="flex flex-col items-center justify-center h-full w-full">
            <ImageUp size={36} className="mb-2" />

            <h1 className="text-lg lowercase">
               {fileName ? `${fileName}.png` : "Selecionar arquivo"}
            </h1>
         </button>
      </div>
   )
}