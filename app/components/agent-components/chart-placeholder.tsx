"use client";

import { BarChart3, List } from "lucide-react";

export default function ChartPlaceholder({
  title,
  icon: Icon,
  className = "",
}: {
  title: string;
  icon: React.ElementType;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-black/5 bg-white p-5 shadow-sm ${className}`}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-burn/10 text-brand-burn">
            <Icon size={16} />
          </div>

          <h3 className="text-sm font-semibold text-slate-800">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-black/5 text-slate-500 transition hover:bg-slate-50">
            <BarChart3 size={15} />
          </button>

          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-black/5 text-slate-500 transition hover:bg-slate-50">
            <List size={15} />
          </button>
        </div>
      </div>

      <div className="relative h-55 overflow-hidden">
        <div className="absolute inset-x-0 top-5 border-t border-slate-100" />
        <div className="absolute inset-x-0 top-1/2 border-t border-slate-100" />
        <div className="absolute inset-x-0 bottom-8 border-t border-slate-100" />

        <div className="absolute inset-y-0 left-1/5 border-l border-slate-100" />
        <div className="absolute inset-y-0 left-2/5 border-l border-slate-100" />
        <div className="absolute inset-y-0 left-3/5 border-l border-slate-100" />
        <div className="absolute inset-y-0 left-4/5 border-l border-slate-100" />

        <svg
          viewBox="0 0 700 220"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d="
              M 0 90
              C 50 30, 80 180, 135 130
              S 210 65, 260 105
              S 330 155, 375 115
              S 445 65, 495 105
              S 565 180, 610 130
              S 670 90, 700 110
            "
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-brand-burn/60"
          />

          {[0, 135, 260, 375, 495, 610, 700].map((x, index) => {
            const ys = [90, 130, 105, 115, 105, 130, 110];

            return (
              <circle
                key={index}
                cx={x}
                cy={ys[index]}
                r="4"
                className="fill-brand-burn"
              />
            );
          })}
        </svg>

        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-slate-400">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  );
}
