import { Outlet } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import lightIMG from "@/assets/background-light.svg"

export function AppLayout() {
   return (
      <div className="flex min-h-screen flex-col antialiased ">
         <div className="flex flex-col relative h-[640px] bg-gradient-to-b from-[#f5474718] to-transparent">
            <div className="flex opacity-5 h-[100%] justify-end ml-auto">
               <img src={lightIMG} className="pointer-events-none select-none" />
            </div>

            <Header />
         </div>

         <div className="flex flex-1 flex-col w-full max-w-screen-xl mx-auto -mt-[580px] p-6 z-10 select-none">
            <Outlet />
         </div>

         <Footer />
      </div>
   )
}