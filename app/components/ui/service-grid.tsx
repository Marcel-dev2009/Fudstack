"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";
import { serviceGrid } from "@/app/data/data";

export default function ServiceGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeService = serviceGrid.find((s) => s.id === activeId);

  return (
    <section className="relative w-full mt-8 sm:mt-12">
      {/* SaaS Bento-Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {serviceGrid.map((service) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={service.id}
              layoutId={`card-container-${service.id}`}
              onClick={() => setActiveId(service.id)}
              className={`
                group relative flex flex-col justify-between cursor-pointer rounded-2xl p-6 sm:p-7
                bg-secondary-onyx/40 backdrop-blur-md border border-white/10
                transition-all duration-300 hover:border-brand-burn/40 hover:bg-secondary-onyx/70 hover:shadow-lg hover:shadow-brand-burn/5
                ${service.featured ? "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-secondary-onyx/60 to-brand-burn/5" : ""}
              `}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    layoutId={`icon-box-${service.id}`}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-burn/10 text-brand-burn ring-1 ring-brand-burn/20 transition-all group-hover:bg-brand-burn group-hover:text-white"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>

                  <span className="text-[11px] font-semibold tracking-tight text-white/40 group-hover:text-brand-burn transition-colors flex items-center gap-1">
                    Click for details <ArrowRight className="h-3 w-3" />
                  </span>
                </div>

                <motion.h3
                  layoutId={`title-${service.id}`}
                  className="text-base sm:text-lg font-bold tracking-tight text-white mb-2 text-left group-hover:text-brand-burn transition-colors"
                >
                  {service.title}
                </motion.h3>

                <p className="text-xs sm:text-sm text-gray-400 font-normal leading-relaxed text-left line-clamp-2">
                  {service.description}
                </p>
              </div>

              {/* Minimal Hint Footer */}
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                <span>Expandable module</span>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-burn/60 group-hover:animate-ping" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Modal Layer using Framer Motion AnimatePresence */}
      <AnimatePresence>
        {activeId && activeService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveId(null)}
              className="absolute inset-0 backdrop-blur-md"
            />

            {/* Active Expanded Card */}
            <motion.div
              layoutId={`card-container-${activeService.id}`}
              className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-secondary-onyx border border-brand-burn/40 p-6 sm:p-8 text-left shadow-2xl z-10"
            >
              {/* Close Button */}
              <div className="hidden md:block">
                <button
                type="button"
                onClick={() => setActiveId(null)}
                className="absolute flex top-5 right-5 h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all"
              >
                <X className="h-5 w-5 " />
              </button>
              </div>

              {/* Expanded Card Header */}
              <div className="flex items-center gap-4 mb-5">
                <motion.div
                  layoutId={`icon-box-${activeService.id}`}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-burn text-white shadow-lg shadow-brand-burn/20"
                >
                  <activeService.icon className="h-7 w-7" />
                </motion.div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-apricot">
                    Service Overview
                  </span>
                  <motion.h3
                    layoutId={`title-${activeService.id}`}
                    className="text-xl sm:text-2xl font-bold tracking-tight text-white"
                  >
                    {activeService.title}
                  </motion.h3>
                </div>
              </div>

              {/* Extended Content Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25, delay: 0.1 }}
                className="space-y-6"
              >
                <p className="text-sm font-normal leading-relaxed text-gray-300">
                  {activeService.description}
                </p>

                <div className="h-px w-full bg-white/10" />

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Key Module Capabilities
                  </h4>
                  <ul className="space-y-2.5">
                    {activeService.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-xs sm:text-sm text-gray-200"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-burn mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveId(null)}
                    className="w-full h-11 rounded-xl bg-brand-burn text-white text-xs sm:text-sm font-semibold tracking-tight hover:bg-brand-burn/90 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Close Details</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}