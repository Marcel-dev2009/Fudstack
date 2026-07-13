import { priceData } from "@/app/data/data"
import { Button } from "@/components/ui/button";
import { Check, MoveRight } from "lucide-react";
import { TbCurrencyNaira } from "react-icons/tb";
function PriceGrid() {
   const data = priceData
  return (
   <>
   <div
  className=" flex justify-center items-center  mt-8 md:mt-10
  bg-primary-bone border border-primary-blaster md:max-w-280 md:p-10 p-2
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
    className=" backdrop-blur-sm
    h-auto  w-50 md:w-90
    p-8 border border-primary-pearl rounded-sm 
    "
    >
    <span className="flex justify-between text-xs tracking-tighter ">
        <h4>{data.title}</h4> 
      <h4>{data.plan}</h4>

    </span>
   
    <div>
     <span className="inline-flex mt-4">
          <TbCurrencyNaira size={35}/> <h4 className="font-bold text-xl">{data.price}/
          <p className="text-xs font-extralight tracking-tighter">{data.duration}</p></h4>
     </span>    
     <span><p className="text-xs font-light tracking-tighter">{data.description}</p></span> 
     <div className=" mt-2 md:mt-8">
      <span><p className="text-sm font-bold tracking-tighter"> Core Features</p></span>
        {data.features.map((list) => (
         <ol key={list}>
           <li className="flex gap-2 tracking-tighter text-sm"> <Check size={15} className="mt-[1.2px]" color="#E97451"/>{list}</li>
         </ol> 
        ))}  
     </div>
     <div className="w-full mt-4 md:mt-10">
      <Button>Get Started <MoveRight data-icon="inline"/></Button>
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