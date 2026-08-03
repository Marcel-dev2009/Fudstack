/* eslint-disable @next/next/no-img-element */
"use client";
import {motion} from "framer-motion";
import { ChangeEvent, SetStateAction, useRef, useState } from "react";
import { brand } from "@/brand";
import {
  
  Mail,
Trash,
UploadCloud
} from "lucide-react"
import {FaPhoneAlt } from "react-icons/fa";
import { HiOutlineOfficeBuilding} from "react-icons/hi";
import type { restaurantData} from "@/types";
import { toast } from "sonner";
import { CloudinaryClientResponse } from "@/cloudinary";
import dynamic from "next/dynamic";
interface Props {
 setStep:React.Dispatch<SetStateAction<number>>         
 setRestaurantData:React.Dispatch<SetStateAction<restaurantData>>
}
const Loading = dynamic(() => import("../../ui/loading"))
function CreateRestaurant({setStep , setRestaurantData}:Props) {
  const restaurantData:restaurantData = {
name:"",
logoUrl:"",
email:"",
phone:""
}
  const [photoPreview , setPhotoPreview] = useState<string>("");
 const inputRef = useRef<HTMLInputElement | null>(null) 
 const [loading , setLoading] = useState(false);
 const handlePhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData() //a constructor that creates a new javascript object and accepts input data prt multimedia as key-value pairs in the object 
    formData.append("file" , file);
    formData.append(
      "upload_presents",
      "Fudstack_media"
    );
    try{
    setLoading(true)
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, 
      {
        method:"POST",
        body:formData
      }
    );
    const data = (await response.json()) as CloudinaryClientResponse;
    if("error" in data){
      toast.error("error uploading organization photo");
    }else{
       setPhotoPreview(data.secure_url);
       setRestaurantData((prev) => ({
        ...prev,
        logoUrl:data.secure_url
       }))
    }
   
    }catch(err){
      toast.error(`
        Upload error: ${
          err instanceof Error ? err.message : "Unkown error"
        }
        `)
    }finally{
      setLoading(false);
    }
  };
 const handleRestaurantDataDynamicChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.preventDefault();
  const {name , value} = e.target
  setRestaurantData((prev) => ({
   ...prev,
   [name as keyof restaurantData] : value
  }))
 }
  const image = "https://res.cloudinary.com/dfsrso3jk/image/upload/v1785098928/asset2_lgxknd.png";
  return (
        <motion.section
        initial={{opacity:0 , x:50 ,  filter:"blur(4px)"}}
        animate={{opacity:1 , x:0 , filter:"blur(0px)"}}
        transition={{duration:.45 , ease:"easeInOut"}}
        exit={{opacity:0 , x:50 , filter:"blur(4px)"}}
        >
       <div className="grid grid-cols-1 lg:grid-cols-12 max-w-4xl w-full bg-white rounded-2xl shadow-md border border-neutral-100 overflow-hidden min-h-135">
              
              {/* Left Form Column (Takes 7 cols of 12 for spacious fields) */}
              <div className="lg:col-span-7 flex flex-col justify-between p-6 md:p-8">
                <div>
                  {/* Header */}
                  <div className="space-y-1.5 mb-6">
                    <h1 className="text-xl font-bold tracking-tight text-neutral-900">
                      Create a Restaurant
                    </h1>
                    <p className="text-xs text-neutral-500 leading-relaxed max-w-md">
                      {brand.name} enables you to create manage multiple restaurants within one organization with flexibility.
                    </p>
                  </div>
      
                  {/* Avatar Upload */}
                  <div className="mb-6">
                    <h2 className="text-[11px] font-semibold text-neutral-900 tracking-wide uppercase mb-2">
                      Restaurant Profile Image
                    </h2>
                    
                    {photoPreview ? (
                      <div className="flex items-center gap-4 animate-in fade-in duration-200">
                        <div className="relative w-16 h-16 rounded-full border-2 border-orange-500 p-0.5 shadow-sm">
                          {loading ? (
                            <Loading/>
                          ) : (
                           <img
                            src={photoPreview}
                            alt="organization logo"
                            className="w-full h-full object-cover rounded-full"
                          /> 
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => setPhotoPreview("")}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                        >
                          <Trash size={13} />
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => inputRef.current?.click()}
                        className="group flex flex-col items-center justify-center w-full max-w-xs h-24 border-2 border-dashed border-neutral-200 hover:border-orange-500 rounded-xl bg-neutral-50/50 hover:bg-orange-50/10 cursor-pointer transition-all duration-200 p-3 text-center"
                      >
                        <UploadCloud size={20} className="text-neutral-400 group-hover:text-orange-500 transition-colors mb-1" />
                        <p className="text-xs font-medium text-neutral-700">
                          Click to upload logo
                        </p>
                        <p className="text-[10px] text-neutral-400 mt-0.5">
                          SVG, PNG, or JPG up to 2MB
                        </p>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handlePhoto}
                          ref={inputRef}
                        />
                      </div>
                    )}
                  </div>
      
                  {/* Form Fields */}
                  <form className="space-y-4">
                    <div className="space-y-1">
                      <label htmlFor="organizationName" className="block text-xs font-medium text-neutral-700">
                        Restaurant Name
                      </label>
                      <div className="flex px-3 py-2 items-center border rounded-lg border-neutral-200 bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all duration-150">
                        <HiOutlineOfficeBuilding className="w-4 h-4 text-neutral-400 shrink-0" />
                        <input
                          type="text"
                          value={restaurantData.name}
                          placeholder="e.g. Toast hall restaurant"
                          id="organizationName"
                          onChange={handleRestaurantDataDynamicChange}
                          autoComplete="name"
                          className="flex-1 ml-2.5 outline-none bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400"
                        />
                      </div>
                    </div>
      
                    <div className="space-y-1">
                      <label htmlFor="organizationDescription" className="block text-xs font-medium text-neutral-700">
                      Phone Number
                      </label>
                      <div className="flex px-3 py-2 items-start border rounded-lg border-neutral-200 bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all duration-150">
                        <FaPhoneAlt className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                         <input
                         value={restaurantData.phone}
                         onChange={handleRestaurantDataDynamicChange}
                          type="text"
                          placeholder="e.g. +234......."
                          id="organizationName"
                          autoComplete="name"
                          className="flex-1 ml-2.5 outline-none bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="organizationDescription" className="block text-xs font-medium text-neutral-700">
                          Business Email
                        <p className=" text-gray-500 text-[10px] tracking-tighter">optional - owners can directly use their email</p>
                      </label>
                      <div className="flex px-3 py-2 items-start border rounded-lg border-neutral-200 bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all duration-150">
                        <Mail className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                         <input
                          type="text"
                          value={restaurantData.email}
                          onChange={handleRestaurantDataDynamicChange}
                          placeholder="e.g. toasthalls@gmail.com"
                          id="restaurant email"
                          autoComplete="email"
                          className="flex-1 ml-2.5 outline-none bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400"
                        />
                      </div>
                    </div>
                  </form>
                </div>
      
                {/* Stepper Footer Action */}
                <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-row items-center justify-between gap-4">
                  
                  <button
                    onClick={() => setStep((prev) => prev + 1)}
                    className="px-5 py-2 font-medium text-xs bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm hover:shadow active:scale-[0.98] transition-all duration-150"
                  >
                    Continue
                  </button>

                  <button
            onClick={() => setStep((prev) => prev - 1 )}
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
                    Step 2 of 4
                  </span>
                  <h3 className="text-base font-bold pt-1">Create Your First Restaurant</h3>
                  <p className="text-xs text-orange-100/80 max-w-50 mx-auto leading-normal">
                    Get access to live metrics, inventory management, and customer logs instantly.
                  </p>
                </div>
      
                {/* Centered Graphic Asset */}
                <div className="relative w-full max-w-55 my-auto z-10 transition-transform duration-500 hover:scale-105">
                  <img
                    src={image}
                    alt="Dashboard overview analytics illustration"
                    className="w-full h-auto drop-shadow-xl object-contain rounded-sm"
                  />
                </div>
      
                {/* Bottom feature trust badge */}
                <div className="relative w-full z-10 text-center border-t border-white/10 pt-3">
                  <p className="text-[11px] font-medium text-orange-50/90">
                  Reliable • Fast • Confidential • Secure
                  </p>
                </div>
              </div>
      
            </div>
       </motion.section>
  )
}
export default CreateRestaurant
