import { Helmet } from "react-helmet-async"

import { toast } from "sonner"

import { z } from "zod"
import { useForm } from "react-hook-form"

import { Link } from "react-router-dom"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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
         <Helmet title="Login" />

         <div className="p-8">
            <Button variant="secondary" className="absolute right-8 top-8" asChild>
               <Link to="/sign-up">
                  Criar conta
               </Link>
            </Button>

            <div className="w-[350px] flex flex-col justify-center gap-6">
               <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                     Acessar painel
                  </h1>

                  <p className="text-sm text-muted-foreground">
                     Acompanhe suas vendas pelo painel do parceiro.
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