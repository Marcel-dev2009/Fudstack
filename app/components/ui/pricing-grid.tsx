"use client";

import { priceData } from "@/app/data/data";
import { Button } from "@/components/ui/button";
import { Check, MoveRight, Sparkles } from "lucide-react";
import { TbCurrencyNaira } from "react-icons/tb";

export default function PriceGrid() {
  const data = priceData;

  return (
    <div className="w-full mt-8 sm:mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch justify-center max-w-6xl mx-auto">
        {data.map((plan) => {
          const isPopular = plan.trend?.toLowerCase().includes("popular") || plan.trend?.toLowerCase().includes("featured") || plan.trend?.toLowerCase().includes("best");

          return (
            <div
              key={plan.title}
              className={`
                relative flex flex-col justify-between
                rounded-2xl p-6 sm:p-8 transition-all duration-300
                backdrop-blur-md bg-white/80 dark:bg-black/40
                ${
                  isPopular
                    ? "border-2 border-brand-burn shadow-xl shadow-brand-burn/10 ring-1 ring-brand-burn/20 -translate-y-1 lg:-translate-y-2"
                    : "border border-gray-200/80 dark:border-white/10 shadow-sm hover:shadow-md hover:-translate-y-1"
                }
              `}
            >
              {/* Card Top: Header & Badge */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <h4 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    {plan.title}
                  </h4>

                  {plan.trend && (
                    <span
                      className={`
                        inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-tight
                        ${
                          isPopular
                            ? "bg-brand-burn text-white shadow-sm"
                            : "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300"
                        }
                      `}
                    >
                      {isPopular && <Sparkles className="h-3 w-3" />}
                      {plan.trend}
                    </span>
                  )}
                </div>

                {/* Pricing Section */}
                <div className="flex items-baseline gap-1 my-4">
                  <div className="flex items-center text-gray-900 dark:text-white font-extrabold text-3xl sm:text-4xl tracking-tight">
                    <TbCurrencyNaira className="h-8 w-8 shrink-0 text-brand-burn" />
                    <span>{plan.price}</span>
                  </div>
                  {plan.duration && (
                    <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      /{plan.duration}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-normal leading-relaxed mb-6">
                  {plan.description}
                </p>

                <div className="h-px w-full bg-gray-100 dark:bg-white/10 mb-6" />

                {/* Feature List */}
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                    Core Features
                  </h5>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium tracking-tight"
                      >
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-burn/10 text-brand-burn mt-0.5">
                          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action CTA Button */}
              <div className="mt-8 pt-4">
                <Button
                  className={`
                    group w-full h-11 rounded-xl text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 active:scale-95
                    ${
                      isPopular
                        ? "bg-brand-burn text-white hover:bg-brand-burn/90 shadow-lg shadow-brand-burn/25"
                        : "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                    }
                  `}
                >
                  <span className="flex items-center justify-center gap-2 hover:text-primary-blaster">
                    <span>Get Started</span>
                    <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
                  </span>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}