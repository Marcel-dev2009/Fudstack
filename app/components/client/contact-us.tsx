"use client"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { Forward } from "lucide-react"
import Link from "next/link"
import Form from "../ui/contact-form"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { motion } from "framer-motion"
import { SplitText } from "gsap/all"
gsap.registerPlugin(ScrollTrigger ,SplitText)
function Contact() {

 const divRef = useRef<HTMLDivElement | null>(null);
 const textRef = useRef<HTMLSpanElement | null>(null); 
 useGSAP(() => {
    const split = SplitText.create(".text" , {type:"words , chars"})
  gsap.from(split.chars , {
   scrollTrigger:{
    trigger:".text",
    start:"top 80%",
    toggleActions:"play none none none"
   },
   duration:.8,
   y:100,
   autoAlpha:0,
   stagger:0.05,
   ease:"power2.inOut"
  })
 },{scope:divRef}) 
  return (
    <>
    <div
    ref={divRef}
    className="
    bg-primary-bone
    h-auto min-h-screen mb-9
    overflow-y-hidden overflow-x-hidden
    "
    >
    <div>
     <span ref={textRef} className="flex p-4">
    <h2  className="text-brand-burn  text tracking-tighter text-md md:text-xl font-semibold">Contact Us</h2>
     <motion.span
     initial={{opacity:0 , y:100 , x:-2}}
     whileInView={{opacity:1 , y:0 , x:2}}
     transition={{duration:.8}}
     >   <Forward color=" #CC5500" size={15} className="mt-2"/>   </motion.span>  
    </span>     
    <div className="flex flex-col md:flex-row justify-evenly gap-2">
   <motion.span
   initial={{opacity:0 , x:-100 , y:100}}
   whileInView={{opacity:1 , x:0 , y:0}}
   transition={{duration:.8 , ease:"easeInOut"}}
   className="m-8 tracking-tighter w-auto max-w-78 space-y-0">
   <span 
  
   className="text-xl md:text-2xl font-meduim leading-tight">Your message means a lot to us!</span>
   <p className="text-sm">
      We&apos;d love to hear from you! whether you have questions about FudStack,need assistance in using the app or just overall navigation of the app. testmonials would go a long way too✨.            
   </p>
   </motion.span>
      <motion.div 
      initial={{opacity:0 ,  y:100}}
   whileInView={{opacity:1 , y:0}}
   transition={{duration:.8 , ease:"easeInOut"}}
      className="m-2">
          <Form/>
      </motion.div>
      <motion.span
      initial={{opacity:0 , x:100 , y:100}}
   whileInView={{opacity:1 , x:0 , y:0}}
   transition={{duration:.8 , ease:"easeInOut"}}
      className=" text-center md:text-left mb-2 md:self-end gap-y-2">
     <span className="tracking-tight">
     <h3 className="text-sm md:text-md font-semibold">Chat to sales</h3>
      <p className="text-sm font-light">speak to our team.. at marcux@gmail.com</p>
     </span>
     <span>
     <h3 className="text-sm md:text-md font-semibold">Contact</h3>
      <span className="text-sm font-light">
      <p >Enugu State, Nigeria</p>
    <span className="flex flex-col text-blue-500">
            <Link href="tel://+2347071766184">+2347071766184</Link>
      <Link href="tel://+2349122040914">+2349122040914</Link> 
    </span>
      </span>
     </span>
     <span >
     <h3 className="text-sm md:text-md font-semibold">Call us at</h3>
      <p className="text-sm font-light">Tue-Fri.. from 8am to 5pm.</p>
     </span>
    </motion.span>    
    </div>
    </div>
    </div>
    </>
  )
}
export default Contact