"use client"
import { serviceGrid } from "@/app/data/data"
import {motion} from "framer-motion"
function ServiceGrid() {
   const data = serviceGrid       
  return (
  <section
  className="w-full flex justify-center items-center mt-4 md:mt-10"
 >
    <motion.div
     initial={{opacity:0 , x:-100 , scaleX:0.2}}
     whileInView={{opacity:1, x:0, scaleX:1}}
     transition={{duration:.8 ,ease:"easeInOut"}}
      className={`flex  flex-wrap w-auto max-w-175 gap-8`}
>
      {data.map((data) => {
       const Icon = data.icon  
      return(
         <div
     key={data.title}
     className="
     bg-secondary-onyx/50 backdrop-blur-sm max-w-[60dvw] rounded-sm h-auto max-h-[80dvh] mx-auto shadow-md 
     "
     >
    <span className="">
            <Icon className="mx-auto m-3 bg-black px-2 rounded-full hover:bg-white/50 hover:backdrop-blur-md hover:fill-black" size={35}/>
    </span>
     <h2 className="text-sm tracking-tighter  font-semibold">{data.title}</h2>
     <div>
          <p className="w-auto max-w-50 text-xs p-4 tracking-tighter ">{data.description}</p>
     </div>
     </div>   
      )  
        
    })}    
    </motion.div>
  </section>
  )
}
export default ServiceGrid