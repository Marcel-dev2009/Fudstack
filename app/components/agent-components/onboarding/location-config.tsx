/* eslint-disable @next/next/no-img-element */
"use client";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { ChangeEvent, SetStateAction, useState } from "react";
import {motion} from "framer-motion";
import { HiOutlineClock, HiOutlineMap, HiOutlineOfficeBuilding } from "react-icons/hi";
import { locationData } from "@/types";
import { sendVerificationEmail } from "@/lib/actions/sendVerficationEmail";
import { auth } from "@/lib/auth";
import { toast } from 'sonner';
interface Props {
 setStep:React.Dispatch<SetStateAction<number>>         
 setLocationData:React.Dispatch<SetStateAction<locationData>>
 
 
 setHasSentVerification:React.Dispatch<SetStateAction<boolean>>
 city:string;
 state:string;
 businessHours:string;
 address:string;
}
type Session = Awaited<ReturnType<typeof auth.api.getSession>> | null
interface Props {
 session :Session 
}
function LoacationConfig({setStep , setLocationData , session , city , state , address , businessHours ,setHasSentVerification}:Props) {
  if(!session) {
   return; 
  }
  const handleLocationChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const {name , value} = e.target
    setLocationData((prev) => ({
     ...prev,
     [name] : value
    }))
   }
  
  return (
    <motion.section
      initial={{opacity:0  , height:120 , filter:"blur(4px)"}}
     animate={{opacity:1 , height:"auto" ,filter:"blur(0px)"}}
     transition={{duration:.45 , ease:"easeInOut"}}
     exit={{opacity:0  , height:120 , filter:"blur(4px)"}}
     >
     <div className="grid grid-cols-1 lg:grid-cols-12 max-w-4xl w-full bg-white rounded-2xl shadow-md border border-neutral-100 overflow-hidden min-h-135">
        
        {/* Left Form Column (Takes 7 cols of 12 for spacious fields) */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 md:p-8">
          <div>
            {/* Header */}
            <div className="space-y-1.5 mb-6">
              <h1 className="text-xl font-bold tracking-tight text-neutral-900">
                Setup Your Loction
              </h1>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-md">
                setting up your location enables us to connect customers to you better 
              </p>
            </div>
         
            {/* Form Fields */}
             <form className="space-y-4">
              
              {/* Country & State Grid */}
              <div className="">
               

                <div className="space-y-1">
                  <label htmlFor="state" className="block text-xs font-medium text-neutral-700">
                    State / Region
                  </label>
                  <div className="flex px-3 py-2 items-center border rounded-lg border-neutral-200 bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all duration-150">
                    <HiOutlineMap className="w-4 h-4 text-neutral-400 shrink-0" />
                    <input
                      type="text"
                      value={state}
                      name="state"
                      onChange={handleLocationChange}
                      autoComplete="state"
                      id="state"
                      placeholder="e.g. Enugu , Lagos"
                      className="flex-1 ml-2.5 outline-none bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* City & Address Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 space-y-1">
                  <label htmlFor="city" className="block text-xs font-medium text-neutral-700">
                    City
                  </label>
                  <div className="flex px-3 py-2 items-center border rounded-lg border-neutral-200 bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all duration-150">
                    <HiOutlineOfficeBuilding className="w-4 h-4 text-neutral-400 shrink-0" />
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={city}
                      onChange={handleLocationChange}
                      placeholder="New Haven"
                      autoComplete="city"
                      className="flex-1 ml-2.5 outline-none bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label htmlFor="address" className="block text-xs font-medium text-neutral-700">
                    Street Address
                  </label>
                  <div className="flex px-3 py-2 items-center border rounded-lg border-neutral-200 bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all duration-150">
                    <input
                      type="text"
                      id="address"
                      value={address}
                      name="address"
                      onChange={handleLocationChange}
                      autoComplete="address"
                      placeholder="e.g. 123 Market St, Suite 400"
                      className="flex-1 outline-none bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Business Hours Text Area */}
              <div className="space-y-1">
                <label htmlFor="businessHours" className="block text-xs font-medium text-neutral-700">
                  Business Hours
                </label>
                <div className="flex px-3 py-2 items-start border rounded-lg border-neutral-200 bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all duration-150">
                  <HiOutlineClock className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <textarea
                    id="businessHours"
                    name="businessHours"
                    value={businessHours}
                    onChange={handleLocationChange}
                    autoComplete="businessHours"
                    placeholder="e.g. Mon - Fri: 9:00 AM - 6:00 PM&#10;Sat: 10:00 AM - 4:00 PM"
                    rows={3}
                    className="flex-1 ml-2.5 outline-none bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 resize-none min-h-17.5"
                    required
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Stepper Footer Action */}
          <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-row items-center justify-between gap-4">
            
            <button
            type="submit"
             onClick={() => {
               if(state === ""){
                toast.error("Fill out the required fields");
              } else if (address === ""){
                toast.error("Fill out the required fields");
              } else if(city === ""){
                toast.error("Fill out the required fields");
              } else if(businessHours === ""){
                toast.error("Fill out the required fields")
              } else {
              sendVerificationEmail(session.user.email);
              setHasSentVerification(true)
              }
              
             }}
           
              className="px-5 py-2 font-medium text-xs bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm hover:shadow active:scale-[0.98] transition-all duration-150"
            >
              Continue
            </button>
            <button
            onClick={() => setStep((prev) => prev - 1  )}
             className="px-5 py-2 font-medium text-xs bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm hover:shadow active:scale-[0.98] transition-all duration-150"
            >
            Back 
            </button>
          </div>
        </div>

        {/* Right Illustration Column (Takes 5 cols of 12) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-between bg-orange-500 p-8 relative overflow-hidden text-white">
          {/* Backdrop decorations */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_70%)]" />
          
          {/* Top dynamic info section */}
          <div className="relative w-full z-10 space-y-1 text-center mt-2">
            <span className="text-[10px] tracking-wider uppercase font-bold text-orange-100 bg-white/10 px-2 py-0.5 rounded-full">
              Step 3 of 4
            </span>
            <h3 className="text-base font-bold pt-1">Setup Your Workspace</h3>
            <p className="text-xs text-orange-100/80 max-w-50 mx-auto leading-normal">
             Configuring your location helps us connect you to customers better and enhances for seamless operations
            </p>
          </div>

          {/* Centered Graphic Asset */}

          {/* Bottom feature trust badge */}
          <div className="relative w-full z-10 text-center border-t border-white/10 pt-3">
            <p className="text-[11px] font-medium text-orange-50/90">
             Reliable • Fast • Confidential • Secure 
            </p>
          </div>
        </div>

      </div> {/* container */}
    </motion.section>
  )
}
export default LoacationConfig