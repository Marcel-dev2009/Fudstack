/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { ChangeEvent, SetStateAction, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Trash, UploadCloud, ArrowRight, ArrowLeft } from "lucide-react";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { toast } from "sonner";
import dynamic from "next/dynamic";

import { brand } from "@/brand";
import type { restaurantData } from "@/types";
import { CloudinaryClientResponse } from "@/cloudinary";

interface Props {
  setStep: React.Dispatch<SetStateAction<number>>;
  setRestaurantData: React.Dispatch<SetStateAction<restaurantData>>;
  restaurantName: string;
  restaurantPhone: string;
  restaurantEmail: string;
}

const Loading = dynamic(() => import("@/app/components/ui/loading"));

export default function CreateRestaurant({
  setStep,
  setRestaurantData,
  restaurantName,
  restaurantPhone,
  restaurantEmail,
}: Props) {
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const image =
    "https://res.cloudinary.com/dfsrso3jk/image/upload/v1785098928/asset2_lgxknd.png";

  const handlePhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "agent_media");

    try {
      setLoading(true);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = (await response.json()) as CloudinaryClientResponse;

      if ("error" in data) {
        toast.error("Error uploading restaurant photo");
      } else {
        setPhotoPreview(data.secure_url);
        setRestaurantData((prev) => ({
          ...prev,
          logoUrl: data.secure_url,
        }));
        toast.success("Logo uploaded successfully");
      }
    } catch (err) {
      toast.error(
        `Upload error: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRestaurantChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRestaurantData((prev) => ({
      ...prev,
      [name as keyof restaurantData]: value,
    }));
  };

  const handleContinue = () => {
    if (!restaurantName.trim()) {
      toast.error("Please enter a restaurant name");
      return;
    }
    if (!restaurantPhone.trim()) {
      toast.error("Please enter a phone number");
      return;
    }
    // Business email is optional; if present, standard check passes
    setStep((prev) => prev + 1);
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="min-h-screen w-full flex items-center justify-center bg-neutral-50/80 p-3 sm:p-4 md:p-6"
    >
      {/* Compact container maintaining small footprint */}
      <div className="grid grid-cols-1 md:grid-cols-12 max-w-2xl w-full bg-white rounded-2xl shadow-lg border border-neutral-200/80 overflow-hidden">
        
        {/* LEFT FORM COLUMN */}
        <div className="md:col-span-7 flex flex-col justify-between p-5 sm:p-6">
          <div>
            {/* Header */}
            <div className="space-y-1 mb-4">
              <h1 className="text-lg font-bold tracking-tight text-neutral-900">
                Create a Restaurant
              </h1>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                {brand.name} enables you to manage multiple restaurant locations within one organization seamlessly.
              </p>
            </div>

            {/* Profile Upload */}
            <div className="mb-4">
              <label className="text-[10px] font-bold text-neutral-800 tracking-wider uppercase mb-1.5 block">
                Restaurant Profile Image
              </label>

              {photoPreview ? (
                <div className="flex items-center gap-3 p-1.5 bg-neutral-50 rounded-xl border border-neutral-200/80 w-fit">
                  <div className="relative w-12 h-12 rounded-lg border border-neutral-200 overflow-hidden bg-white shrink-0 flex items-center justify-center">
                    {loading ? (
                      <Loading />
                    ) : (
                      <img
                        src={photoPreview}
                        alt="Restaurant logo"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setPhotoPreview("")}
                    className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors mr-1"
                  >
                    <Trash size={12} />
                    <span>Remove</span>
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => inputRef.current?.click()}
                  className="group flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-neutral-200 hover:border-orange-500 rounded-xl bg-neutral-50/50 hover:bg-orange-50/10 cursor-pointer transition-all duration-150 p-2 text-center"
                >
                  {loading ? (
                    <div className="flex items-center gap-1.5 text-xs text-orange-600 font-medium">
                      <Loading />
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    <>
                      <UploadCloud size={18} className="text-neutral-400 group-hover:text-orange-500 transition-colors mb-0.5" />
                      <p className="text-xs font-medium text-neutral-700">
                        Click to upload logo
                      </p>
                      <p className="text-[10px] text-neutral-400">
                        SVG, PNG, or JPG up to 2MB
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handlePhoto}
                    ref={inputRef}
                    disabled={loading}
                  />
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              {/* Restaurant Name */}
              <div className="space-y-1">
                <label
                  htmlFor="restaurantName"
                  className="block text-xs font-medium text-neutral-700"
                >
                  Restaurant Name
                </label>
                <div className="flex items-center px-3 py-2 rounded-lg border border-neutral-200 bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all duration-150">
                  <HiOutlineOfficeBuilding className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input
                    type="text"
                    id="restaurantName"
                    name="name"
                    value={restaurantName}
                    placeholder="e.g. Toast Hall Restaurant"
                    onChange={handleRestaurantChange}
                    autoComplete="off"
                    required
                    className="w-full ml-2 bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 outline-none"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <label
                  htmlFor="restaurantPhone"
                  className="block text-xs font-medium text-neutral-700"
                >
                  Phone Number
                </label>
                <div className="flex items-center px-3 py-2 rounded-lg border border-neutral-200 bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all duration-150">
                  <FaPhoneAlt className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <input
                    type="tel"
                    id="restaurantPhone"
                    name="phone"
                    value={restaurantPhone}
                    placeholder="e.g. +234 800 000 0000"
                    onChange={handleRestaurantChange}
                    autoComplete="tel"
                    required
                    className="w-full ml-2 bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 outline-none"
                  />
                </div>
              </div>

              {/* Business Email */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="restaurantEmail"
                    className="block text-xs font-medium text-neutral-700"
                  >
                    Business Email
                  </label>
                  <span className="text-[9px] text-neutral-400 font-normal">
                    Optional (defaults to owner email)
                  </span>
                </div>
                <div className="flex items-center px-3 py-2 rounded-lg border border-neutral-200 bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all duration-150">
                  <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input
                    type="email"
                    id="restaurantEmail"
                    name="email"
                    value={restaurantEmail}
                    placeholder="e.g. toasthalls@gmail.com"
                    onChange={handleRestaurantChange}
                    autoComplete="email"
                    className="w-full ml-2 bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 outline-none"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Navigation Action Buttons */}
          <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              className="px-4 py-2 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-all duration-150 flex items-center gap-1.5"
            >
              <ArrowLeft size={13} />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleContinue}
              className="px-5 py-2 text-xs font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-sm hover:shadow active:scale-[0.98] transition-all duration-150 flex items-center gap-1.5"
            >
              <span>Continue</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* RIGHT ILLUSTRATION COLUMN */}
        <div className="hidden md:flex md:col-span-5 flex-col justify-between bg-orange-500 p-6 relative overflow-hidden text-white">
          {/* Subtle Radial Backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]" />

          {/* Header Info */}
          <div className="relative z-10 space-y-1 text-center mt-1">
            <span className="inline-block text-[10px] tracking-wider uppercase font-bold text-orange-100 bg-white/10 px-2.5 py-0.5 rounded-full">
              Step 2 of 4
            </span>
            <h3 className="text-sm font-bold pt-1">Create Your First Restaurant</h3>
            <p className="text-[11px] text-orange-100/80 leading-normal max-w-[180px] mx-auto">
              Get access to live metrics, inventory management, and customer logs instantly.
            </p>
          </div>

          {/* Centered Image Graphic */}
          <div className="relative z-10 my-auto py-4 flex justify-center">
            <div className="w-full max-w-[150px] transition-transform duration-300 hover:scale-105">
              <img
                src={image}
                alt="Restaurant setup preview"
                className="w-full h-auto drop-shadow-md object-contain rounded"
              />
            </div>
          </div>

          {/* Trust Badge Footer */}
          <div className="relative z-10 text-center border-t border-white/10 pt-2.5">
            <p className="text-[10px] font-medium text-orange-50/90 tracking-wide">
              Reliable • Fast • Confidential • Secure
            </p>
          </div>
        </div>

      </div>
    </motion.section>
  );
}