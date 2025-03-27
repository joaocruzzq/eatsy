import { Helmet } from "react-helmet-async"

import { toast } from "sonner"

import { z } from "zod"
import { useForm } from "react-hook-form"

import { Link, useNavigate } from "react-router-dom"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { api } from "@/lib/axios"

const signInForm = z.object({
   email: z.string().email(),
   password: z.string()
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
   const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>()

   const navigate = useNavigate()

   async function handleSignIn(data: SignInForm) {
      try {
         const response = await api.get("/users")

         const filteredUser = response.data
         .find((user: SignInForm) => user.email === data.email && user.password === data.password)

         if(!filteredUser) {
            toast.error("Email ou senha inválidos.")
         }

         else {
            localStorage.setItem("@eatsy:user", JSON.stringify(filteredUser))

            navigate("/")
            location.reload()
         }
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
                     Fazer login
                  </h1>

                  <p className="text-sm text-muted-foreground">
                     Faça login e escolha seus pratos favoritos agora mesmo!
                  </p>
               </div>

               <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="email">Email</Label>
                     <Input id="email" type="email" {...register("email")} />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="password">Senha</Label>
                     <Input id="password" type="password" {...register("password")} />
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