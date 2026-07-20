"use client"
import { Button } from "@/components/ui/button"
import RootHeader from "../ui/general-header"
import "../../globals.css"
import { useRef, useState } from "react"
import { handleEnter, handleLeave } from "@/lib/utils"
import ContentRatio from "./aspect-ratio"
import { SplitText } from "gsap/all"
import { useGSAP } from "@gsap/react"
import Link from "next/link"
import { ArrowUp , ArrowDown } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRouter } from "next/navigation"
import SelectClient from "../modals-components/customer-select"
import { motion } from "framer-motion"
import ClientTerms from "../modals-components/client-terms-agreement"
import AgentTerms from "../modals-components/agent-terms-agreement"
  gsap.registerPlugin(ScrollTrigger , SplitText);
function HeroSection() {
  const router = useRouter()
 const section = useRef<HTMLDivElement | null>(null) 
 const [open , setOpen] = useState<boolean>(false);
 const textRef  = useRef<HTMLParagraphElement | null>(null)
 const [customerType , setCustomerType] = useState<"client" | "agent" | "select">("select")
 const infoRef  = useRef<HTMLParagraphElement | null>(null)
 const [step , setStep] = useState<"select" | "clientTerms" | "agentTerms" >("select")
 const modalRef = useRef<HTMLDivElement | null>(null)
  const [showScrollTop , setShowScrollTop] = useState(false);
  const [showScrollBottom , setShowScrollBottom] = useState(false); 
 const btnRef  = useRef<HTMLButtonElement | null>(null)
  useGSAP(() => {
    const split = SplitText.create(".text" , {type:"words , chars"});
    gsap.from(split.chars,{
     duration:0.8 ,
     y:100,
     autoAlpha:0,
     stagger:0.05,
     ease:"power2.inOut",
    })
  gsap.from(textRef.current,{
    opacity : 0,
    y:-20,
    duration:.7,
    easeReverse:"back.in"
  })
  gsap.to(textRef.current,{
    opacity:1,
    y:0,
     scale:1,
    stagger:2,
    duration:.7,
    ease:"elastic.inOut"
  })
  gsap.from(infoRef.current , {
    opacity:0,
    // yoyo:true,
    x:-20,
  })
  gsap.to(infoRef.current , {
    opacity:1,
    // yoyo:true,
    x:0,
    duration:.9,
    ease:"power1.in"
  })
},{scope:section})
const handleEnterType = () => {
  if (customerType === "client"){
    setStep("clientTerms")
  }
  if(customerType === "agent"){
    setStep("agentTerms")
  }
}
  const modal = modalRef.current;
   const handleScroll = () => {
    //Calculate when we scroll 300 from the top we set Buttom to true
    //Calculate when we reach bottom then setTop to true;
      const scrolledFromTop = modal?.scrollTop as number;
      const height = modal?.clientHeight as number 
      const TotalHeight = modal?.scrollHeight as number; 
    if(scrolledFromTop > 10){
      setShowScrollBottom(true);
    } else{
            setShowScrollBottom(false);
    };

      if(scrolledFromTop + height >= TotalHeight - 10){
      setShowScrollTop(true)
      setShowScrollBottom(false);

    }else{
      setShowScrollTop(false)
    } 
   }
   const scrollTop = () => {
    modal?.scrollTo({
      top:0,
      behavior:"smooth"
    })

   }
   const scrollBottom = () => {
    modal?.scrollTo({
      top:modal.scrollHeight,
      behavior:"smooth"
    })
   }
  return (
   <>
   <main
  className={`${open ? "overflow-y-hidden scrollbar-none" : "overflow-y-auto" }`}
   >
    <RootHeader/>
    <div
     ref={section}
    className={`
    
    flex hero p-5 md:p-10 flex-col justify-center items-center gap-8 md:mt-30 flex-1 `}>
      <div
    
      >
      <p  className="text-xl align-baseline text z-10 max-w-175 md:text-2xl lg:text-4xl w-full text-center tracking-tighter m-2 leading-relaxed font-bold text">  Manage your businesses <span className="text-brand-burn">smarter</span></p>
      <p ref={infoRef} className=" text-sm md:text-xl lg:text-3xl font-semibold text-secondary-onyx text-center tracking-tighter">Everything your restaurant needs in one platform</p>
      </div>
      {/* CTA */}
      <div>
        <p className="text-center text-xs md:text-sm font-light text-black/70 max-w-175 tracking-tighter"> Inventory,orders,bookings,deliveries and customer management - all from one platform</p>
      </div>
      <div className="flex">
       <Button variant="link" onClick={() => router.push("/docs")}>Learn More</Button>
       <Button
       ref={btnRef}
       onClick={() => setOpen(true)}
       onMouseEnter={() => handleEnter(btnRef)}
       onMouseLeave={() => handleLeave(btnRef)} 
       className="rounded-sm bg-brand-burn">Get Started</Button>
      </div>
      <ContentRatio/>
{/*       modals */}
      {open && (
        <>
        <section
        className=" z-10 fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="relative w-full max-w-120">
                      <motion.div 
        onScroll={handleScroll}
        ref={modalRef}
        initial={{scale:0 , opacity:0}}
        animate={{scale:1 , opacity:1}}
        transition={{duration:0.4 , ease:"easeInOut"}}
        className="shadow-md rounded-sm bg-primary-bone  m-2 h-auto max-h-[90dvh] overflow-y-auto scrollbar-thin"> {/* Might need to adjust spacing */}
        {step === "select" && (
           <SelectClient setOpen={setOpen} handleEnterType={handleEnterType} setCustomerType={setCustomerType}/>
        )}
         {step === "clientTerms" && (
          <ClientTerms setOpen={setOpen} setCustomerType={setCustomerType}/>
         )}
         {step === "agentTerms" && (
          <AgentTerms setOpen={setOpen} setCustomerType={setCustomerType}/>
         )}

        </motion.div>
                 
                 
          {showScrollTop && (
        <motion.div
      initial={{opacity:0}}
      whileInView={{opacity:1}}
      transition={{duration:.6 , ease:"easeInOut"}}
      className="p-2 rounded-full z-10 absolute right-5 bottom-6">
      <button onClick={scrollTop} className="w-full  bg-brand-burn p-2 rounded-full animate-bounce">
        <ArrowUp className="w-5 h-5"/>
      </button>
     </motion.div>
      )}

     {showScrollBottom && (
      <motion.div
      initial={{opacity:0}}
      whileInView={{opacity:1}}
      transition={{duration:.6 , ease:"easeInOut"}}
      className="p-2 rounded-full z-10 absolute right-5 bottom-6">
      <button onClick={scrollBottom} className="w-full bg-brand-burn p-2 rounded-full animate-bounce">
        <ArrowDown className="w-5 h-5"/>
      </button>
     </motion.div>
     )}
            </div>
        </section>
        </>
      )}
    </div>
   </main>
   </>
  )
}
export default HeroSection
