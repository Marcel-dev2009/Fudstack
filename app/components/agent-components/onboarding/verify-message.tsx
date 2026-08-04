"use client"
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {motion} from "framer-motion";
import { auth } from "@/lib/auth";
import { SetStateAction, useEffect } from "react";
type Session = Awaited<ReturnType<typeof auth.api.getSession>>
interface Props {
  session : Session    
  setStep:React.Dispatch<SetStateAction<number>>    
}
/* 
a timer variable to store the function
a new a signup to an event and i need a cleanup
*/
function VerificationNotification({session , setStep}:Props) {
  useEffect(() => {
   const timer = setTimeout(() => {
    setStep((prev) => prev + 1);
   } , 4000);
   return () => clearTimeout(timer);
  },[setStep])
  if(!session) return;
  return (
    <motion.section>
            <div className="bg-white">
          <div>
           <DotLottieReact
          src="https://lottie.host/2c973a33-12ab-4548-972c-a3a611f72b57/Ds7ve0aZXr.lottie"
          autoplay
    />    </div>
          <div>
             <p className="
             tracking-tighter
             text-xs 
             font-semibold
             ">The verification code has been sent to {session.user.email}</p>
          </div>
          
          </div>
    </motion.section>
  )
}
export default VerificationNotification