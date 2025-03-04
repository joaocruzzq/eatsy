import visaLogo from "@/assets/visa-logo.svg"
import mastercardLogo from "@/assets/mastercard-logo.svg"

import creditCardChip from "@/assets/credit-card-chip.svg"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface CardType {
   method: string
   cardNumber: string
   cardOwnerName: string
   expirationMonth: string
   expirationYear: string
}

const cardBrands = [
   {name: "visa", regex: /^4/, img: visaLogo},
   {name: "mastercard", regex: /^5[1-5]/, img: mastercardLogo}
]

function getCardBrand(cardNumber: string) {
   const cleanNumber = cardNumber.replace(/\D/g, "")
   const brand = cardBrands.find(({ regex }) => regex.test(cleanNumber))
   return brand ? brand.img : null
}

export function InterativeCredicCard(props: CardType) {
   const cardBrandLogo = getCardBrand(props.cardNumber)

   return (
      <Card className="h-[202px] w-80 flex flex-col justify-between relative overflow-hidden bg-muted rounded-lg font-bevietnam font-light">
         <CardHeader className="z-10">
            <div className="flex flex-row justify-between items-center m-0 relative">
               <span className="text-sm">{props.method}</span>

               <div className="absolute w-full">
                  {cardBrandLogo && <img src={cardBrandLogo} className="ml-auto size-12" />}
               </div>
            </div>
         </CardHeader>

         <CardContent className="flex justify-between z-10">
            <span className="tracking-wider">
               {props.cardNumber}
            </span>

            
            <img src={creditCardChip} className="-mt-1" />
         </CardContent>

         <CardFooter className="flex justify-between z-10">
            <div className="grid gap-0.5">
               <span className="text-xs font-extralight">Nome no cartão</span>

               <span className="text-sm">
                  {props.cardOwnerName}
               </span>
            </div>

            <div className="grid gap-0.5">
               <span className="text-xs font-extralight">Vencimento</span>

               <span className="grid grid-cols-[1fr_auto_1fr] text-sm">
                  <span className="flex tracking-widest justify-start">
                     {props.expirationMonth}
                  </span>

                  <span> / </span>

                  <span className="flex tracking-widest justify-end">
                     {props.expirationYear}
                  </span>
               </span>
            </div>
         </CardFooter>

         <div className="absolute">
            <div className="absolute bg-muted brightness-125 size-96 -rotate-[30deg] translate-x-14 translate-y-16 opacity-40 shadow-2xl shadow-black" />
            <div className="absolute bg-muted brightness-150 size-96 rotate-45 opacity-15" />

            <div className="absolute bg-muted brightness-150 size-96 rotate-[25deg] -translate-x-28 translate-y-28 shadow-2xl shadow-black opacity-25" />
         </div>
      </Card>
   )
}