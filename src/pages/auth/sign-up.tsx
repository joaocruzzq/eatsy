import { Helmet } from "react-helmet-async"

import { toast } from "sonner"

import { Link, useNavigate } from "react-router-dom"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { api } from "@/lib/axios"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const SignUpFormSchema = z.object({
   name: z.string(),
   password: z.string(),
   email: z.string().email()
})

type SignUpForm = z.infer<typeof SignUpFormSchema>

export function SignUp() {
   const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>({
      resolver: zodResolver(SignUpFormSchema)
   })

   const navigate = useNavigate()

   async function handleSignUp(data: SignUpForm) {
      try {
         await api.post("/users", {...data, role: "customer"})

         toast.success("Cadastro realizado com sucesso.")
         navigate("/")
      }

      catch {
         toast.error("Erro ao realizar cadastro.")
      }
   }

   return (
      <>
         <Helmet title="Cadastro" />

         <div className="p-8 ">
            <Button variant="secondary" className="absolute right-8 top-8" asChild>
               <Link to="/">
                  Fazer login
               </Link>
            </Button>

            <div className="w-[350px] flex flex-col justify-center gap-6">
               <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                     Crie sua conta
                  </h1>

                  <p className="text-sm text-muted-foreground">
                     Acompanhe seus pedidos e salve seus pratos favoritos!
                  </p>
               </div>

               <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="name">Nome</Label>
                     <Input id="name" type="text" {...register("name")} />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="email">Email</Label>
                     <Input id="email" type="email" {...register("email")} />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="password">Senha</Label>
                     <Input id="password" type="password" {...register("password")} />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                     Finalizar cadastro
                  </Button>

                  <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                     Ao continuar, você concorda com nossos os <a href="#" className="underline underline-offset-4">Termos de serviços</a>
                     {" "} e <a href="#" className="underline underline-offset-4">Políticas de privacidade</a>.
                  </p>
               </form>
            </div>
         </div>
      </>
   )
}