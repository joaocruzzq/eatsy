import { Github, Linkedin } from "lucide-react";

export function Footer() {
   return (
      <div className="mt-auto border-t text-muted-foreground">
         <div className="flex items-center px-6 py-4 justify-between text-sm max-w-screen-xl mx-auto">
            <span>{new Date().getFullYear()} - Eatsy &copy; Todos os direitos reservados</span>

            <div className="flex gap-3 items-center">
               <span>Desenvolvido por João Pedro Cruz</span>

               <a href="https://www.linkedin.com/in/jo%C3%A3o-pedro-de-oliveira-cruz-99156b345?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank">
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