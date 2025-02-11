import { Helmet } from "react-helmet-async";

import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

import { toast } from "sonner"

const signInForm = z.object({
   email: z.string().email()
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
   const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>()

   async function handleSignIn(data: SignInForm) {
      try {
         console.log(data)

         await new Promise((resolve) => setTimeout(resolve, 2000))

         toast.success("Link de autenticação enviado para seu e-mail.")
      }

      catch {
         toast.error("Credenciais inválidas.")
      }
   }

   return (
      <>
         <Helmet title="SignIn" />

         <div className="p-8 ">
            <div className="w-[350px] flex flex-col justify-center gap-6">
               <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                     Acessar painel
                  </h1>

                  <p className="text-sm text-muted-foreground">
                     Acompanhe suas vendas pelo painel do parceiro
                  </p>
               </div>

               <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="email">Seu email</Label>
                     <Input id="email" type="email" {...register("email")} />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                     Acessar painel
                  </Button>
               </form>
            </div>
         </div>
      </>
   )
}