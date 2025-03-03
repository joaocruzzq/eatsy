import { TabsContent } from "@/components/ui/tabs";

export function MethodCash() {
   return (
      <TabsContent value="cash" className="gap-4 px-1 py-2 h-72">
         <div className="grid h-full items-center justify-center border border-muted/50 rounded-md">
            Metodo Dinheiro
         </div>
      </TabsContent>
   )
}