import { SetStateAction } from "react"
export type ModalProps = {
   setOpen?:React.Dispatch<SetStateAction<boolean>>,
   setCustomerType?:React.Dispatch<SetStateAction<"client" | "agent" | "select">>,
   handleEnterType?:() => void       
}
