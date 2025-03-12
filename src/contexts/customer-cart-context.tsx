import { createContext, ReactNode, useEffect, useState } from "react";

export interface ItemOnCartType {
   id: number
   name: string
   price: number
   image: string
   quantity: number
   description: string
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

interface CustomerCartType {
   payment: PaymentMethod | undefined
   address: AddressInputs | null
   
   customerOrder: ItemOnCartType[]

   fetchCustomerCart: () => void
   
   onAddAddress: (data: AddressInputs) => void
   onSetPaymentMethod: (data: PaymentMethod) => void

   onAddItemToCart: (address: ItemOnCartType) => void
   onRemoveItemFromCart: (itemID?: number) => void

   onChangeItemQuantity: (itemID: number, quantity: number) => void
}

interface CustomerCartProviderProps {
   children: ReactNode
}

export const CustomerCartContext = createContext({} as CustomerCartType)

export function CustomerCartProvider({ children }: CustomerCartProviderProps) {
   const [customerOrder, setCustomerOrder] = useState<ItemOnCartType[]>([])

   function fetchCustomerCart() {
      setCustomerOrder((prevState) => [...prevState])
   }
   
   function onAddItemToCart(data: ItemOnCartType) {
      const itemAlreadyOnCart = customerOrder.some((item) => item.id === data.id)

      if(itemAlreadyOnCart) {
         const updatedQuantity = customerOrder.map((item) => item.id === data.id ? {
            ...item,
            quantity: item.quantity + data.quantity
         } : item)

         setCustomerOrder(updatedQuantity)
      }

      else {
         setCustomerOrder((prevState) => [...prevState, data])
      }
   }

   function onRemoveItemFromCart(itemID?: number) {
      if (itemID) {
         const cartWithoutDeletedItem = customerOrder.filter((item) => item.id !== itemID)
         setCustomerOrder(cartWithoutDeletedItem)
      }

      else {
         setCustomerOrder([])
      }

      fetchCustomerCart()
   }

   function onChangeItemQuantity(itemID: number, quantity: number) {
      setCustomerOrder((prevState) => prevState.map((item) => item.id === itemID ? {...item, quantity} : item))
   }

   const [address, setAddress] = useState<AddressInputs | null>(null)

   function onAddAddress(addressData: AddressInputs) {
      setAddress(addressData)
   }

   const [payment, setPayment] = useState<PaymentMethod | undefined>(undefined)

   function onSetPaymentMethod(method: PaymentMethod) {
      setPayment(method)
   }

   useEffect(() => {
      fetchCustomerCart
   }, [])

   return (
      <CustomerCartContext.Provider
         value={{
            address,
            payment,
            customerOrder,
            onAddItemToCart,
            onSetPaymentMethod,
            onChangeItemQuantity,
            onRemoveItemFromCart,
            fetchCustomerCart,
            onAddAddress,
         }}
      >
         { children }
      </CustomerCartContext.Provider>
   )
}