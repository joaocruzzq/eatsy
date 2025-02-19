import { Helmet } from "react-helmet-async"

import { ChevronLeft, ChevronRight, Filter } from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"

export function Orders() {
   return (
      <>
         <Helmet title="Pedidos" />

         <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

            <div className="text-muted-foreground">
               <Select>
                  <SelectTrigger className="w-[148px]">
                     <div className="flex items-center gap-1">
                        <Filter size={16} className="mr-1" />
                        <SelectValue placeholder="Filtrar status" />
                     </div>
                  </SelectTrigger>

                  <SelectContent>
                     <SelectItem value="all">Todos</SelectItem>
                     <SelectItem value="pending">Pendente</SelectItem>
                     <SelectItem value="preparing">Em preparo</SelectItem>
                     <SelectItem value="delivered">Entregue</SelectItem>
                  </SelectContent>
               </Select>
            </div>
         </div>

         <div className="mt-5">
            <table className="w-full">
               <tbody className="grid gap-3 max-h-[552px] overflow-hidden">
                  <tr className="flex text-sm border border-muted tracking-wider bg-background rounded-s-lg rounded-e-lg">
                     <td className="w-2/12 rounded-s-lg p-2.5 ">
                        <Select>
                           <SelectTrigger>
                              <SelectValue className="" placeholder="Status" />
                           </SelectTrigger>

                           <SelectContent>
                              <SelectItem value="pending">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-red-500" />
                                 Pendente
                              </SelectItem>

                              <SelectItem value="preparing">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-yellow-500" />
                                 Em preparo
                              </SelectItem>
                              
                              <SelectItem value="delivered">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-green-500" />
                                 Entregue
                              </SelectItem>
                           </SelectContent>
                        </Select>
                     </td>

                     <td className="w-1/12 py-4 px-3">
                        00000004
                     </td>

                     <td className="w-8/12 py-4 px-3 text-justify">
                        1 x Salada Radish, 1 x Torradas de Parma, 1 x Chá de Canela, 1 x Suco de Maracujá
                     </td>

                     <td className="w-[12%] rounded-e-lg py-4 px-3 pr-5">
                        20/05 às 18h00
                     </td>
                  </tr>

                  <tr className="flex text-sm border border-muted tracking-wider bg-background rounded-s-lg rounded-e-lg">
                     <td className="w-2/12 rounded-s-lg p-2.5 ">
                        <Select>
                           <SelectTrigger>
                              <SelectValue className="" placeholder="Status" />
                           </SelectTrigger>

                           <SelectContent>
                              <SelectItem value="pending">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-red-500" />
                                 Pendente
                              </SelectItem>

                              <SelectItem value="preparing">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-yellow-500" />
                                 Em preparo
                              </SelectItem>
                              
                              <SelectItem value="delivered">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-green-500" />
                                 Entregue
                              </SelectItem>
                           </SelectContent>
                        </Select>
                     </td>

                     <td className="w-1/12 py-4 px-3">
                        00000004
                     </td>

                     <td className="w-8/12 py-4 px-3 text-justify">
                        1 x Salada Radish, 1 x Torradas de Parma, 1 x Chá de Canela, 1 x Suco de Maracujá
                     </td>

                     <td className="w-[12%] rounded-e-lg py-4 px-3 pr-5">
                        20/05 às 18h00
                     </td>
                  </tr>

                  <tr className="flex text-sm border border-muted tracking-wider bg-background rounded-s-lg rounded-e-lg">
                     <td className="w-2/12 rounded-s-lg p-2.5 ">
                        <Select>
                           <SelectTrigger>
                              <SelectValue className="" placeholder="Status" />
                           </SelectTrigger>

                           <SelectContent>
                              <SelectItem value="pending">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-red-500" />
                                 Pendente
                              </SelectItem>

                              <SelectItem value="preparing">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-yellow-500" />
                                 Em preparo
                              </SelectItem>
                              
                              <SelectItem value="delivered">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-green-500" />
                                 Entregue
                              </SelectItem>
                           </SelectContent>
                        </Select>
                     </td>

                     <td className="w-1/12 py-4 px-3">
                        00000004
                     </td>

                     <td className="w-8/12 py-4 px-3 text-justify">
                        1 x Salada Radish, 1 x Torradas de Parma, 1 x Chá de Canela, 1 x Suco de Maracujá
                     </td>

                     <td className="w-[12%] rounded-e-lg py-4 px-3 pr-5">
                        20/05 às 18h00
                     </td>
                  </tr>

                  <tr className="flex text-sm border border-muted tracking-wider bg-background rounded-s-lg rounded-e-lg">
                     <td className="w-2/12 rounded-s-lg p-2.5 ">
                        <Select>
                           <SelectTrigger>
                              <SelectValue className="" placeholder="Status" />
                           </SelectTrigger>

                           <SelectContent>
                              <SelectItem value="pending">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-red-500" />
                                 Pendente
                              </SelectItem>

                              <SelectItem value="preparing">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-yellow-500" />
                                 Em preparo
                              </SelectItem>
                              
                              <SelectItem value="delivered">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-green-500" />
                                 Entregue
                              </SelectItem>
                           </SelectContent>
                        </Select>
                     </td>

                     <td className="w-1/12 py-4 px-3">
                        00000004
                     </td>

                     <td className="w-8/12 py-4 px-3 text-justify">
                        1 x Salada Radish, 1 x Torradas de Parma, 1 x Chá de Canela, 1 x Suco de Maracujá
                     </td>

                     <td className="w-[12%] rounded-e-lg py-4 px-3 pr-5">
                        20/05 às 18h00
                     </td>
                  </tr>

                  <tr className="flex text-sm border border-muted tracking-wider bg-background rounded-s-lg rounded-e-lg">
                     <td className="w-2/12 rounded-s-lg p-2.5 ">
                        <Select>
                           <SelectTrigger>
                              <SelectValue className="" placeholder="Status" />
                           </SelectTrigger>

                           <SelectContent>
                              <SelectItem value="pending">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-red-500" />
                                 Pendente
                              </SelectItem>

                              <SelectItem value="preparing">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-yellow-500" />
                                 Em preparo
                              </SelectItem>
                              
                              <SelectItem value="delivered">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-green-500" />
                                 Entregue
                              </SelectItem>
                           </SelectContent>
                        </Select>
                     </td>

                     <td className="w-1/12 py-4 px-3">
                        00000004
                     </td>

                     <td className="w-8/12 py-4 px-3 text-justify">
                        1 x Salada Radish, 1 x Torradas de Parma, 1 x Chá de Canela, 1 x Suco de Maracujá
                     </td>

                     <td className="w-[12%] rounded-e-lg py-4 px-3 pr-5">
                        20/05 às 18h00
                     </td>
                  </tr>

                  <tr className="flex text-sm border border-muted tracking-wider bg-background rounded-s-lg rounded-e-lg">
                     <td className="w-2/12 rounded-s-lg p-2.5 ">
                        <Select>
                           <SelectTrigger>
                              <SelectValue className="" placeholder="Status" />
                           </SelectTrigger>

                           <SelectContent>
                              <SelectItem value="pending">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-red-500" />
                                 Pendente
                              </SelectItem>

                              <SelectItem value="preparing">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-yellow-500" />
                                 Em preparo
                              </SelectItem>
                              
                              <SelectItem value="delivered">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-green-500" />
                                 Entregue
                              </SelectItem>
                           </SelectContent>
                        </Select>
                     </td>

                     <td className="w-1/12 py-4 px-3">
                        00000004
                     </td>

                     <td className="w-8/12 py-4 px-3 text-justify">
                        1 x Salada Radish, 1 x Torradas de Parma, 1 x Chá de Canela, 1 x Suco de Maracujá
                     </td>

                     <td className="w-[12%] rounded-e-lg py-4 px-3 pr-5">
                        20/05 às 18h00
                     </td>
                  </tr>

                  <tr className="flex text-sm border border-muted tracking-wider bg-background rounded-s-lg rounded-e-lg">
                     <td className="w-2/12 rounded-s-lg p-2.5 ">
                        <Select>
                           <SelectTrigger>
                              <SelectValue className="" placeholder="Status" />
                           </SelectTrigger>

                           <SelectContent>
                              <SelectItem value="pending">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-red-500" />
                                 Pendente
                              </SelectItem>

                              <SelectItem value="preparing">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-yellow-500" />
                                 Em preparo
                              </SelectItem>
                              
                              <SelectItem value="delivered">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-green-500" />
                                 Entregue
                              </SelectItem>
                           </SelectContent>
                        </Select>
                     </td>

                     <td className="w-1/12 py-4 px-3">
                        00000004
                     </td>

                     <td className="w-8/12 py-4 px-3 text-justify">
                        1 x Salada Radish, 1 x Torradas de Parma, 1 x Chá de Canela, 1 x Suco de Maracujá
                     </td>

                     <td className="w-[12%] rounded-e-lg py-4 px-3 pr-5">
                        20/05 às 18h00
                     </td>
                  </tr>

                  <tr className="flex text-sm border border-muted tracking-wider bg-background rounded-s-lg rounded-e-lg">
                     <td className="w-2/12 rounded-s-lg p-2.5 ">
                        <Select>
                           <SelectTrigger>
                              <SelectValue className="" placeholder="Status" />
                           </SelectTrigger>

                           <SelectContent>
                              <SelectItem value="pending">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-red-500" />
                                 Pendente
                              </SelectItem>

                              <SelectItem value="preparing">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-yellow-500" />
                                 Em preparo
                              </SelectItem>
                              
                              <SelectItem value="delivered">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-green-500" />
                                 Entregue
                              </SelectItem>
                           </SelectContent>
                        </Select>
                     </td>

                     <td className="w-1/12 py-4 px-3">
                        00000004
                     </td>

                     <td className="w-8/12 py-4 px-3 text-justify">
                        1 x Salada Radish, 1 x Torradas de Parma, 1 x Chá de Canela, 1 x Suco de Maracujá
                     </td>

                     <td className="w-[12%] rounded-e-lg py-4 px-3 pr-5">
                        20/05 às 18h00
                     </td>
                  </tr>

                  <tr className="flex text-sm border border-muted tracking-wider bg-background rounded-s-lg rounded-e-lg">
                     <td className="w-2/12 rounded-s-lg p-2.5 ">
                        <Select>
                           <SelectTrigger>
                              <SelectValue className="" placeholder="Status" />
                           </SelectTrigger>

                           <SelectContent>
                              <SelectItem value="pending">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-red-500" />
                                 Pendente
                              </SelectItem>

                              <SelectItem value="preparing">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-yellow-500" />
                                 Em preparo
                              </SelectItem>
                              
                              <SelectItem value="delivered">
                                 <span className="inline-block w-2 h-2 rounded-full mr-2 bg-green-500" />
                                 Entregue
                              </SelectItem>
                           </SelectContent>
                        </Select>
                     </td>

                     <td className="w-1/12 py-4 px-3">
                        00000004
                     </td>

                     <td className="w-8/12 py-4 px-3 text-justify">
                        1 x Salada Radish, 1 x Torradas de Parma, 1 x Chá de Canela, 1 x Suco de Maracujá
                     </td>

                     <td className="w-[12%] rounded-e-lg py-4 px-3 pr-5">
                        20/05 às 18h00
                     </td>
                  </tr>
               </tbody>

               <Pagination className="mt-4">
                  <PaginationContent>
                     <PaginationLink className="cursor-pointer">
                        <PaginationItem>
                           <ChevronLeft />
                        </PaginationItem>
                     </PaginationLink>

                     <PaginationLink className="cursor-pointer">
                        <PaginationItem>1</PaginationItem>
                     </PaginationLink>

                     <PaginationLink className="cursor-pointer">
                        <PaginationItem>2</PaginationItem>
                     </PaginationLink>

                     <PaginationLink className="cursor-pointer">
                        <PaginationItem>
                           <ChevronRight />
                        </PaginationItem>
                     </PaginationLink>
                  </PaginationContent>
               </Pagination>
            </table>
         </div>
      </>
   )
}