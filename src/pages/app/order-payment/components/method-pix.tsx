import { ClipboardCopy, Check } from "lucide-react";

import qrCode from "@/assets/pix-qr-code.svg"

import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";

import { HandleBackButton } from "./handle-back-button";

import { useState } from "react";

export function MethodPix() {
   const pixKey = "7fbc3b85-633e-46a8-a0f0-d45eb9f40405"
   const [copiedPix, setCopiedPix] = useState(false)

   function handleCopyPix() {
      navigator.clipboard.writeText(pixKey).then(() => {
         setCopiedPix(true)
         setTimeout(() => setCopiedPix(false), 2000)
      })
   }

   return (
      <TabsContent value="pix" className="gap-4 px-1 py-2 h-72">
         <div className="grid grid-cols-[1fr_auto] gap-8 h-full p-6 border border-muted/50 rounded-md">
            <div className="flex flex-col gap-4">
               <p className="text-justify text-muted-foreground">
                  Escaneie o QR Code ao lado para realizar o pagamento ou, se preferir, copie o código disponibilizado abaixo.
               </p>

               <div className="bg-muted rounded-md flex items-center justify-between pl-3 p-2 mb-auto">
                  <span className="opacity-50 text-sm">
                     {pixKey}
                  </span>

                  <Button variant="ghost" size="icon" onClick={handleCopyPix}className="hover:bg-muted-foreground/25">
                     {copiedPix ? <Check className="text-green-500" /> : <ClipboardCopy />}
                  </Button>
               </div>

               <HandleBackButton />
            </div>

            <img src={qrCode} className="h-full rounded-lg bg-muted dark:bg-stone-300" />
         </div>
      </TabsContent>
   )
}