import { 
   Pagination,
   PaginationLink,
   PaginationItem,
   PaginationContent
} from "@/components/ui/pagination"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { useContext } from "react"
import { OrdersContext } from "@/contexts/orders-context"

export function OrdersPagination() {
   const { currentPage, totalPages, ordersPagination } = useContext(OrdersContext)

   function handlePrevPage() {
      if (currentPage > 1) {
         ordersPagination(currentPage - 1)
      }
   }

   function handleNextPage() {
      if (currentPage < totalPages) {
         ordersPagination(currentPage + 1)
      }
   }

   const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

   return (
      <Pagination>
         <PaginationContent>
            <PaginationLink className="cursor-pointer" onClick={handlePrevPage}>
               <PaginationItem>
                  <ChevronLeft />
               </PaginationItem>
            </PaginationLink>

            {
               pages.map((page) => (
                  <PaginationLink className={`cursor-pointer ${page === currentPage ? "bg-muted/40" : "bg-transparent"}`}>
                     <PaginationItem>
                        {page}
                     </PaginationItem>
                  </PaginationLink>
               ))
            }

            <PaginationLink className="cursor-pointer" onClick={handleNextPage}>
               <PaginationItem>
                  <ChevronRight />
               </PaginationItem>
            </PaginationLink>
         </PaginationContent>
      </Pagination>
   )
}