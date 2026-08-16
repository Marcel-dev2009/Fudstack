"use client";
import {motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
export default function SummaryCard({
  title,
  value,
  icon: Icon,
  change,
  highlighted = false,
  hidden,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  change: string;
  highlighted?: boolean;
  hidden?: boolean;
}) {
  const displayValue = hidden ? "****" : value;

  return (
    <div
      className={`
        rounded-xl border bg-white p-4 shadow-sm
        transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-md
        ${highlighted ? "border-brand-burn/40" : "border-black/5"}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
            <Icon size={15} />
          </div>

          <div>
            <p className="text-[11px] text-slate-500">
              {title}
            </p>

            <motion.p
              key={displayValue}
              initial={{
                opacity: 0,
                filter: "blur(4px)",
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              className="mt-1 text-lg font-semibold tracking-tight"
            >
              {displayValue}
            </motion.p>
          </div>
        </div>

        <button className="flex h-8 w-8 items-center justify-center rounded-md border border-black/5 text-slate-400 transition hover:bg-slate-50">
          <ChevronRight size={15} />
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between text-[10px]">
        <div>
          <p className="text-slate-400">Var to previous period</p>
          <p className="mt-1 font-medium text-emerald-500">
            {hidden ? "****" : change}
          </p>
        </div>

        <div>
          <p className="text-slate-400">Percentage of sales</p>
          <p className="mt-1 font-medium text-emerald-500">
            {hidden ? "****" : "↑ 2.15%"}
          </p>
        </div>
      </div>
    </div>
  );
}