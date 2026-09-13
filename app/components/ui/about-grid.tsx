"use client"

import {GridItem, gridItemsData } from "@/app/data/data"
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import React from "react";
import { useState } from "react";

function AboutGrid() {
  const [selectedItem, setSelectedItem] = useState<GridItem | null>(null);
return(
   <>
     <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              {gridItemsData.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    layoutId={`card-${item.id}`}
                    onClick={() => setSelectedItem(item)}
                    className="group relative rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-amber-500/40 p-5 cursor-pointer overflow-hidden backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Ambient Hover Gradient Accent */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                    />

                    {/* Card Top: Icon & Badge */}
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <motion.div
                        layoutId={`icon-${item.id}`}
                        className="p-2.5 rounded-xl bg-zinc-800/90 border border-zinc-700/60 text-amber-400 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors duration-300 shadow-md"
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>

                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>

                    {/* Card Middle: Title & Brief Description */}
                    <div className="relative z-10 mb-4">
                      <motion.h3
                        layoutId={`title-${item.id}`}
                        className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-amber-200 transition-colors"
                      >
                        {item.title}
                      </motion.h3>
                      <p className="mt-1 text-xs text-zinc-400 leading-normal font-normal line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Card Bottom: Metric & Arrow */}
                    <div className="relative z-10 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-zinc-300">
                        {item.metrics.value}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
   </>
)
}
export default AboutGrid

