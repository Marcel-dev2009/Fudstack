/* eslint-disable @next/next/no-img-element */
"use client";

import React, { ChangeEvent, SetStateAction } from "react";
import { motion } from "framer-motion";
import { HiOutlineMap, HiOutlineOfficeBuilding } from "react-icons/hi";
import { MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import type { locationData } from "@/types";
import { sendVerificationEmail } from "@/lib/actions/sendVerficationEmail";
import { auth } from "@/lib/auth";

type Session = Awaited<ReturnType<typeof auth.api.getSession>> | null;

interface Props {
  setStep: React.Dispatch<SetStateAction<number>>;
  setLocationData: React.Dispatch<SetStateAction<locationData>>;
  setHasSentVerification: React.Dispatch<SetStateAction<boolean>>;
  city: string;
  state: string;
  address: string;
  session: Session;
}

const NIGERIAN_STATES = [
  "Abuja (FCT)",
  "Anambra",
  "Enugu",
  "Imo",
  "Lagos",
  "Rivers (Port Harcourt)",
];

export default function LocationConfig({
  setStep,
  setLocationData,
  session,
  city,
  state,
  address,
  setHasSentVerification,
}: Props) {
  if (!session) return null;

  const handleLocationChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContinue = () => {
    if (!state.trim()) {
      toast.error("Please select a state / region");
      return;
    }
    if (!city.trim()) {
      toast.error("Please enter a city");
      return;
    }
    if (!address.trim()) {
      toast.error("Please enter a street address");
      return;
    }

    if (session.user?.email) {
      sendVerificationEmail(session.user.email);
      setHasSentVerification(true);
    }
  };

  const image =
    "https://res.cloudinary.com/dfsrso3jk/image/upload/v1785098926/asset1_v6wump.png";

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
                Setup Your Location
              </h1>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Setting up your location enables us to connect nearby customers to your business smoothly.
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              
              {/* State / Region Dropdown */}
              <div className="space-y-1">
                <label
                  htmlFor="state"
                  className="block text-xs font-medium text-neutral-700"
                >
                  State / Region
                </label>
                <div className="flex items-center px-3 py-2 rounded-lg border border-neutral-200 bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all duration-150">
                  <HiOutlineMap className="w-4 h-4 text-neutral-400 shrink-0" />
                  <select
                    id="state"
                    name="state"
                    value={state}
                    onChange={handleLocationChange}
                    required
                    className="w-full ml-2 bg-transparent text-xs text-neutral-900 outline-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Select state / region
                    </option>
                    {NIGERIAN_STATES.map((item) => (
                      <option key={item} value={item} className="text-neutral-900">
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* City & Address Section */}
              <div>
                {/* City Field */}
                <div className="sm:col-span-1 space-y-1">
                  <label
                    htmlFor="city"
                    className="block text-xs font-medium text-neutral-700"
                  >
                    City
                  </label>
                  <div className="flex items-center px-3 py-2 mb-2 rounded-lg border border-neutral-200 bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all duration-150">
                    <HiOutlineOfficeBuilding className="w-4 h-4 text-neutral-400 shrink-0" />
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={city}
                      onChange={handleLocationChange}
                      placeholder="e.g. Independence Layout"
                      autoComplete="address-level2"
                      required
                      className="w-full ml-2 bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 outline-none"
                    />
                  </div>
                </div>

                {/* Street Address Field */}
                <div className="sm:col-span-2 space-y-1">
                  <label
                    htmlFor="address"
                    className="block text-xs font-medium text-neutral-700"
                  >
                    Street Address
                  </label>
                  <div className="flex items-center px-3 py-2 rounded-lg border border-neutral-200 bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all duration-150">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={address}
                      onChange={handleLocationChange}
                      placeholder="e.g. 123 Ogui Road, Suite 4"
                      autoComplete="street-address"
                      required
                      className="w-full ml-2 bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 outline-none"
                    />
                  </div>
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
              Step 3 of 4
            </span>
            <h3 className="text-sm font-bold pt-1">Setup Your Workspace</h3>
            <p className="text-[11px] text-orange-100/80 leading-normal max-w-[180px] mx-auto">
              Configuring your location helps connect you to local customers for seamless deliveries and orders.
            </p>
          </div>

          {/* Centered Image Graphic */}
          <div className="relative z-10 my-auto py-4 flex justify-center">
            <div className="w-full max-w-[150px] transition-transform duration-300 hover:scale-105">
              <img
                src={image}
                alt="Location configuration overview"
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