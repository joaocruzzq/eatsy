import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Helmet } from "react-helmet-async"

export function Pedidos() {
   return (
      <>
         <Helmet title="Pedidos" />

         <h1 className="my-6 text-xl tracking-wide font-semibold">
            Histórico de Pedidos
         </h1>

         <div>
            <table className="w-full">
               <tbody className="grid gap-3">
                  <tr className="flex text-sm tracking-wider">
                     <td className="w-2/12 rounded-s-lg p-2.5 bg-zinc-200 dark:bg-muted">
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

                     <td className="w-1/12 py-4 px-3 bg-zinc-200 dark:bg-muted">
                        00000004
                     </td>

                     <td className="w-8/12 py-4 px-3 bg-zinc-200 dark:bg-muted text-justify">
                        1 x Salada Radish, 1 x Torradas de Parma, 1 x Chá de Canela, 1 x Suco de Maracujá
                     </td>

                     <td className="w-[12%] rounded-e-lg py-4 px-3 pr-5 bg-zinc-200 dark:bg-muted">
                        20/05 às 18h00
                     </td>
                  </tr>

                  <tr className="flex text-sm tracking-wider">
                     <td className="w-2/12 rounded-s-lg p-2.5 bg-zinc-200 dark:bg-muted">
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

                     <td className="w-1/12 py-4 px-3 bg-zinc-200 dark:bg-muted">
                        00000004
                     </td>

                     <td className="w-8/12 py-4 px-3 bg-zinc-200 dark:bg-muted text-justify">
                        1 x Salada Radish, 1 x Torradas de Parma, 1 x Chá de Canela, 1 x Suco de Maracujá
                     </td>

                     <td className="w-[12%] rounded-e-lg py-4 px-3 pr-5 bg-zinc-200 dark:bg-muted">
                        20/05 às 18h00
                     </td>
                  </tr>

                  <tr className="flex text-sm tracking-wider">
                     <td className="w-2/12 rounded-s-lg p-2.5 bg-zinc-200 dark:bg-muted">
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

                     <td className="w-1/12 py-4 px-3 bg-zinc-200 dark:bg-muted">
                        00000004
                     </td>

                     <td className="w-8/12 py-4 px-3 bg-zinc-200 dark:bg-muted text-justify">
                        1 x Salada Radish, 1 x Torradas de Parma, 1 x Chá de Canela, 1 x Suco de Maracujá
                     </td>

                     <td className="w-[12%] rounded-e-lg py-4 px-3 pr-5 bg-zinc-200 dark:bg-muted">
                        20/05 às 18h00
                     </td>
                  </tr>

                  <tr className="flex text-sm tracking-wider">
                     <td className="w-2/12 rounded-s-lg p-2.5 bg-zinc-200 dark:bg-muted">
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

                     <td className="w-1/12 py-4 px-3 bg-zinc-200 dark:bg-muted">
                        00000004
                     </td>

                     <td className="w-8/12 py-4 px-3 bg-zinc-200 dark:bg-muted text-justify">
                        1 x Salada Radish, 1 x Torradas de Parma, 1 x Chá de Canela, 1 x Suco de Maracujá
                     </td>

                     <td className="w-[12%] rounded-e-lg py-4 px-3 pr-5 bg-zinc-200 dark:bg-muted">
                        20/05 às 18h00
                     </td>
                  </tr>

                  <tr className="flex text-sm tracking-wider">
                     <td className="w-2/12 rounded-s-lg p-2.5 bg-zinc-200 dark:bg-muted">
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

                     <td className="w-1/12 py-4 px-3 bg-zinc-200 dark:bg-muted">
                        00000004
                     </td>

                     <td className="w-8/12 py-4 px-3 bg-zinc-200 dark:bg-muted text-justify">
                        1 x Salada Radish, 1 x Torradas de Parma, 1 x Chá de Canela, 1 x Suco de Maracujá
                     </td>

                     <td className="w-[12%] rounded-e-lg py-4 px-3 pr-5 bg-zinc-200 dark:bg-muted">
                        20/05 às 18h00
                     </td>
                  </tr>

                  <tr className="flex text-sm tracking-wider">
                     <td className="w-2/12 rounded-s-lg p-2.5 bg-zinc-200 dark:bg-muted">
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

                     <td className="w-1/12 py-4 px-3 bg-zinc-200 dark:bg-muted">
                        00000004
                     </td>

                     <td className="w-8/12 py-4 px-3 bg-zinc-200 dark:bg-muted text-justify">
                        1 x Salada Radish, 1 x Torradas de Parma, 1 x Chá de Canela, 1 x Suco de Maracujá
                     </td>

                     <td className="w-[12%] rounded-e-lg py-4 px-3 pr-5 bg-zinc-200 dark:bg-muted">
                        20/05 às 18h00
                     </td>
                  </tr>

                  <tr className="flex text-sm tracking-wider">
                     <td className="w-2/12 rounded-s-lg p-2.5 bg-zinc-200 dark:bg-muted">
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

                     <td className="w-1/12 py-4 px-3 bg-zinc-200 dark:bg-muted">
                        00000004
                     </td>

                     <td className="w-8/12 py-4 px-3 bg-zinc-200 dark:bg-muted text-justify">
                        1 x Salada Radish, 1 x Torradas de Parma, 1 x Chá de Canela, 1 x Suco de Maracujá
                     </td>

                     <td className="w-[12%] rounded-e-lg py-4 px-3 pr-5 bg-zinc-200 dark:bg-muted">
                        20/05 às 18h00
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </>
   )
}