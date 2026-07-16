import { priceData } from "@/app/data/data"
import { Button } from "@/components/ui/button";
import { Check, MoveRight } from "lucide-react";
import { TbCurrencyNaira } from "react-icons/tb";
function PriceGrid() {   const data = priceData
  return (
   <>
   <div
  className=" flex justify-center items-center  mt-8 md:mt-10
  bg-primary-bone border border-primary-blaster md:max-w-280 md:p-10 p-2
  overflow-y-auto overflow-x-hidden
  "
   >
     <div
      className="
    flex gap-8 flex-col md:flex-row
     
   "
     >
    {data.map((data) => (
    <div
    key={data.title}
    className={`backdrop-blur-sm
    h-auto  w-auto md:w-80
    p-8 border ${data.className} rounded-sm 
    `}
    >
    <span className="flex justify-between text-xs 
      
    tracking-tighter ">
        <h4>{data.title}</h4> 
      <h4 className={`${data.fill} text-white`}>{data.trend}</h4>

    </span>
   
    <div>
     <span className="inline-flex mt-4">
          <TbCurrencyNaira size={35}/> <h4 className="font-bold text-xl">{data.price}/
          <p className="text-xs font-meduim tracking-tighter">{data.duration}</p></h4>
     </span>    
     <span><p className="text-xs font-light tracking-tighter">{data.description}</p></span> 
     <div className=" mt-2 md:mt-8">
      <span><p className="text-sm font-bold tracking-tighter"> Core Features</p></span>
        {data.features.map((list) => (
         <ol key={list}>
           <li className="flex gap-2 tracking-tighter text-sm"> <Check size={15} className="mt-[1.2px]" color="#E97451"/>{list}</li>
         </ol> 
        ))}  
        <Button className="w-auto max-w-60 mt-4 p-4">Get Started</Button>
     </div>
    </div>
    </div>    
    ))}
     </div>     
   </div>
   </>
  )
}
export default PriceGrid