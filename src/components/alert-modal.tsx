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
import { AppMainContext } from "@/contexts/app-main-context";

interface ModalProps {
   title: string
   option2: string
   description?: string
   shouldNavigate?: boolean
   plateId: number
}

export function AlertModal(props : ModalProps) {
   const { deletePlate } = useContext(AppMainContext)

   function handleDeletePlate() {
      deletePlate(props.plateId)
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