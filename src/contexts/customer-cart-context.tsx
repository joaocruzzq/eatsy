import { createContext, ReactNode, useEffect, useState } from "react";

export interface ItemOnCartType {
   id: number
   name: string
   price: number
   image: string
   quantity: number
   description: string
}

interface CustomerCartType {
   customerOrder: ItemOnCartType[]

   fetchCustomerCart: () => void

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

   useEffect(() => {
      fetchCustomerCart
   }, [])

   return (
      <CustomerCartContext.Provider
         value={{
            customerOrder,
            onAddItemToCart,
            onChangeItemQuantity,
            onRemoveItemFromCart,
            fetchCustomerCart,
         }}
      >
         { children }
      </CustomerCartContext.Provider>
   )
}