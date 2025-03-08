import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { useContext } from "react";
import { PlatesContext } from "@/contexts/plates-context";

const SearchFormSchema = z.object({
   query: z.string()
})

type SearchFormInput = z.infer<typeof SearchFormSchema>

export function SearchForm() {
   const { fetchPlates } = useContext(PlatesContext)

   const { register, handleSubmit } = useForm<SearchFormInput>({
      resolver: zodResolver(SearchFormSchema)
   })

   function handleSearchPlates(data: SearchFormInput){
      fetchPlates(data.query)
   }

   return (
      <form onSubmit={handleSubmit(handleSearchPlates)} className="flex justify-end items-center h-10 w-11/12">
         <Input className="h-full w-full rounded-full" placeholder="Busque pelo prato ou ingredientes" {...register("query")}/>

         <Button className="absolute rounded-full w-8 h-8 mr-1.5">
            <Search />
         </Button>
      </form>
   )
}