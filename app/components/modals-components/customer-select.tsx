"use client"
import { Button } from "@/components/ui/button"
import { SetStateAction } from "react"
import { MdClose } from "react-icons/md"
interface Props{
 setOpen:React.Dispatch<SetStateAction<boolean>>,
 setCustomerType:React.Dispatch<SetStateAction< "select" | "client" | "agent">>,
 handleEnterType:() => void
}
function SelectClient({setOpen , setCustomerType , handleEnterType}:Props) {       
  return (
  <>
  <section>
  <div className="flex justify-between m-4">
     <p className="font-semibold text-xs md:text-sm tracking-tighter">Tell us who you <span className="text-brand-burn">are..</span></p>     
    <button  className="justify-end size-10 w-fit h-fit hover:bg-brand-apricot p-1 rounded-full" 
    onClick={() => {
      setOpen(false);
      // setCustomerType("select")
    }}>
      <MdClose size={15}/>    
    </button>
  </div>
  <p className="text-xs ml-4 text-secondary-coal tracking-tighter font-semibold">Select an option to help us serve you better</p>
  <div className="w-auto max-w-75 m-4 rounded-sm mx-auto outline-1 bg-primary-eggshell outline-primary-blaster">
   {/* <p className="text-center text-sm tracking-tighter text-secondary-coal font-semibold">Are you a </p> */}
  <div className="flex justify-evenly p-4">
      <div className="flex gap-2 border border-gray-400/50 hover:border-brand-burn/50 transition-all duration-75 ease-in-out py-4 px-8 rounded-sm">
    <label htmlFor="client" className="text-sm font-semibold tracking-tighter">Client</label>
    <input type="radio"
     name="userType"
     onChange={() => setCustomerType("client")}
      id="client"
      className="accent-brand-burn"
      />
     
   </div>
    <div className="w-[0.5px] h-12 opacity-[0.4] bg-gray-400 "/>
   <div className="flex gap-2 border border-gray-400/50 hover:border-brand-burn/50 transition-all duration-75 ease-in-out py-4 px-8 rounded-sm">
     <label htmlFor="agent" className="text-sm font-semibold tracking-tighter">Agent</label>     
    <input type="radio"
    onChange={() => setCustomerType("agent")}
    name="userType" id="agent" 
    className="accent-brand-burn"/>
   </div>     
  </div>
 
  </div>
   <div className="w-full flex justify-center items-center mb-2">
     <Button className="w-60" onClick={() => {
      handleEnterType();
     }}>
    <p>Continue</p>    
   </Button>
   </div>
  </section>
  </>
  )
}
export default SelectClient