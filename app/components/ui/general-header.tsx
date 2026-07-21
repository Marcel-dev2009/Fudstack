"use client";
import Image from "next/image";
import logo from "../../../public/icon.png"
import Link from "next/link";
import DropDown from "../header-dropdown";
import {DropItems} from "@/app/data/data"
import { useRef, useState } from "react";
import { handleEnter , handleLeave } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion , AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
function RootHeader() {
  const router = useRouter();
 const btnRef = useRef<HTMLButtonElement | null>(null); 
  const [itemOpen , setItemOpen] = useState<boolean>(false)
  return (
    <>
    <div className= "md:grid md:grid-cols-3 flex justify-between gap-4 p-4">
     <span className="m-2">
      <Image src={logo} alt="FudStack's Logo" width={24} height={24}/>
     </span>
     <div className="hidden md:flex items-center justify-center ">
      <nav  className="flex gap-8 m-2 cursor-pointer">
        <div className="relative group">
         <button onClick
         ={() => setItemOpen(prev => !prev)}
       aria-haspopup="menu"
       aria-expanded={itemOpen}
    className="flex">
          <p className=" tracking-tighter text-sm font-light">Services</p>  
          <span className="mt-1">
            {itemOpen ? (<ChevronUp size={15}/>):(<ChevronDown size={15}/>)}
          </span>
         </button>
       <AnimatePresence initial={true}>
         {itemOpen && (
            <motion.div 
           initial={{opacity:0 , y:-10 , scale:0.98}}
           animate={{opacity:1, y:0 , scale:1}}
           exit={{opacity:0, y:-10 , scale:0.98}}
           transition={{duration:0.25 , type:"tween"}}
         className={`columns-2
          whitespace-nowrap 
          absolute  transform
          tracking-tighter 
          -translate-x-20
          text-sm
          bg-primary-ivory
          w-fit
          p-8
          rounded-sm
          font-light
          shadow-md
          `}>
          <div className="">
           {DropItems.map((item) => (
            <DropDown
           
            key={item.title}
            href={item.link}
            
            > 
              {item.title}
            </DropDown>
           ))}
          </div>
         </motion.div>
         )}
       </AnimatePresence>
        </div>
        <div>
           <ul className="font-light text-sm">
            <Link href="/docs">About</Link>
           </ul>
           </div>
      <div>
        <ul className="font-light text-sm">
          <Link href="/docs">FAQ</Link>
        </ul>
      </div>
        <div>
           <ul className="font-light text-sm">
            <Link href="/docs">Contact Us</Link>
            </ul>
        </div>
       
      </nav>
     </div>
     <div  className="flex justify-end items-center gap-2">   
      
        <Image src={logo} alt="Placeholder for profile image from database" width={15} height={15}/>
           <span
           onClick={() => router.replace("/docs")}
           className=" bg-brand-apricot text-xs py-1 px-2 rounded-sm  cursor-pointer tracking-tighter " title="View the docs">Docs</span>
     </div>
    </div>
    </>
  )
}
export default RootHeader