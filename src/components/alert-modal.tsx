import { 
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle
} from "@/components/ui/alert-dialog";

import { useContext } from "react";
import { PlatesContext } from "@/contexts/plates-context";

interface ModalProps {
   title: string
   option2: string
   description?: string
   shouldNavigate?: boolean
   plateId: number
}

export function AlertModal(props : ModalProps) {
   const { onDeletePlate } = useContext(PlatesContext)

   function handleDeletePlate() {
      console.log("Tentando deletar o prato com ID:", props.plateId);
      onDeletePlate(props.plateId);
   }
   
   
   return (
      <AlertDialogContent>
         <AlertDialogHeader>
            <AlertDialogTitle>
               {props.title}
            </AlertDialogTitle>

            <AlertDialogDescription className="leading-6">
            {props.description} Esta ação não poderá ser desfeita.
            </AlertDialogDescription>
         </AlertDialogHeader>
                     
         <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePlate}>{props.option2}</AlertDialogAction>
         </AlertDialogFooter>
      </AlertDialogContent>
   )
}