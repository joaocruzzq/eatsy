import { createContext, ReactNode, useState } from "react";

interface ItemOnCartType {
   id: number
   name: string
   price: number
   quantity: number
   plateIMG: string
}

interface CustomerCartType {
   customerOrder: ItemOnCartType[]

   onRemoveItemFromCart: (itemID: number | []) => void
   onAddItemToCart: (data: ItemOnCartType) => void

   onChangeItemQuantity: (itemID: number, quantity: number) => void
}

interface CustomerCartProviderProps {
   children: ReactNode
}

export const CustomerCartContext = createContext({} as CustomerCartType)

export function CustomerCartProvider({ children }: CustomerCartProviderProps) {
   const [customerOrder, setCustomerOrder] = useState<ItemOnCartType[]>([])

   function onAddItemToCart(data: ItemOnCartType) {
      const itemAlreadyOnCart = customerOrder.map((item) => item.id === data.id)

      if(itemAlreadyOnCart) {
         const updatedQuantity = customerOrder.map((item) => item.id === data.id ? {
            ...data,
            quantity: item.quantity + data.quantity
         } : item)

         setCustomerOrder(updatedQuantity)
      }

      else {
         setCustomerOrder((prevState) => [...prevState, data])
      }
   }

   function onRemoveItemFromCart(itemID: number | []) {
      const cartWithoutDeletedItem = customerOrder.filter((item) => item.id !== itemID)

      setCustomerOrder(cartWithoutDeletedItem)
   }

   function onChangeItemQuantity(itemID: number, quantity: number) {
      setCustomerOrder((prevState) => prevState.map((item) => item.id === itemID ? {...item, quantity} : item))
   }

   return (
      <CustomerCartContext.Provider
         value={{
            customerOrder,
            onAddItemToCart,
            onChangeItemQuantity,
            onRemoveItemFromCart,
         }}
      >
         { children }
      </CustomerCartContext.Provider>
   )
}