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

interface ModalProps {
   title: string
   option1: string
   option2: string
   description?: string
   shouldNavigate?: boolean
}

export function AlertModal(props : ModalProps) {
   const navigate = useNavigate()

   function handlePreviousPage() {
      navigate(-1)
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
            <AlertDialogCancel>{props.option1}</AlertDialogCancel>
            <AlertDialogAction onClick={props.shouldNavigate ? handlePreviousPage : undefined}>{props.option2}</AlertDialogAction>
         </AlertDialogFooter>
      </AlertDialogContent>
   )
}