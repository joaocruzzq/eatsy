import { 
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle
} from "@/components/ui/alert-dialog";

import { useNavigate } from "react-router-dom";

export function CancelModal() {
   const navigate = useNavigate()

   function handlePreviousPage() {
      navigate(-1)
   }
   
   return (
      <AlertDialogContent>
         <AlertDialogHeader>
            <AlertDialogTitle>
               Tem certeza que deseja cancelar?
            </AlertDialogTitle>

            <AlertDialogDescription>
               Esta ação não poderá ser desfeita. Isso excluirá permanentemente as alterações feitas e restaurará os dados para a versão anterior.
            </AlertDialogDescription>
         </AlertDialogHeader>
                     
         <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handlePreviousPage}>Continuar</AlertDialogAction>
         </AlertDialogFooter>
      </AlertDialogContent>
   )
}