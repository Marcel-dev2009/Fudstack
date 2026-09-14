"use client";

import { motion } from "framer-motion";
import PriceGrid from "../../../../ui/pricing-grid";

export default function Pricing() {
  return (
    <section className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl bg-primary-blaster/50 border border-primary-blaster/40 p-6 sm:p-10 lg:p-14 shadow-sm backdrop-blur-sm">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Tagline / Eyebrow */}
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-burn bg-brand-burn/10 px-3 py-1 rounded-full mb-3">
            Pricing
          </span>

          {/* Main Headings */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
            Find Your Perfect Plan.
            <span className="block font-medium text-gray-600 text-xl sm:text-2xl md:text-3xl mt-1">
              Every Team Deserves Better Tools
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-xs sm:text-sm text-gray-500 font-normal tracking-tight max-w-md mx-auto">
            Choose a plan that suits your needs—from agile startups to full enterprises.
          </p>
        </motion.div>

        {/* Pricing Cards Grid Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-14 w-full"
        >
          <PriceGrid />
        </motion.div>

      </div>
    </section>
  );
}