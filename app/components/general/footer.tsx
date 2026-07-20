/* eslint-disable @next/next/no-img-element */
import { footerItems } from "@/app/data/data"
import { serviceGrid } from "@/app/data/data"
import Link from "next/link"
import logo from "../../../public/icon.png"
import { brand } from "@/brand"
import Image from "next/image"
import qr from '../../../public/frame.png'
function Footer() {
   const data = footerItems 
   const service = serviceGrid      
   const date = new Date();
   const currentDate = date.getFullYear();
  return (
   <>
 <section
     className="
    bg-primary-eggshell text-black/70
    h-auto min-h-[50dvh]"
 >
      <div className="flex justify-between flex-col md:flex-row">
      <div className="flex flex-col">
    <div className="flex">
            <div className="m-10">
         <div className="">
           <h2 className="tracking-tighter text-sm font-semibold mb-2 ">Quick Links</h2>
          {data.map((data) => {       
           return(
             <Link
             href="#"
             key={data.title}
             className="hover:underline"
             >
               <h3 className=" tracking-tighter text-sm font">{data.title}</h3>
             </Link>       
           )         
          })}
         </div>
       </div>
       <div className="m-10 flex gap-10">
          <div>
              <h2 className="tracking-tighter text-sm font-semibold mb-2 ">services</h2>
          {service.map((s) => (
                 <Link
            key={s.title}
            className="hover:underline"
            href="#"
            >
             <h3 className=" tracking-tighter text-sm font">
                 {s.title} </h3>       
            </Link>        
          ))}      
          </div>
       </div>
    </div>
       <div className="flex mx-auto">
          <Image src={logo} alt={brand.ariaLogo} aria-label={brand.ariaLogo} width={30} height={30}/>
          <h2 className="text-md tracking-tighter font-bold">{brand.name}</h2>
       </div>
      </div> {/* First Division */}
      <div className="flex flex-col m-10">
           <div className="">
          <h2 className="tracking-tighter text-sm font-semibold" >Scan to connect with us on whatsapp</h2>
       </div>
       <div className="bg-white/5 backdrop-blur-sm shadow-md w-full max-w-50 h-auto min-h-[25dvh] border border-dotted rounded-sm border-black mx-auto m-2">
       <a href="https://wa.me/2349122040914?text=Good%20day%20Marcel."> 
       <Image src={qr} alt="scan qr-code" aria-label="Scan qr code to contact us"/>
       </a>
       </div>
       <div className="flex  gap-2 justify-center">
          <h3 className="text-xs  tracking-tighter font-semibold text-gray-500">Privacy Policy</h3> 
          <div className="w-[0.5px] h-4 bg-gray-400"/> 
          <h3 className="text-xs  tracking-tighter font-semibold text-gray-500">Terms and Condtions</h3>
       </div>
      </div>
      </div>  
      <div className=" tracking-tighter text-center text-xs mb-2 font-light">Copyright &copy; - {currentDate} All Right Reserved </div>
 </section>
   </>
  )
}
export default Footer