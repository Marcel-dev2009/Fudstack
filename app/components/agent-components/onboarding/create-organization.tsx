/* eslint-disable @next/next/no-img-element */
"use client";

import React, { ChangeEvent, SetStateAction, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaFileAlt } from "react-icons/fa";
import { Trash, UploadCloud, Store, Loader2, ArrowRight } from "lucide-react";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { toast } from "sonner";

import { brand } from "@/brand";
import type { organizationData } from "@/types";
import { CloudinaryClientResponse } from "@/cloudinary";

interface Props {
  setStep: React.Dispatch<SetStateAction<number>>;
  setOrganizationData: React.Dispatch<SetStateAction<organizationData>>;
  organizationName:string;
  organizationDescription: string;
  restaurantCount:number;
}

export default function CreateOrganization({
  setStep,
  setOrganizationData,
  organizationName,
  organizationDescription,
  restaurantCount,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  // const [restaurantCount, setRestaurantCount] = useState<number>(1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const image =
    "https://res.cloudinary.com/dfsrso3jk/image/upload/v1785098926/asset1_v6wump.png";

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
        toast.error("Error uploading organization photo");
      } else {
        setOrganizationData((prev) => ({
          ...prev,
          logoUrl: data.secure_url,
        }));
        setPhotoPreview(data.secure_url);
        toast.success("Logo uploaded");
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

  const handleOrganizationChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOrganizationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value , 10);
    setOrganizationData((prev) => ({
      ...prev,
      resNos: val,
    }));
  };

  const handleContinue = () => {
    if (!organizationName.trim()) {
      toast.error("Fill out the required fields");
      return;
    }
    if (!organizationDescription.trim()) {
      toast.error("Fill out the required fields");
      return;
    }
    if(!restaurantCount){
      toast.error("Fill out the required field");
      return;
    }
    setStep((prev) => prev + 1);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 15, filter: "blur(4px)" }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="min-h-screen w-full flex items-center justify-center bg-neutral-50/80 p-3 sm:p-4 md:p-6"
    >
      {/* Compact width container matching original layout proportions */}
      <div className="grid grid-cols-1 md:grid-cols-12 max-w-2xl w-full bg-white rounded-2xl shadow-lg border border-neutral-200/80 overflow-hidden">
        
        {/* LEFT COLUMN: FORM */}
        <div className="md:col-span-7 flex flex-col justify-between p-5 sm:p-6">
          <div>
            {/* Header */}
            <div className="space-y-1 mb-4">
              <h1 className="text-lg font-bold tracking-tight text-neutral-900">
                Create an Organization
              </h1>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                {brand.name} enables you to create an organization and manage multiple restaurants within it with flexibility.
              </p>
            </div>

            {/* Logo Upload Section */}
            <div className="mb-4">
              <label className="text-[10px] font-bold text-neutral-800 tracking-wider uppercase mb-1.5 block">
                Organization Profile Image
              </label>

              {photoPreview ? (
                <div className="flex items-center gap-3 p-1.5 bg-neutral-50 rounded-xl border border-neutral-200/80 w-fit">
                  <div className="relative w-12 h-12 rounded-lg border border-neutral-200 overflow-hidden bg-white shrink-0 flex items-center justify-center">
                    {loading ? (
                      <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
                    ) : (
                      <img
                        src={photoPreview}
                        alt="Organization logo preview"
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
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
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

            {/* Input Form Fields */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              {/* Name Field */}
              <div className="space-y-1">
                <label
                  htmlFor="organizationName"
                  className="block text-xs font-medium text-neutral-700"
                >
                  Organization Name
                </label>
                <div className="flex items-center px-3 py-2 rounded-lg border border-neutral-200 bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all duration-150">
                  <HiOutlineOfficeBuilding className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input
                    type="text"
                    id="organizationName"
                    name="name"
                    placeholder="e.g. Gourmet Group"
                    value={organizationName}
                    onChange={handleOrganizationChange}
                    required
                    className="w-full ml-2 bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 outline-none"
                  />
                </div>
              </div>

              {/* Custom Range Slider Field */}
              <div className="space-y-1.5 pt-0.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="restaurantCount"
                    className="text-xs font-medium text-neutral-700 flex items-center gap-1"
                  >
                    <Store className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Number of Restaurants</span>
                  </label>
                  <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200/60">
                    {restaurantCount} {restaurantCount === 1 ? "Location" : "Locations"}
                  </span>
                </div>

                <div className="space-y-1 bg-neutral-50/80 border border-neutral-200/80 px-2.5 py-2 rounded-lg">
                  <input
                    type="range"
                    id="restaurantCount"
                    min="1"
                    max="20"
                    step="1"
                    value={restaurantCount}
                    onChange={handleRangeChange}
                    className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-orange-500 focus:outline-none"
                  />
                  <div className="flex justify-between text-[9px] font-medium text-neutral-400">
                    <span>1</span>
                    <span>5</span>
                    <span>10</span>
                    <span>15</span>
                    <span>20+</span>
                  </div>
                </div>
              </div>

              {/* Description Field */}
              <div className="space-y-1">
                <label
                  htmlFor="organizationDescription"
                  className="block text-xs font-medium text-neutral-700"
                >
                  Description
                </label>
                <div className="flex items-start px-3 py-2 rounded-lg border border-neutral-200 bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all duration-150">
                  <FaFileAlt className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                  <textarea
                    id="organizationDescription"
                    name="description"
                    placeholder="Briefly describe your organization or restaurant chain..."
                    value={organizationDescription}
                    onChange={handleOrganizationChange}
                    rows={2}
                    maxLength={150}
                    required
                    className="w-full ml-2 bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 outline-none resize-none min-h-[48px]"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Stepper Footer Action */}
          <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-end">
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

        {/* RIGHT COLUMN: DISPLAY PANEL */}
        <div className="hidden md:flex md:col-span-5 flex-col justify-between bg-orange-500 p-6 relative overflow-hidden text-white">
          {/* Backdrop Radial Circle */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]" />

          {/* Header Info */}
          <div className="relative z-10 space-y-1 text-center mt-1">
            <span className="inline-block text-[10px] tracking-wider uppercase font-bold text-orange-100 bg-white/10 px-2.5 py-0.5 rounded-full">
              Step 1 of 3
            </span>
            <h3 className="text-sm font-bold pt-1">Setup Your Workspace</h3>
            <p className="text-[11px] text-orange-100/80 leading-normal max-w-[180px] mx-auto">
              Get access to live metrics, branch revenue tracking, and customer logs instantly.
            </p>
          </div>

          {/* Centered Graphic Image */}
          <div className="relative z-10 my-auto py-4 flex justify-center">
            <div className="w-full max-w-[150px] transition-transform duration-300 hover:scale-105">
              <img
                src={image}
                alt="Dashboard overview analytics illustration"
                className="w-full h-auto drop-shadow-md object-contain rounded"
              />
            </div>
          </div>

          {/* Footer Trust Badge */}
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