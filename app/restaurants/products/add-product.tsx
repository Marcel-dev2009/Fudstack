/* eslint-disable @next/next/no-img-element */
"use client";

import React, { ChangeEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  X,
  UploadCloud,
  Package,
  Layers,
  Image as ImageIcon,
  Loader2,
  Check,
} from "lucide-react";
import { TbCurrencyNaira } from "react-icons/tb";
import { CloudinaryClientResponse } from "@/cloudinary";
import { CreateProduct } from "@/lib/actions/createProduct";

// Matches Prisma Product model
export interface Product {
  id: string;
  name: string;
  logoUrl: string;
  price: number; // Stored as integer in cents ($12.50 = 1250)
  description: string;
  stockQuantity: number;
  inStock: boolean;
}

interface AddProductProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantId: string;
  onSuccess?: (newProduct: Partial<Product>) => void;
}

export default function AddProduct({
  isOpen,
  onClose,
  onSuccess,
  restaurantId,
}: AddProductProps) {
  // FORM STATES
  const [formData, setFormData] = useState<Product>({
   id: "",       
   name:"",
   price:0.01,
   description:"",
   inStock:true,
   logoUrl:"",
   stockQuantity:0,       
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inStock, setInStock] = useState(formData.inStock);
  // HANDLE LOCAL IMAGE FILE DRAG & DROP / SELECT
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be under 5MB");
        return;
      }
  const formData = new FormData
  formData.append("file", file);
  formData.append("upload_preset", "agent_media")
     try {
          // setLoading(true);
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
            setFormData((prev) => ({
            ...prev,
            logoUrl:data.secure_url        
            }))
            toast.success("Logo uploaded successfully");
            setImagePreview(data.secure_url);
          }
        } catch (error) {
          toast.error(
            `Upload failed: ${
              error instanceof Error ? error.message : "Unknown error"
            }`
          );
        } 
  };
  }
  // SUBMIT HANDLER
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.warning("Please enter a product name.");
      return;
    }

    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      toast.warning("Please enter a valid price.");
      return;
    }

    if (!formData.logoUrl && !imagePreview) {
      toast.warning("Please upload or provide an image URL for the product.");
      return;
    }
    try {
      setIsLoading(true);
      const priceInNaira = formData.price;
      const payload = {
        name: formData.name.trim(),
        logoUrl: formData.logoUrl.trim() || imagePreview || "",
        price: priceInNaira,
        description: formData.description.trim(),
        stockQuantity: Number(formData.stockQuantity),
        inStock:formData.inStock,
      };
      const response = await CreateProduct(restaurantId, payload);  
      if(!response.success){
       toast.error("Product creation failed");    
       return
      }
      toast.success("Product created successfully!");
      if (onSuccess) onSuccess(payload);
      // Reset Form State & Close
      resetForm();
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create product"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData((prev) => ({
    ...prev,
    name:"",
    price:0,
    description:"",
    stockQuantity:10,
    inStock:true,
    logoUrl:"",      
    }))
    setImagePreview(null);  
  };
  const handleChange = (field: keyof Product) => (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
     ...prev,
     [field]:value,     
    }))
   }
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* BACKDROP OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm"
          />

          {/* MODAL CARD CONTAINER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-neutral-200/80 z-10 overflow-hidden my-auto"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-brand-burn/10 text-brand-burn flex items-center justify-center border border-brand-burn/20">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-neutral-900">
                    Add New Product
                  </h2>
                  <p className="text-[11px] text-neutral-500">
                    Create a new menu item for your restaurant.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* FORM BODY */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* IMAGE UPLOADER CARD */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold tracking-wider text-neutral-700 uppercase flex items-center justify-between">
                  <span>Product Image</span>
                  <span className="text-neutral-400 font-normal lowercase">
                    (PNG, JPG, WEBP)
                  </span>
                </label>

                {imagePreview || formData.logoUrl ? (
                  <div className="relative h-36 w-full rounded-xl overflow-hidden border border-neutral-200 group bg-neutral-100">
                    <img
                      src={imagePreview || formData.logoUrl}
                      alt="Product Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData((prev) => ({...prev, logoUrl:""}))
                        }}
                        className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors shadow-md"
                      >
                        Remove Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-32 px-4 border-2 border-dashed border-neutral-200 hover:border-brand-burn rounded-xl bg-neutral-50/50 hover:bg-white cursor-pointer transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-brand-burn/10 text-brand-burn flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-neutral-700 group-hover:text-brand-burn transition-colors">
                      Upload Product Image
                    </span>
                    <span className="text-[10px] text-neutral-400 mt-0.5">
                      Click to select file or drag & drop
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}

                {/* IMAGE URL FALLBACK INPUT */}
                {!imagePreview && (
                  <div className="flex items-center px-3 py-2 bg-neutral-50/50 border border-neutral-200 rounded-xl focus-within:bg-white focus-within:border-brand-burn focus-within:ring-2 focus-within:ring-brand-burn/10 transition-all mt-2">
                    <ImageIcon className="w-4 h-4 text-neutral-400 shrink-0" />
                    <input
                      type="url"
                      value={formData.logoUrl}
                      onChange={handleChange("logoUrl")}
                      placeholder="Or paste image URL (https://...)"
                      className="w-full ml-2.5 outline-none bg-transparent text-xs text-neutral-800 placeholder:text-neutral-400"
                    />
                  </div>
                )}
              </div>

              {/* PRODUCT NAME & PRICE ROW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* NAME */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold tracking-wider text-neutral-700 uppercase">
                    Product Name *
                  </label>
                  <div className="flex items-center px-3 py-2 bg-neutral-50/50 border border-neutral-200 rounded-xl focus-within:bg-white focus-within:border-brand-burn focus-within:ring-2 focus-within:ring-brand-burn/10 transition-all">
                    <Package className="w-4 h-4 text-neutral-400 shrink-0" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange("name")}
                      placeholder="e.g. Bacon Cheeseburger"
                      className="w-full ml-2.5 outline-none bg-transparent text-xs font-medium text-neutral-800 placeholder:text-neutral-400"
                    />
                  </div>
                </div>

                {/* PRICE */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold tracking-wider text-neutral-700 uppercase">
                    Price (NGN) *
                  </label>
                  <div className="flex items-center px-3 py-2 bg-neutral-50/50 border border-neutral-200 rounded-xl focus-within:bg-white focus-within:border-brand-burn focus-within:ring-2 focus-within:ring-brand-burn/10 transition-all">
                    <TbCurrencyNaira className="w-4 h-4 text-neutral-400 shrink-0" />
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      value={formData.price}
                      onChange={handleChange("price")}
                      placeholder="12.99"
                      className="w-full ml-2 outline-none bg-transparent text-xs font-medium text-neutral-800 placeholder:text-neutral-400"
                    />
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold tracking-wider text-neutral-700 uppercase">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={handleChange("description")}
                  placeholder="Describe ingredients, taste profile, dietary info..."
                  className="w-full p-3 bg-neutral-50/50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-800 outline-none focus:bg-white focus:border-brand-burn focus:ring-2 focus:ring-brand-burn/10 transition-all placeholder:text-neutral-400 resize-none"
                />
              </div>

              {/* STOCK QUANTITY & INSTOCK STATUS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* STOCK QUANTITY */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold tracking-wider text-neutral-700 uppercase">
                    Stock Quantity
                  </label>
                  <div className="flex items-center px-3 py-2 bg-neutral-50/50 border border-neutral-200 rounded-xl focus-within:bg-white focus-within:border-brand-burn focus-within:ring-2 focus-within:ring-brand-burn/10 transition-all">
                    <Layers className="w-4 h-4 text-neutral-400 shrink-0" />
                    <input
                      type="number"
                      min="0"
                      value={formData.stockQuantity}
                      onChange={
                        handleChange("stockQuantity")
                      }
                      className="w-full ml-2.5 outline-none bg-transparent text-xs font-medium text-neutral-800"
                    />
                  </div>
                </div>

                {/* INSTOCK TOGGLE */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold tracking-wider text-neutral-700 uppercase">
                    Availability Status
                  </label>
                  <button
                    type="button"
                    onClick={() => setInStock(!inStock)}
                    className={`w-full py-2 px-3 rounded-xl border flex items-center justify-between text-xs font-semibold transition-all ${
                      inStock
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : "bg-neutral-100 border-neutral-200 text-neutral-600"
                    }`}
                  >
                    <span>{inStock ? "In Stock" : "Out of Stock"}</span>
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        inStock ? "bg-emerald-500 text-white" : "bg-neutral-300"
                      }`}
                    >
                      {inStock && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                </div>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100 mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-4 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 active:scale-[0.98] transition-all"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-5 py-2.5 rounded-xl bg-brand-burn text-white text-xs font-semibold shadow-md shadow-brand-burn/20 hover:brightness-110 active:scale-[0.98] disabled:opacity-60 transition-all flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Saving Product...</span>
                    </>
                  ) : (
                    <span>Create Product</span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}