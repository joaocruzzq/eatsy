import { ImageUp } from "lucide-react";

import { useRef } from "react";

export function PlatePhotoInput() {
   const fileInputRef = useRef<HTMLInputElement | null>(null)

   function handleUploadPhoto() {
      fileInputRef.current?.click()
   }

   return (
      <div className="flex flex-col h-full border-[3px] border-dashed border-input bg-transparent shadow-sm justify-center items-center rounded-lg p-6 hover:bg-muted/20 transition">
         <input type="file" ref={fileInputRef} className="hidden" />

         <button onClick={handleUploadPhoto} className="flex flex-col items-center justify-center h-full w-full">
            <ImageUp size={36} className="mb-6" />
            <h1 className="text-lg">Selecionar arquivo</h1>
         </button>
      </div>
   )
}