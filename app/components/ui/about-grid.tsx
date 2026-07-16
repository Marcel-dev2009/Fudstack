"use client"

import { gridItems } from "@/app/data/data"

function AboutGrid() {
const data = gridItems
return(
   <>
   <div 
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
      <p className="text-xs  mt-4 m-2 tracking-tighter">{data.description}</p>
     </div>
    </div>
  )

})}
   </div>
   </>
)
}
export default AboutGrid