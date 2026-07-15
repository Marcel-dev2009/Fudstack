"use client"
import { Button } from "@/components/ui/button"
import aboutPhoto from "../../../public/about.png"
import Image from "next/image"
import {MoveRight} from "lucide-react"
import AboutGrid from "../ui/about-grid"
function About() {
  return (
    <>
    <section className="bg-black text-white min-h-screen h-auto">
       <h2 className="p-4 text-xl font-bold  tracking-tighter">About Us</h2>
      <div className="flex flex-col lg:flex-row  justify-evenly ">
           <div className="bg-secondary-onyx/20 backdrop-blur-sm rounded-2xl w-auto max-w-75 mx-auto md:mx-0">
          <Image src={aboutPhoto} alt="Fudstack - About Photo" aria-label="about Photo" className="h-auto max-h-[65dvh] w-fit max-w-175 rounded-2xl object-contain mx-auto p-2"/>
       </div>
       <div>
          <h2 className="w-auto max-w-md font-semibold text-md text-center md:text-2xl align-baseline tracking-tighter">We automate your tasks without the friction of complexity.</h2>

          <div className="mt-2 p-4  gap-8">
             <p className=" w-auto max-w-98 text-center font-light text-sm tracking-tighter">
               Your all in one solution for management of day to day tasks in your workplace 
               such as Inventory management,  client interaction, deliveries and scheduling    
             </p>
             <div className="w-full flex justify-center">
              <Button className="m-2 w-1/3 "><span className="tracking-tight text-sm">Read More</span> <MoveRight data-icon="inline-end" size={10}/> </Button>      
              </div> 
          </div>
          <div
          className="grid p-4"
          >
            <AboutGrid/>
          </div>
       </div>
        
      </div>
    </section>
    </>
  )
}
export default About