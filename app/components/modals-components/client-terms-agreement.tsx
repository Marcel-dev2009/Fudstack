"use client"
import type { ModalProps } from "@/app/types/type";
import { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
function ClientTerms({setOpen , setCustomerType}:ModalProps) {
const [showRouteButton , setShowRouteButton] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
   const observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if(entry.isIntersecting){
     setShowRouteButton(true)
    }
   });
   observer.observe(bottomRef.current!)
   return () => {
    observer.disconnect();
   }
  },[])
  const router = useRouter();
  return (
    <>
    <section>
      <div className="flex justify-between m-4">
         <p className="font-semibold text-xs md:text-sm tracking-tighter">Terms and agreement <span className="text-brand-burn">for clients..</span></p>     
        <button  className="justify-end size-10 w-fit h-fit hover:bg-brand-apricot p-1 rounded-full" 
        onClick={() => {
          setOpen(false);
          setCustomerType("select")
        }}>
          <MdClose size={15}/>    
        </button>
      </div>
      <div>
    <div className="">
  <span className="text-wrap">
 <pre className="m-2 text-sm  tracking-tighter">
  CLIENT TERMS AND CONDITIONS <br />

 Welcome to FudStack.
 </pre>

 <pre className="w-auto max-w-98 m-2 text-xs text-wrap font-semibold">
  Please read these Terms and Conditions carefully before using our platform.
 </pre>

<pre className="w-auto max-w-98 m-2 text-xs text-wrap">
  1. By creating an account, you confirm that all information provided is accurate and belongs to you.
</pre>

<pre className="w-auto max-w-98 m-2 text-xs text-wrap">
  
2. FudStack acts as a technology platform that connects customers with registered restaurants. We do not prepare, package, or deliver food ourselves unless otherwise stated.
</pre>

<pre className="w-auto max-w-98 m-2 text-xs text-wrap">

  3. Customers are responsible for reviewing their orders before confirming payment. Once an order has been accepted by a restaurant, modifications may not be possible.
</pre>

<pre className="w-auto max-w-98 m-2 text-xs text-wrap">

  4. All prices, menus, delivery fees, and estimated delivery times are determined by the restaurant and may change without prior notice.
</pre>

<pre className="w-auto max-w-98 m-2 text-xs text-wrap">
  5. Payments processed through the platform are subject to our payment provider&apos;s policies. Refund requests are handled according to the restaurant&apos;s cancellation and refund policy.

</pre>

<pre className="w-auto max-w-98 m-2 text-xs text-wrap">
  6. Users must not engage in fraudulent activities, abusive behavior, or attempt to misuse the platform in any manner.
</pre>

<pre className="w-auto max-w-98 m-2 text-xs text-wrap">
  7. Customer accounts may be suspended or permanently terminated if these Terms are violated.
</pre>

<pre className="w-auto max-w-98 m-2 text-xs text-wrap">
  8. FudStack is not responsible for losses resulting from incorrect delivery information supplied by the customer or circumstances beyond our reasonable control.
</pre>

<pre className="w-auto max-w-98 m-2 text-xs text-wrap">
  9. We may update these Terms from time to time. Continued use of the platform after such updates constitutes acceptance of the revised Terms.
</pre>

<pre className="w-auto max-w-98 m-2 text-xs text-wrap">
  
10. By proceeding, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
</pre>
  </span>

  <label htmlFor="agreeTerms" className="text-sm tracking-tighter font-semibold m-4">
    <input
      type="checkbox"
      id="agreeTerms"
      name="agreeTerms"
      required
      className="p-2"
    />
   <span className="ml-1">I have read and agree to the Terms and Conditions.</span>
  </label>

  <div className="h-1" ref={bottomRef}/>
   {showRouteButton && (
    <div className="w-full">
      <motion.button 
      initial={{opacity:0}}
      whileInView={{opacity:1}}
      whileTap={{scale:1}}
      transition={{duration:.2 , ease:"easeInOut", type:"tween"}}
      className="
       block text-sm 
       tracking-tighter 
       font-semibold
        bg-brand-burn
         text-primary-bone
         w-3/5
         rounded-sm
         shadow-md
         mx-auto
         px-5
         py-2
         mb-2
         "
         onClick={() => {
          router.push("/client/auth")
         }}
         >
     continue
    </motion.button>
    </div>
   )}
</div>
      </div>
    </section>
    </>
  )
}
export default ClientTerms