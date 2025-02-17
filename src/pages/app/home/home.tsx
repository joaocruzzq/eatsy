import { Helmet } from "react-helmet-async"

import homeMainIMG from "@/assets/main-photo.png"
import happyFaceIMG from "@/assets/happy-face.svg"
import dishPlateIMG from "@/assets/plate-seafood.svg"
import titleDetailIMG from "@/assets/text-decoration.svg"
import deliveryTruckIMG from "@/assets/delivery-truck.svg"

import { Heart, Search, Star } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HomeDishCard } from "@/pages/app/home/components/home-dish-card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Controller, useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"

export function Home() {
   const { control } = useForm()

   return (
      <>
         <Helmet title="Home" />

         <div className="grid grid-cols-2 w-full my-4">
            <div className="flex flex-col justify-center gap-y-8">
               <div className="flex gap-2 bg-[#f5474717] w-fit py-2 px-3 items-center rounded-full">
                  <Heart size={18} className="bg-red-500 rounded-full text-transparent fill-[#FDC55E] p-0.5" />

                  <span className="text-sm">
                     Do nosso coração para o seu prato
                  </span>
               </div>

               <h1 className="font-extrabold text-6xl font-bevietnam">O sabor que você
                  <span className="text-red-500"> confia</span>
                  <span className="font-sans leading-8">,</span> a
                  <span className="text-red-500"> qualidade</span> que você
                  <span className="text-[#FDC55E]"> merece</span>.
                  <img src={titleDetailIMG} className="ml-auto mt-1 h-3" />
               </h1>

               <span className="text-muted-foreground text-xl mt-2 mb-6 leading-8">
                  Cozinhamos com amor e entregamos com agilidade. Sua comida favorita, fresquinha e saborosa, chega até você em até 60 minutos!
               </span>

               <form className="flex justify-end items-center h-10 w-11/12">
                  <Input className="h-full w-full rounded-full" placeholder="Busque pelo prato ou ingredientes" />

                  <Button className="absolute rounded-full w-8 h-8 mr-1.5">
                     <Search />
                  </Button>
               </form>
            </div>

            <div className="flex relative justify-center">
               <img src={homeMainIMG} className="w-3/4" />

               <div className="bg-background flex absolute rounded-md py-2 px-2.5 gap-2 -translate-x-40 translate-y-32">
                  <div className="bg-[#FDC55E] py-0.5 px-0.5 rounded-sm">
                     <img src={deliveryTruckIMG} className="size-9" />
                  </div>

                  <div className="flex flex-col justify-between">
                     <p className="text-xs text-muted-foreground font-bevietnam leading-tight">
                        Agilidade < br/> na entrega
                     </p>

                     <div className="flex justify-between">
                        <Star size={10} className="text-transparent fill-yellow-300" />
                        <Star size={10} className="text-transparent fill-yellow-300" />
                        <Star size={10} className="text-transparent fill-yellow-300" />
                        <Star size={10} className="text-transparent fill-yellow-300" />
                        <Star size={9} className="text-yellow-300" />
                     </div>
                  </div>
               </div>

               <div className="bg-background rounded-full flex items-center absolute pr-4 translate-x-52 translate-y-36">
                  <img src={happyFaceIMG} className="size-10"/>

                  <div className="leading-4">
                     <span className="text-xs text-muted-foreground font-bevietnam">Clientes satisfeitos!</span>

                     <span className="flex gap-1 items-center ">
                        <Star size={13} className="fill-yellow-300 text-transparent" />
                        <span className="text-xs">4.9</span>
                        <span className="text-xs text-muted-foreground">(1.449 reviews)</span>
                     </span>
                  </div>
               </div>

               <div className="flex justify-center w-9/12 absolute translate-y-72">
                  <img src={dishPlateIMG} className="h-28  -mt-2" />
                  <img src={dishPlateIMG} className="h-32 mr-16 mt-28" />
                  <img src={dishPlateIMG} className="h-36 mt-28" />
                  <img src={dishPlateIMG} className="h-28 -mt-2" />
               </div>
            </div>
         </div>

         <div className="flex flex-col my-8">
            <Controller
               name="category"
               control={control}
               render={({ field }) => {
                  return (
                     <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-2">
                        <div className="flex justify-center items-center relative h-6">
                           <Label className="p-4 font-bevietnam text-xs font-normal tracking-wide">Todos</Label>
                           <RadioGroupItem value="todos" className="min-h-full w-full absolute data-[state=checked]:bg-[#f5474738]" />
                        </div>

                        <div className="flex justify-center items-center relative h-6">
                           <Label className="p-4 font-bevietnam text-xs font-normal tracking-wide">Refeições</Label>
                           <RadioGroupItem value="refeicao" className="min-h-full w-full absolute data-[state=checked]:bg-[#f5474738]" />
                        </div>

                        <div className="flex justify-center items-center relative h-6">
                           <Label className="p-4 font-bevietnam text-xs font-normal tracking-wide">Sobremesas</Label>
                           <RadioGroupItem value="sobremesa" className="min-h-full w-full absolute data-[state=checked]:bg-[#f5474738]" />
                        </div>

                        <div className="flex justify-center items-center relative h-6">
                           <Label className="p-4 font-bevietnam text-xs font-normal tracking-wide">Bebidas</Label>
                           <RadioGroupItem value="bebida" className="min-h-full w-full absolute data-[state=checked]:bg-[#f5474738]" />
                        </div>
                     </RadioGroup>
                  )
               }}
            />

            <div className="grid grid-cols-5 justify-center gap-x-5 pt-20">
               <HomeDishCard />
               <HomeDishCard />
               <HomeDishCard />
               <HomeDishCard />
               <HomeDishCard />
            </div>
         </div>
      </>
   )
}