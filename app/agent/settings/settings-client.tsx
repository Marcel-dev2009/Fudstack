"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCw, User, Store, Palette, ShieldCheck, CreditCard } from "lucide-react";

import RestaurantSection from "./restaurant-settings-section";
import ThemeSection from "./theme-section";
import SecuritySection from "./security-section";
import ProfileHandler from "./profile-handler";
import {Organization} from "@/lib/generated/prisma";
import { AutoLocationData } from "@/lib/cache/getRestaurant";
type TabType = "profile" | "restaurant" | "theme" | "security" | "billing";
 interface RestaurantProps{
   name: string;
    id: string;
    logoUrl: string | null;
    phone: string;
    email: string;
    staffNos: number;
    location:AutoLocationData; 
    status: string;
    organizationId: string; 
 }
interface Props {
 organization:Organization,
 organizationId:string,
 restaurant:RestaurantProps[] 
}
const TABS: { id: TabType; label: string; icon:React.ElementType }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "restaurant", label: "Restaurant", icon: Store },
  { id: "theme", label: "Theme", icon: Palette },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export default function SettingsClient({organization, organizationId, restaurant}:Props) {
  const [activeTab, setActiveTab] = useState<TabType>("restaurant");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Add your data refresh logic here
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 text-neutral-900 p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Organization Settings</h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Manage your restaurants, preferences, security, and organization details.
          </p>
        </div>

        {/* REFRESH ACTION BUTTON */}
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          aria-label="Refresh Settings"
          className="self-start sm:self-auto p-2 rounded-xl bg-white border border-neutral-200 shadow-sm hover:bg-neutral-50 text-neutral-600 transition-all active:scale-95 disabled:opacity-50"
        >
          <RotateCw size={16} className={isRefreshing ? "animate-spin text-orange-500" : ""} />
        </button>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-4 scrollbar-none border-b border-neutral-200/60">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 ${
                isActive
                  ? "text-orange-600 font-semibold"
                  : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/60"
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT PANELS */}
      <div className="py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "profile" && <ProfileHandler organization={organization} organizationId={organizationId} restaurant={restaurant}/>}

            {activeTab === "restaurant" && <RestaurantSection restaurants={restaurant}/>}

            {activeTab === "theme" && <ThemeSection />}

            {activeTab === "security" && <SecuritySection />}

            {activeTab === "billing" && (
              <div className="p-8 bg-white border border-neutral-200 rounded-2xl text-center text-sm text-neutral-400">
                Billing Section (Empty for now)
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}