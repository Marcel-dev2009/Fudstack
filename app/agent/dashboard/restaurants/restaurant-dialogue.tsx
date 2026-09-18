/* eslint-disable @next/next/no-img-element */
"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Trash,
  UploadCloud,
  X,
  Building2,
  Mail,
  Phone,
  Users,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { CloudinaryClientResponse } from "@/cloudinary";
import { createRestaurant } from "@/lib/server-operation";

interface Props {
  onClose: () => void;
}

export default function CreateRestaurantModal({ onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [staffNos, setStaffNos] = useState<number>(5);
  const [logoUrl, setLogoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a restaurant name");
      return;
    }

    setIsSubmitting(true);
    try {
      await createRestaurant(name, logoUrl, phone, email, staffNos);
      toast.success("New restaurant created successfully");
      onClose();
    } catch (error) {
      toast.error(
        `Failed to create restaurant: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;

    setName("");
    setEmail("");
    setPhone("");
    setStaffNos(5);
    setLogoUrl("");
    onClose();
  };

  const handlePhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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
        toast.error("Error uploading image");
      } else {
        setLogoUrl(data.secure_url);
        toast.success("Logo uploaded successfully");
      }
    } catch (error) {
      toast.error(
        `Upload failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-restaurant-title"
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden flex flex-col max-h-[90vh]"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div>
            <h2
              id="create-restaurant-title"
              className="text-base font-bold text-neutral-900 tracking-tight"
            >
              Create New Restaurant
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Set up a new location for your business.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors disabled:opacity-40"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4">
          
          {/* Logo Upload Section */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-neutral-700">
              Restaurant Logo
            </label>

            {logoUrl ? (
              <div className="flex items-center gap-3 p-2 bg-neutral-50 border border-neutral-200/80 rounded-xl w-fit">
                <div className="relative w-12 h-12 rounded-lg border border-neutral-200 overflow-hidden bg-white shrink-0 flex items-center justify-center">
                  {loading ? (
                    <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
                  ) : (
                    <img
                      src={logoUrl}
                      alt="Restaurant Logo"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setLogoUrl("")}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash size={12} />
                  <span>Remove</span>
                </button>
              </div>
            ) : (
              <div
                onClick={() => inputRef.current?.click()}
                className="group flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-neutral-200 hover:border-orange-500 rounded-xl bg-neutral-50/50 hover:bg-orange-50/10 cursor-pointer transition-all duration-150 p-3 text-center"
              >
                {loading ? (
                  <div className="flex items-center gap-2 text-xs text-orange-600 font-medium">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <>
                    <UploadCloud
                      size={20}
                      className="text-neutral-400 group-hover:text-orange-500 transition-colors mb-1"
                    />
                    <p className="text-xs font-medium text-neutral-700">
                      Click to upload image
                    </p>
                    <p className="text-[10px] text-neutral-400">
                      PNG, JPG, or SVG up to 2MB
                    </p>
                  </>
                )}
                <input
                  ref={inputRef}
                  id="restaurant-logo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                  disabled={loading}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* Restaurant Name */}
          <div className="space-y-1">
            <label
              htmlFor="restaurant-name"
              className="block text-xs font-medium text-neutral-700"
            >
              Restaurant Name
            </label>
            <div className="flex items-center px-3 py-2 rounded-lg border border-neutral-200 bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all">
              <Building2 className="w-4 h-4 text-neutral-400 shrink-0" />
              <input
                id="restaurant-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Taste of Lagos"
                required
                className="w-full ml-2.5 bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label
              htmlFor="restaurant-email"
              className="block text-xs font-medium text-neutral-700"
            >
              Email Address
            </label>
            <div className="flex items-center px-3 py-2 rounded-lg border border-neutral-200 bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all">
              <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
              <input
                id="restaurant-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="restaurant@example.com"
                required
                className="w-full ml-2.5 bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label
              htmlFor="restaurant-phone"
              className="block text-xs font-medium text-neutral-700"
            >
              Phone Number
            </label>
            <div className="flex items-center px-3 py-2 rounded-lg border border-neutral-200 bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all">
              <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
              <input
                id="restaurant-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 800 000 0000"
                required
                className="w-full ml-2.5 bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 outline-none"
              />
            </div>
          </div>

          {/* Staff Capacity Range */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between items-center">
              <label
                htmlFor="staff-number"
                className="block text-xs font-medium text-neutral-700"
              >
                Estimated Staff Count
              </label>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200/50">
                <Users size={12} />
                {staffNos} members
              </span>
            </div>

            <input
              id="staff-number"
              type="range"
              min="1"
              max="100"
              value={staffNos}
              onChange={(e) => setStaffNos(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 mt-2 border-t border-neutral-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-sm hover:shadow transition-all duration-150 flex items-center gap-2 active:scale-[0.98] disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <span>Create Restaurant</span>
              )}
            </button>
          </div>

        </form>
      </motion.div>
    </motion.div>
  );
}