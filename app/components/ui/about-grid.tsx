"use client"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { gridItems } from "@/app/data/data"
import { useRef } from "react"
gsap.registerPlugin(ScrollTrigger);
function AboutGrid() {
 const gridRef = useRef<HTMLDivElement| null>(null)  
  useGSAP(() => {
   const tl = gsap.timeline({
     defaults:{
      opacity:0.2,
      x:-20
     } ,
    scrollTrigger:{
      trigger:gridRef.current,
      start:"-60% top",
      end:"bottom top",
      markers:true,
       scrub:true, 
    }  
   })
   tl.from(gridRef.current , {x:-20 , opacity:0.2 , ease:"power1.in"})
   tl.to(gridRef.current, {x:0 , opacity:1 , duration:.7 , ease:"power1.in"})
  },{scope:gridRef})
    const data = gridItems
return(
   <>
   <div 
     ref={gridRef}
   className="grid grid-cols-1 gap-4 md:grid-cols-2">
     {data.map((data) => {
   const Icon = data.icon   
  return(
       <div
     
    key={data.title}
    className="bg-secondary-onyx/20
     backdrop-blur-sm
     shadow-blue-950
      rounded-2xl
       w-auto 
       max-w-55
       h-auto
       mx-auto
       mb-2
       "
    >
      <Icon className="m-4" fill={data.fill}/>
     <div>
      <h2 className="m-2 font-semibold align-baseline tracking-tighter">{data.title}</h2>    
     </div>
     <div>
      <p className="text-xs md:text-sm font-light mt-4 m-2 tracking-tighter">{data.description}</p>
     </div>
    </div>
  )

})}
   </div>
   </>
)
}
export default AboutGrid