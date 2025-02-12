import { HomeDishCard } from "@/components/home-dish-card"
import { Helmet } from "react-helmet-async"

export function Home() {
   return (
      <>
         <Helmet title="Home" />
         
         <div>
            <h1>banner</h1>
         </div>

         <div className="grid grid-cols-5 justify-center gap-y-16 gap-x-5 py-6">
            <HomeDishCard />
            <HomeDishCard />
            <HomeDishCard />
            <HomeDishCard />
            <HomeDishCard />
         </div>
      </>
   )
}