"use client"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { Button } from "@/components/ui/button"
import aboutPhoto from "../../../public/about.png"
import Image from "next/image"
import {MoveRight} from "lucide-react"
import { SplitText } from "gsap/all"
import AboutGrid from "../ui/about-grid"
import { useRef } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
gsap.registerPlugin(ScrollTrigger , SplitText);
function About() {
  const router = useRouter();
   const section = useRef<HTMLDivElement| null>(null);  
   const gridRef = useRef<HTMLDivElement | null>(null);
    useGSAP(() => {
     const split = SplitText.create(".text",{type:"words , chars"})
     gsap.from(split.words,{
      scrollTrigger:{
        scrub:true,
       trigger:".text",
       start:"top 100%",
       toggleActions:"play none none none"
      },
      duration:1.2,
      y:100,
      autoAlpha:0,
      stagger:0.05,
      ease:"power2.inOut"
     }) 
     const tl = gsap.timeline({
       defaults:{
        opacity:0.2,
        x:-20
       } ,
      scrollTrigger:{
        trigger:gridRef.current,
        start:"-80% top",
        end:"center top",
         scrub:true, 
      }  
     })
     tl.from(gridRef.current , {x:-20 , opacity:0.2 , ease:"power1.in"})
     tl.to(gridRef.current, {x:0 , opacity:1, ease:"power1.in"})
    },{scope:section})
  return (
    <>
    <div
    ref={section}
    className="bg-black text-white min-h-screen h-auto">
       <h2 className="p-4 text-xl font-bold  tracking-tighter">About Us</h2>
      <div className="flex flex-col lg:flex-row  justify-evenly ">
           <div className="bg-secondary-onyx/20 backdrop-blur-sm rounded-2xl w-auto max-w-75 mx-auto md:mx-0">
          <Image src={aboutPhoto} alt="Fudstack - About Photo" aria-label="about Photo" className="h-auto max-h-[65dvh] w-fit max-w-175 rounded-2xl object-contain mx-auto p-2"/>
       </div>
       <div>
          <h2 className="w-auto text max-w-md font-semibold text-md text-center md:text-2xl align-baseline tracking-tighter">We automate your tasks without the friction of complexity.</h2>

          <div className="mt-2 p-4  gap-8">
             <motion.p
             initial={{opacity:0 , x:-100 , y:20}}
             whileInView={{opacity:1 , x:0 , y:0}}
             transition={{duration:1 ,ease:"easeInOut" }}
             className=" w-auto max-w-98 text-center font-light text-sm tracking-tighter">
               Your all in one solution for management of day to day tasks in your workplace 
               such as Inventory management,  client interaction, deliveries and scheduling    
             </motion.p>
             <div className="w-full flex justify-center">
              <Button
                onClick={() => router.push("/docs")}
              className="m-2 w-1/3 "><span className="tracking-tight text-xs">Read More</span> <MoveRight data-icon="inline-end"/> </Button>      
              </div> 
          </div>
          <div
          ref={gridRef}
          className="grid p-4"
          >
            <AboutGrid/>
          </div>
       </div>
        
      </div>
    </div>
    </>
  )
}
export default About