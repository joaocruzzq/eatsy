import { ImageUp } from "lucide-react";

import { ChangeEvent, useRef, useState } from "react";

export function PlatePhotoInput() {
   const fileInputRef = useRef<HTMLInputElement | null>(null)

   const [fileName, setFileName] = useState<string | null>(null)

   function handleUploadPhoto() {
      fileInputRef.current?.click()
   }

   function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
      if(event.target.files && event.target.files.length > 0) {
         setFileName(event.target.files[0].name)
      }
   }

   return (
      <div className="flex flex-col h-full border border-dashed text-muted-foreground/60 border-input bg-transparent shadow-sm justify-center items-center rounded-lg p-6 hover:border-ring hover:text-foreground hover:bg-muted/20 transition">
         <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

         <button type="button" onClick={handleUploadPhoto} className="flex flex-col items-center justify-center h-full w-full">
            <ImageUp size={36} className="mb-6" />

            <h1 className="text-lg">
               {fileName ? fileName : "Selecionar arquivo"}
            </h1>
         </button>
      </div>
   )
}