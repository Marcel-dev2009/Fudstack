"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Building2, ChevronRight, Plus } from "lucide-react";
import { AnimatePresence } from "framer-motion";
// Dynamic imports for optimized bundle splitting
const CreateRestaurantModal = dynamic(() => import("./restaurant-dialogue"), { ssr: false });
const RefreshButton = dynamic(() => import("../../../../../ui/refresh-button"), { ssr: false });

function RestaurantManager({serverSlot}:{serverSlot:React.ReactNode}) {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <main className="w-full bg-white text-slate-900">
      {/* Page header */}
      <section className="border-b border-black/5">
        <div className="w-full px-5 py-6 sm:px-7 lg:px-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {/* Breadcrumb Navigation */}
              <div className="mb-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                <Building2 size={13} />
                <span>Organization</span>
                <ChevronRight size={11} />
                <span>Restaurants</span>
              </div>

              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Restaurants
              </h1>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Manage the restaurants created under your organization.
              </p>
            </div>

            {/* Action Buttons Column */}
            <div className="flex flex-col gap-2 sm:items-end">
              <button
                onClick={() => setShowModal(true)}
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-xl bg-brand-burn px-4 py-2.5
                  text-xs font-semibold text-white
                  shadow-sm transition-all duration-200
                  hover:-translate-y-0.5 hover:shadow-md
                  active:translate-y-0 w-full sm:w-auto
                "
              >
                <Plus size={16} />
                New restaurant
              </button>
              <RefreshButton />
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Stats Components */}
      {serverSlot} 

      {/* Framer Motion Presence Wrapper for dynamic modal animations */}
      <AnimatePresence mode="wait">
        {showModal && (
          <CreateRestaurantModal onClose={() => setShowModal(false)} /> 
        )}
      </AnimatePresence>
    </main>
  );
}

export default RestaurantManager;
