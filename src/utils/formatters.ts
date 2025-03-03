export const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
   day: "2-digit",
   month: "short",
   year: "numeric"
})

function changeCPF(CPF: string) {
   const numbers = CPF.replace(/\D/g, "")

   if (numbers.length <= 3) {
      return numbers.replace(/(\d{1,3})/, "$1")
   }
   
   else if (numbers.length <= 6) {
      return numbers.replace(/(\d{3})(\d{1,3})/, "$1.$2")
   }
   
   else if (numbers.length <= 9) {
      return numbers.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3")
   }
   
   else {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4")
   }
}

export function onFormatCPF(e: React.ChangeEvent<HTMLInputElement>, setValue: any) {
   const initialValue = e.target.value
   const formattedCPF = changeCPF(initialValue)

   setValue("ownerCPF", formattedCPF)
}

function changeCardNumber(CardNumber: string) {
   const numbers = CardNumber.replace(/\D/g, "")

   if (numbers.length <= 4) {
      return numbers.replace(/(\d{1,4})/, "$1")
   }

   else if (numbers.length <= 8) {
      return numbers.replace(/(\d{4})(\d{1,4})/, "$1 $2")
   }

   else if (numbers.length <= 12) {
      return numbers.replace(/(\d{4})(\d{4})(\d{1,4})/, "$1 $2 $3")
   }

   else {
      return numbers.replace(/(\d{4})(\d{4})(\d{4})(\d{1,4})/, "$1 $2 $3 $4")
   }
}

export function onFormatCardNumber(e: React.ChangeEvent<HTMLInputElement>, setValue: any) {
   const iniitalValue = e.target.value
   const formattedCardNumber = changeCardNumber(iniitalValue)

   setValue("cardNumber", formattedCardNumber)
}