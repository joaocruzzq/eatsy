import { ClipboardCopy, Check, Receipt } from "lucide-react";

import { toast } from "sonner";

import qrCode from "@/assets/pix-qr-code.svg"
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { OrdersContext } from "@/contexts/orders-context";

export function MethodPix() {
   const { onSetPaymentMethod } = useContext(OrdersContext)

   const pixKey = "7fbc3b85-633e-46a8-a0f0-d45eb9f40405"

   const [copiedPix, setCopiedPix] = useState(false)
   const [isPixCopied, setIsPixCopied] = useState(false)

   const { handleSubmit } = useForm()

   function handleCopyPix() {
      navigator.clipboard.writeText(pixKey).then(() => {
         setIsPixCopied(true)
         setTimeout(() => setIsPixCopied(false), 180000)

         setCopiedPix(true)
         setTimeout(() => setCopiedPix(false), 2000)
      })
   }

   function addPixPayment() {
      onSetPaymentMethod({ method: "pix" })

      toast.success("Método de pagamento aprovado com sucesso!")
   }

   return (
      <form onSubmit={handleSubmit(addPixPayment)} className="grid grid-cols-[1fr_auto] gap-4">
         <div className="p-8 flex flex-col justify-center gap-6 rounded-lg border border-muted/50">
            <p className="text-justify text-muted-foreground">
               Escaneie o QR Code para efetuar o pagamento ou, se preferir, copie o código fornecido abaixo.
            </p>

            <div className="bg-muted rounded-md flex items-center justify-between p-1.5 pl-5 focus-within:ring-1 focus-within:ring-ring">
               <span className="opacity-50 text-sm">
                  {pixKey}
               </span>

               <Button type="button" variant="ghost" size="icon" onClick={handleCopyPix} className="hover:bg-muted-foreground/25">
                  {copiedPix ? <Check className="text-green-500" /> : <ClipboardCopy />}
               </Button>
            </div>
         </div>

         <div className="flex h-52 w-52 rounded-lg mt-auto bg-muted dark:bg-stone-300">
            <img src={qrCode} alt="" />
         </div>

         <div className="flex justify-start col-span-2 mt-1">
            <Button type="submit" disabled={!isPixCopied} className="ml-auto w-52 transition" variant={"secondary"} size={"lg"}>
               <Receipt />
               Adicionar pagamento
            </Button>
         </div>
      </form>
   )
}