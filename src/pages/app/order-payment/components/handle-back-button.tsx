import { ArrowLeftToLine } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

export function HandleBackButton() {
   const navigate = useNavigate()

   return (
      <Button size="lg" variant="secondary" className="mt-3" onClick={() => navigate(-1)}>
         <ArrowLeftToLine />
         Voltar
      </Button>
   )
}