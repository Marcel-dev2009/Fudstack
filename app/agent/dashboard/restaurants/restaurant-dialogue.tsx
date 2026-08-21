/* eslint-disable @next/next/no-img-element */
"use client";

import { CloudinaryClientResponse } from "@/cloudinary";
import { createRestaurant } from "@/lib/backendOperation";
import { motion } from "framer-motion";
import { Trash, UploadCloud } from "lucide-react";
import {ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";

type CreateRestaurantModalProps = {
  onClose: () => void;
};

export default function CreateRestaurantModal({
  onClose,
}: CreateRestaurantModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [staffNos, setStaffNos] = useState(0);
  const [resNos, setResNos] = useState(0)
  const [logoUrl, setLogoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phone, setPhone] = useState("");
  const[loading ,setLoading] = useState(false);
   const inputRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
       await createRestaurant(name,logoUrl, phone, email, staffNos , resNos);
       toast.success("New Restaurant added succesfully");
       onClose();
    } catch(error) {
      toast.error(`Failed to create restaurant:${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;

    setName("");
    setEmail("");
    setStaffNos(0);
    setResNos(0);
    setLogoUrl("");
    setPhone("");

    onClose();
  };
 
  const handlePhoto = async (event:ChangeEvent<HTMLInputElement>) => {
    const file =  event.target.files?.[0];
    if(!file) return;
    const formData = new FormData();
    formData.append("file" , file);
    formData.append("upload_preset", "agent_media");
    try{
      setLoading(true)
         const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, 
      {
        method:"POST",
        body:formData
      }
    );
    const data = (await response.json()) as CloudinaryClientResponse
    if("error" in data){
      toast.error("error uploading organization photo");
    }else{
      setLogoUrl(data.secure_url);
    }
    }catch(error){
         toast.error(`Failed to create restaurant:${error instanceof Error ? error.message : "Unknown error"}`);
    }finally{
      setLoading(false);
    }
  }
  return (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-restaurant-title"
            className="max-h-[90vh] w-full max-w-xl scrollbar-thin overflow-y-auto rounded-sm bg-white shadow-2xl"
            initial={{
              opacity: 0,
              y: 24,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 16,
              scale: 0.97,
            }}
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-5 pt-5 sm:px-7 sm:pt-7">
              <div>
                <h2
                  id="create-restaurant-title"
                  className="text-xl font-semibold tracking-tight text-black sm:text-2xl"
                >
                  Create restaurant
                </h2>

                <p className="mt-1 text-sm text-black/50">
                  Add a new restaurant to your organization.
                </p>

                <div className="mt-3 h-1 w-8 rounded-full bg-brand-burn" />
              </div>

              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                aria-label="Close modal"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xl leading-none text-black/40 transition hover:bg-black/5 hover:text-black disabled:pointer-events-none disabled:opacity-40"
              >
                &times;
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 px-5 pb-5 pt-6 sm:px-7 sm:pb-7"
            >
              {/* Profile picture */}
              <div>
                <label
                  htmlFor="restaurant-logo"
                  className="mb-2 block text-sm font-medium text-black"
                >
                  Profile picture
                </label>

            
                {logoUrl ? (
                  <div className="flex items-center gap-4 animate-in fade-in duration-200">
                    <div className="relative w-16 h-16 rounded-full border-2 border-orange-500 p-0.5 shadow-sm">
                      {loading ? (
                        "Loading...."
                      ) : (
                        <img
                        src={logoUrl}
                        alt="organization logo"
                        className="w-full h-full object-cover rounded-full"
                      /> 
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setLogoUrl("")}
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
                     ref={inputRef}
                      id="restaurant-logo"
                      name="logo"
                      type="file"
                      accept="image/**"
                      onChange={handlePhoto}
                      className="w-full cursor-pointer text-sm text-black/50 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-brand-burn file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-white file:transition hover:file:opacity-90 hidden"
                    />
                  </div>
                                    )}
                   {/*  */}
                  
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="restaurant-name"
                  className="mb-2 block text-sm font-medium text-black"
                >
                  Restaurant name
                </label>

                <input
                  id="restaurant-name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Enter restaurant name"
                  autoComplete="organization"
                  required
                  className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-black outline-none transition placeholder:text-black/30 focus:border-brand-burn focus:ring-4 focus:ring-brand-burn/10"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="restaurant-email"
                  className="mb-2 block text-sm font-medium text-black"
                >
                  Email address
                </label>

                <input
                  id="restaurant-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="restaurant@example.com"
                  autoComplete="email"
                  required
                  className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-black outline-none transition placeholder:text-black/30 focus:border-brand-burn focus:ring-4 focus:ring-brand-burn/10"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="restaurant-phone"
                  className="mb-2 block text-sm font-medium text-black"
                >
                  Phone number
                </label>

                <input
                  id="restaurant-phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
                  placeholder="+234...."
                  autoComplete="tel"
                  required
                  pattern="+234" //checkout
                  className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-black outline-none transition placeholder:text-black/30 focus:border-brand-burn focus:ring-4 focus:ring-brand-burn/10"
                />
              </div>

              {/* Selects */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Staff */}
                <div>
                  <label
                    htmlFor="staff-number"
                    className="mb-2 block text-sm font-medium text-black"
                  >
                    Number of staff
                  </label>

                 <div className="flex items-center gap-4 w-full">
  <input
    id="staff-number"
    name="staffNos"
    type="range"
    min="1" // Add your desired minimum
    max="100" // Add your desired maximum
    value={staffNos}
    onChange={(event) => setStaffNos(Number(event.target.value))}
    required
    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 outline-none transition
               [&::-webkit-slider-thumb]:appearance-none 
               [&::-webkit-slider-thumb]:h-5 
               [&::-webkit-slider-thumb]:w-5 
               [&::-webkit-slider-thumb]:rounded-full 
               [&::-webkit-slider-thumb]:bg-orange-500 
               [&::-webkit-slider-thumb]:border-2 
               [&::-webkit-slider-thumb]:border-white
               [&::-webkit-slider-thumb]:shadow-md
               [&::-webkit-slider-thumb]:transition-all
               [&::-webkit-slider-thumb]:hover:scale-110
               [&::-webkit-slider-thumb]:active:bg-orange-600
               /* Firefox Thumb styling */
               [&::-moz-range-thumb]:h-5 
               [&::-moz-range-thumb]:w-5 
               [&::-moz-range-thumb]:rounded-full 
               [&::-moz-range-thumb]:bg-orange-500 
               [&::-moz-range-thumb]:border-2 
               [&::-moz-range-thumb]:border-white
               [&::-moz-range-thumb]:shadow-md
               [&::-moz-range-thumb]:transition-all
               [&::-moz-range-thumb]:hover:scale-110
               [&::-moz-range-thumb]:active:bg-orange-600"
  />
  
  {/* Live Numeric Value Indicator */}
  <span className="flex h-9 min-w-12 items-center justify-center rounded-lg bg-orange-500 px-2 text-sm font-semibold text-white shadow-sm">
    {staffNos}
  </span>
</div>

                </div>

                {/* Restaurants */}
                <div>
                  <label
                    htmlFor="restaurant-number"
                    className="mb-2 block text-sm font-medium text-black"
                  >
                    Restaurants
                  </label>

                <div className="flex items-center gap-4 w-full">
  <input
    id="restaurant-number"
    name="resNos"
    type="range"
    min="1" // Add your desired minimum
    max="100" // Add your desired maximum
    value={resNos}
    onChange={(event) => setResNos(Number(event.target.value))}
    required
    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 outline-none transition
               [&::-webkit-slider-thumb]:appearance-none 
               [&::-webkit-slider-thumb]:h-5 
               [&::-webkit-slider-thumb]:w-5 
               [&::-webkit-slider-thumb]:rounded-full 
               [&::-webkit-slider-thumb]:bg-orange-500 
               [&::-webkit-slider-thumb]:border-2 
               [&::-webkit-slider-thumb]:border-white
               [&::-webkit-slider-thumb]:shadow-md
               [&::-webkit-slider-thumb]:transition-all
               [&::-webkit-slider-thumb]:hover:scale-110
               [&::-webkit-slider-thumb]:active:bg-orange-600
               /* Firefox Thumb styling */
               [&::-moz-range-thumb]:h-5 
               [&::-moz-range-thumb]:w-5 
               [&::-moz-range-thumb]:rounded-full 
               [&::-moz-range-thumb]:bg-orange-500 
               [&::-moz-range-thumb]:border-2 
               [&::-moz-range-thumb]:border-white
               [&::-moz-range-thumb]:shadow-md
               [&::-moz-range-thumb]:transition-all
               [&::-moz-range-thumb]:hover:scale-110
               [&::-moz-range-thumb]:active:bg-orange-600"
  />
  
  {/* Live Numeric Value Indicator */}
  <span className="flex h-9 min-w-12 items-center justify-center rounded-lg bg-orange-500 px-2 text-sm font-semibold text-white shadow-sm">
    {resNos}
  </span>
</div>

                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="h-11 rounded-xl border border-black/10 px-5 text-sm font-medium text-black transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-11 items-center justify-center rounded-xl bg-brand-burn px-6 text-sm font-medium text-white transition hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Creating...
                    </span>
                  ) : (
                    "Create restaurant"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
  );
}