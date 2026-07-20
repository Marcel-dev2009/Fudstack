"use client"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/all"
import {motion} from "framer-motion"
import { SplitText } from "gsap/all"
import ServiceGrid from "../ui/service-grid"
import { useRef } from "react"
gsap.registerPlugin(ScrollTrigger , SplitText)
function Services() {
 const divRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() =>{
  const split = SplitText.create(".text",{type:"words,chars"})
  gsap.from(split.words, {
    scrollTrigger:{
      trigger:".text",
      start:"top 80%",
      scrub:false,
    },
    duration:.7,
    stagger:.08,
    ease:"power2.inOut",
    y:100,
    autoAlpha:1,
  })
  },{scope:divRef})
  return (
    <div
    ref={divRef}
    className="bg-secondary-licorice text-white
    w-auto
    h-auto min-h-[80dvh]
    p-10
    "
    >
           <h2 className="p-4 text-sm font-light text-center text-brand-apricot tracking-tighter">Our Services</h2>    
    <div className="text-center">
     <motion.h1 
     initial={{opacity:0}}
     whileInView={{opacity:1}}
     className="font-heading text  md:text-xl lg:text-2xl font-bold tracking-tighter">The services we offer include ...</motion.h1>
     <div>
       <ServiceGrid/>   
     </div>
    </div>
    </div>
  )
}
export default Services