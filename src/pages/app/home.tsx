import { HomeDishCard } from "@/components/home-dish-card"
import { Helmet } from "react-helmet-async"

export function Home() {
   return (
      <>
         <Helmet title="Home" />
         
         <div className="my-6">
            <h1>banner</h1>
         </div>

         <div className="flex flex-col gap-y-8">
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
         </div>
      </>
   )
}