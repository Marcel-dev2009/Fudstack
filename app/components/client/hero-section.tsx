"use client"
import { Button } from "@/components/ui/button"
import RootHeader from "../ui/general-header"
import { useRef } from "react"
import ContentRatio from "./aspect-ratio"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
  gsap.registerPlugin(ScrollTrigger);
function HeroSection() {
 const section = useRef<HTMLDivElement | null>(null) 
 const textRef  = useRef<HTMLParagraphElement | null>(null)
 const infoRef  = useRef<HTMLParagraphElement | null>(null)
  useGSAP(() => {
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
 const tl = gsap.timeline({
  defaults:{
  ease:"power1.inOut"
  },
  scrollTrigger:{
  trigger:section.current,
  start:"center bottom",
  scrub:true,
  // pin:true,
  end:"+=400px" // end after scrolling 500px beyond start
  },

 });
 tl.to(section.current , {
  // backgroundColor:"#36454F",
  scale:0.7,
  duration:1.2
 });
},{scope:section})
  return (
   <>
   <main

   >
    <RootHeader/>
    <div
     ref={section}
    className="flex hero  p-5 md:p-10 flex-col justify-center items-center gap-8 md:mt-30 flex-1">
      <div
    
      >
      <p ref={textRef} className="text-xl z-10 max-w-175 md:text-2xl lg:text-4xl w-full text-center tracking-tighter m-2 leading-relaxed font-bold text">  Manage your businesses <span className="text-brand-burn">smarter</span></p>
      <p ref={infoRef} className=" text-sm md:text-xl lg:text-3xl font-semibold text-secondary-onyx text-center tracking-tighter">Everything your restaurant needs in one platform</p>
      </div>
      {/* CTA */}
      <div>
        <p className="text-center text-xs md:text-sm font-light text-black/70 max-w-175 tracking-tighter"> Inventory,orders,bookings,deliveries and customer management - all from one platform</p>
      </div>
      <div className="flex">
       <Button variant="link">Learn More</Button>
       <Button className="rounded-sm bg-brand-burn">Get Started</Button>
      </div>
      <ContentRatio/>
    </div>
   </main>
   </>
  )
}
export default HeroSection