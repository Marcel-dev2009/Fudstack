/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/icon.png";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AutoLocationData } from "@/lib/cache/getRestaurant";
import {
  Search,
  MapPin,
  Bell,
  Settings,
  BookOpen,
  X,
  Star,
  Clock,
  ExternalLink,
  SlidersHorizontal,
  ChevronRight,
} from "lucide-react";
export type Status = "ACTIVE" | "INACTIVE"
interface RestaurantProps {
  id:string        
  name:string,
  logoUrl:string | null,
  phone:string,
  email:string,
  staffNos:number,
  status:Status,
  location:AutoLocationData
}
interface RestaurantListProps {
 restaurantList:RestaurantProps[]         
}
export default function ClientDashboard({restaurantList}:RestaurantListProps) {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantProps | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");

  const locations = ["All", "Abuja", "Enugu", "Rivers(PH)", "Lagos"];

  const filteredRestaurants = restaurantList.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      selectedLocation === "All" || r.location?.state === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-12">
      {/* TOP HEADER / NAVBAR */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-neutral-200 px-4 sm:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo */}
           <div className="flex items-center gap-3">
                  <Link
                    href="/"
                    className="flex items-center gap-2.5 transition-opacity hover:opacity-85 focus:outline-none"
                  >
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-burn/10 p-1.5 ring-1 ring-brand-burn/20">
                      <Image
                        src={logo}
                        alt="FudStack Logo"
                        width={28}
                        height={28}
                        className="object-contain"
                        priority
                      />
                    </div>
                    <span className="text-base font-bold tracking-tight text-gray-900">
                      Fud<span className="text-brand-burn">Stack</span>
                    </span>
                  </Link>
                </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-2 sm:mx-4">
            <div className="relative flex items-center w-full">
              <Search className="absolute left-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search restaurants, cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-neutral-100/80 border border-neutral-200/80 rounded-xl text-xs sm:text-sm outline-none focus:bg-white focus:border-brand-burn focus:ring-2 focus:ring-brand-burn/10 transition-all placeholder:text-neutral-400"
              />
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Documentation Icon */}
            <button
              type="button"
              className="p-2 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
              title="Documentation"
              aria-label="Documentation"
            >
              <BookOpen className="w-5 h-5" />
            </button>

            {/* Notifications with Alert Badge */}
            <button
              type="button"
              className="relative p-2 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {/* Red Alert Dot */}
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
              </span>
            </button>

            {/* Settings Icon */}
            <button
              type="button"
              className="p-2 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
              title="Settings"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>

            <div className="w-px h-6 bg-neutral-200 mx-1 hidden sm:block" />

            {/* Profile Photo */}
            <button
              type="button"
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-neutral-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-brand-burn/20 relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  alt="User Profile"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        {/* Banner Section */}
        <section className="rounded-2xl bg-linear-to-r from-brand-burn to-orange-500 text-white p-6 sm:p-8 shadow-xl shadow-brand-burn/10 relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/20 text-white backdrop-blur-md uppercase tracking-wider">
              Discover & Reserve
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Find the best dining experiences around you.
            </h1>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Explore curated menus, check table availability, and place instant orders directly from your dashboard.
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        </section>

        {/* Filters bar */}
        <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            <span className="text-xs font-semibold text-neutral-500 flex items-center gap-1 shrink-0 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter by:
            </span>
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all shrink-0 ${
                  selectedLocation === loc
                    ? "bg-brand-burn text-white shadow-md shadow-brand-burn/20"
                    : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          <p className="text-xs text-neutral-500 shrink-0">
            Showing <span className="font-bold text-neutral-900">{filteredRestaurants.length}</span> spots
          </p>
        </section>

        {/* Restaurant Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <motion.div
              key={restaurant.id}
              layoutId={`card-container-${restaurant.id}`}
              onClick={() => setSelectedRestaurant(restaurant)}
              className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-burn/30 transition-all duration-300 cursor-pointer group flex flex-col"
            >
              {/* Image Container */}
              <motion.div
                layoutId={`card-image-${restaurant.id}`}
                className="relative h-44 w-full overflow-hidden bg-neutral-100"
              >
                {restaurant.logoUrl && (
                 <img
                  src={restaurant.logoUrl}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />   
                )}
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md shadow-sm ${
                      restaurant.status === "ACTIVE"
                        ? "bg-emerald-500/90 text-white"
                        : "bg-neutral-900/80 text-white"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        restaurant.status === "ACTIVE" ? "bg-white animate-pulse" : "bg-neutral-400"
                      }`}
                    />
                    {restaurant.status === "ACTIVE" ? "Open Now" : "Closed"}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-neutral-800 flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  5.0 {/* Generic type ship */}
                </div>
              </motion.div>

              {/* Card Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <motion.h3
                    layoutId={`card-title-${restaurant.id}`}
                    className="font-bold text-base text-neutral-900 group-hover:text-brand-burn transition-colors line-clamp-1"
                  >
                    {restaurant.name}
                  </motion.h3>
                  
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-burn shrink-0" />
                    <span className="truncate max-w-30">{restaurant.location?.state}</span>
                  </div>
                  <span className="text-brand-burn font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    Details <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </section>
      </main>

      {/* FRAMER MOTION EXPANDABLE CARD MODAL */}
      <AnimatePresence>
        {selectedRestaurant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRestaurant(null)}
              className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />

            {/* Expanded Pop Card */}
            <motion.div
              layoutId={`card-container-${selectedRestaurant.id}`}
              className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
            >
              {/* Image & Header Actions */}
              <motion.div
                layoutId={`card-image-${selectedRestaurant.id}`}
                className="relative h-64 sm:h-72 w-full bg-neutral-100 shrink-0"
              >
               {selectedRestaurant.logoUrl && (
                   <img
                  src={selectedRestaurant.logoUrl}
                  alt={selectedRestaurant.name}
                  className="w-full h-full object-cover"
                />  
               )}
                <button
                  onClick={() => setSelectedRestaurant(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900/50 text-white hover:bg-neutral-900/80 transition-colors backdrop-blur-md"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-md ${
                      selectedRestaurant.status === "ACTIVE"
                        ? "bg-emerald-500 text-white"
                        : "bg-neutral-900/90 text-white"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                       selectedRestaurant.status === "ACTIVE"? "bg-white animate-pulse" : "bg-neutral-400"
                      }`}
                    />
                    {selectedRestaurant.status === "ACTIVE" ? "Open Now" : "Currently Closed"}
                  </span>
                </div>
              </motion.div>

              {/* Modal Body Content */}
              <div className="p-6 overflow-y-auto space-y-6">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <motion.h2
                        layoutId={`card-title-${selectedRestaurant.id}`}
                        className="text-2xl font-bold text-neutral-900"
                      >
                        {selectedRestaurant.name}
                      </motion.h2>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 text-amber-700 px-3 py-1.5 rounded-xl text-sm font-bold shrink-0">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      5.0 {/* Generic type shii */}
                    </div>
                  </div>
                </div>

                {/* Restaurant Details Info */}
                <div className="space-y-3 bg-neutral-50 rounded-2xl p-4 border border-neutral-100 text-xs sm:text-sm">
                  <div className="flex items-start gap-3 text-neutral-600">
                    <MapPin className="w-4 h-4 text-brand-burn shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-neutral-800">Address & Location</p>
                      <p>{selectedRestaurant.location?.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-neutral-600">
                    <Clock className="w-4 h-4 text-brand-burn shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-neutral-800">Operating Hours</p>
                      {/* <p>{selectedRestaurant.openingHours}</p> */} 8:00AM - 11:00PM
                    </div>
                  </div>
                </div>

                {/* View Menu CTA Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    className="w-full py-3.5 px-6 rounded-2xl bg-brand-burn text-white font-semibold text-sm hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-brand-burn/25 flex items-center justify-center gap-2"
                  >
                    <span>View Menu</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}