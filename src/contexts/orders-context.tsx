import { toast } from "sonner";
import { api } from "@/lib/axios";

import { CustomerCartContext } from "./customer-cart-context";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type OrderStatus = "pending" | "preparing" | "delivered"

type FilteredDescription = {
   plateName: string
   plateQuantity: number
}

interface OrderType {
   id: number
   date: Date
   total: number
   status: OrderStatus
   address: AddressInputs
   payment: PaymentMethod
   description: FilteredDescription
}

type AddressInputs = {
   CEP: string
   city: string
   state: string
   street: string
   number: string
   complement?: string
   neighborhood: string
   additionalInfo?: string
}

type CardInputs = {
   method: string
   cardName: string
   ownerCPF: string
   cardNumber: string
   expirationM: string
   expirationY: string
   verificationCode: string
}

type PaymentMethod = 
   { method: "pix" } |
   { method: "cash"; cashData: number } |
   { method: "card"; cardData: CardInputs }
   
interface OrdersContextType {
   orders: OrderType[]

   ordersFilter: string
   filteredOrders: OrderType[]

   totalPages: number
   currentPage: number

   onAddAddress: (data: AddressInputs) => void
   onSetPaymentMethod: (data: PaymentMethod) => void

   ordersPagination: (page: number) => void

   onAddNewOrder: (data: OrderType) => void
   onFilterOrders: (status: string) => void

   onUpdateOrderStatus: (orderId: number, newOrderStatus: string) => void
}

interface OrdersContextProviderProps {
   children: ReactNode
}

export const OrdersContext = createContext({} as OrdersContextType)

export function OrdersContextProvider({ children }: OrdersContextProviderProps) {
   const { customerOrder, onRemoveItemFromCart } = useContext(CustomerCartContext)

   const [orders, setOrders] = useState<OrderType[]>([])
   const [ordersFilter, setOrdersFilter] = useState("")

   const [totalPages, setTotalPages] = useState(1)
   const [currentPage, setCurrentPage] = useState(1)

   const itemsPerPage = 7

   async function fetchOrders(page = 1, filter: typeof ordersFilter) {
      const { data, headers } = await api.get("orders", {
         params: {
            _sort: "date",
            _order: "desc",

            _limit: itemsPerPage,
            _page:page,
            status: filter || undefined
         }
      })

      setOrders(data)

      const totalCount = Number(headers["x-total-count"])
      setTotalPages(Math.ceil(totalCount / itemsPerPage))
   }

   const filteredOrders = ordersFilter ? orders.filter((order) => order.status === ordersFilter) : orders
   
   function onFilterOrders(status: string) {
      const newFilter = status === "all" ? "" : status
      setOrdersFilter(newFilter);
      setCurrentPage(1)
      
      fetchOrders(1, newFilter)
   }

   const [address, setAddress] = useState<AddressInputs>()

   function onAddAddress(addressData: AddressInputs) {
      setAddress(addressData)
   }

   const [payment, setPayment] = useState<PaymentMethod>()

   function onSetPaymentMethod(method: PaymentMethod) {
      setPayment(method)
   }

   async function onAddNewOrder(data: OrderType) {
      if(customerOrder.length > 0) {
         try {
            if (!address) {
               toast.error("Insira um endereço de entrega.")
               return
            }

            if (!payment) {
               toast.error("Insira um metódo de pagamento.")
               return
            }

            else {
               const formattedDescription = customerOrder.map((item) => ({
                  name: item.name,
                  quantity: item.quantity
               }))

               const formattedOrder = {
                  ...data,
                  date: new Date,
                  status: "pending",
                  description: formattedDescription,
                  id: Math.floor(Date.now() + Math.random() * 1000),
                  total: customerOrder.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2),

                  payment,
                  address
               }

               const response = await api.post("/orders", {
                  ...formattedOrder,
               })

               toast.success("Pedido feito com sucesso!")

               onRemoveItemFromCart()
               setOrders(state => [response.data, ...state.slice(0, itemsPerPage - 1)])
            }
         }

         catch {
            toast.error("Erro ao finalizar pedido.")
         }
      }

      else {
         toast.error("Erro ao finalizar pedido.")
      }

      fetchOrders(1, ordersFilter)
   }

   function ordersPagination(page: number) {
      setCurrentPage(page)
      fetchOrders(page, ordersFilter)
   }

   async function onUpdateOrderStatus(orderId: number, newOrderStatus: string) {
      try {
         await api.patch(`/orders/${orderId}`, { status: newOrderStatus })
         toast.success("Status alterado com sucesso.")

         fetchOrders(currentPage, ordersFilter)
      }

      catch {
         toast.error("Erro ao atualziar status.")
      }
   }

   useEffect(() => {
      fetchOrders(currentPage, ordersFilter)
   }, [])

   return (
      <OrdersContext.Provider
         value={{
            orders,
            totalPages,
            currentPage,
            ordersFilter,
            filteredOrders,
            onAddNewOrder,
            onFilterOrders,
            ordersPagination,
            onUpdateOrderStatus,
            onSetPaymentMethod,
            onAddAddress,
         }}
      >
         { children }
      </OrdersContext.Provider>
   )
}