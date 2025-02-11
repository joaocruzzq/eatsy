import { Helmet } from "react-helmet-async"

import { toast } from "sonner"

import { z } from "zod"
import { useForm } from "react-hook-form"

import { Link } from "react-router-dom"

import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


const signUpForm = z.object({
   partnerName: z.string(),
   email: z.string().email(),
   phone: z.number()
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
   const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>()

   async function handleSignUp(data: SignUpForm) {
      try {
         console.log(data)

         await new Promise((resolve) => setTimeout(resolve, 2000))

         toast.success("Parceiro cadastrado com sucesso.")
      }

      catch {
         toast.error("Erro ao cadastrar novo colaborador.")
      }
   }

   return (
      <>
         <Helmet title="Cadastro" />

         <div className="p-8 ">
            <Button variant="secondary" className="absolute right-8 top-8" asChild>
               <Link to="/sign-in">
                  Fazer login
               </Link>
            </Button>

            <div className="w-[350px] flex flex-col justify-center gap-6">
               <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                     Adicione um colaborador
                  </h1>

                  <p className="text-sm text-muted-foreground">
                     Adicione parceiros e compartilhe o acesso às vendas.
                  </p>
               </div>

               <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="partnerName">Nome</Label>
                     <Input id="partnerName" type="partnerName" {...register("partnerName")} />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="email">Email</Label>
                     <Input id="email" type="email" {...register("email")} />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="phone">Telefone</Label>
                     <Input id="phone" type="tel" {...register("phone")} />
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