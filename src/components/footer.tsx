import { Github, Linkedin } from "lucide-react";

export function Footer() {
   return (
      <div className="mt-auto border-t text-muted-foreground w-full">
         <div className="flex flex-col items-center justify-between max-w-screen-xl mx-auto px-6 py-4 text-sm sm:flex-row gap-1">
            <span>{new Date().getFullYear()} - Eatsy &copy; Todos os direitos reservados</span>

            <div className="flex gap-3 items-center">
               <span>Desenvolvido por João Pedro Cruz</span>

               <a href="https://www.linkedin.com/in/joaocruzz/" target="_blank">
                  <Linkedin className="size-4" />
               </a>

               <a href="https://github.com/joaocruzzq" target="_blank">
                  <Github className="size-4" />
               </a>
            </div>
         </div>
      </div>
   )
}