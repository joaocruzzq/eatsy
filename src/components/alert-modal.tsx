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
   description?: string
   shouldNavigate?: boolean
   customizedButton: string
   plateId: number | undefined
}

export function AlertModal(props : ModalProps) {
   const { onDeletePlate } = useContext(PlatesContext)

   function handleDeletePlate() {
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
            <AlertDialogAction onClick={handleDeletePlate}>{props.customizedButton}</AlertDialogAction>
         </AlertDialogFooter>
      </AlertDialogContent>
   )
}