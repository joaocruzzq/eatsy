import { Helmet } from "react-helmet-async"

import palteIMG from "@/assets/plate-seafood.svg"
import titleDetailIMG from "@/assets/text-decoration.svg"

import { HomeDishCard } from "@/components/home-dish-card"

import { Heart } from "lucide-react"

export function Home() {
   return (
      <>
         <Helmet title="Home" />

         <div className="grid grid-cols-2 w-full justify-center">
            <div className="flex flex-col justify-center gap-y-5">
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

               <span className="text-muted-foreground text-xl mt-2 leading-8">
                  Cozinhamos com amor e entregamos com agilidade. Sua comida favorita, fresquinha e saborosa, chega até você em até 60 minutos!
               </span>

               
            </div>
         </div>

         {/* <div className="flex flex-col gap-y-8">
            <h1 className="font-semibold text-2xl mt-12">Refeições</h1>

            <div className="grid grid-cols-5 justify-center gap-x-5 py-6">
               <HomeDishCard />
               <HomeDishCard />
               <HomeDishCard />
               <HomeDishCard />
               <HomeDishCard />
            </div>

            <h1 className="font-semibold text-2xl mt-8">Sobremesas</h1>

            <div className="grid grid-cols-5 justify-center gap-y-8 gap-x-5 py-6">
               <HomeDishCard />
               <HomeDishCard />
               <HomeDishCard />
               <HomeDishCard />
               <HomeDishCard />
            </div>

            <h1 className="font-semibold text-2xl mt-8">Bebidas</h1>

            <div className="grid grid-cols-5 justify-center gap-y-8 gap-x-5 py-6">
               <HomeDishCard />
               <HomeDishCard />
               <HomeDishCard />
               <HomeDishCard />
               <HomeDishCard />
            </div>
         </div> */}
      </>
   )
}