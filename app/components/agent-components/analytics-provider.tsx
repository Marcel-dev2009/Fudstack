"use client"
import { AnimatePresence , motion } from "framer-motion";
import { weeklyData , days } from "@/app/data/data";
import { Check } from "lucide-react";
export default function AnalyticsPopover({
  selectedDay,
  setSelectedDay,
}: {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
}) {
  const data = weeklyData[selectedDay];

  const points = data
    .map((value, index) => {
      const x = index * 50;
      const y = 90 - value;
      return `${x},${y}`;
    })
    .join(" ");

  const selectedDayInfo = days.find(
    (day) => day.id === selectedDay
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
          y: -8,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: -8,
          scale: 0.97,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        className="
          absolute left-0 top-[calc(100%+10px)] z-50
          w-[min(680px,calc(100vw-32px))]
          overflow-hidden rounded-2xl
          border border-black/5
          bg-white
          shadow-[0_20px_60px_rgba(0,0,0,0.12)]
        "
      >
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr]">
          {/* Days */}
          <div className="border-b border-black/5 p-3 md:border-b-0 md:border-r">
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Select day
            </p>

            <div className="space-y-1">
              {days.map((day) => {
                const active = selectedDay === day.id;

                return (
                  <button
                    key={day.id}
                    onClick={() => setSelectedDay(day.id)}
                    className={`
                      flex w-full items-center justify-between
                      rounded-lg px-3 py-2.5
                      text-left text-xs
                      transition-all duration-200
                      ${
                        active
                          ? "bg-brand-burn text-white"
                          : "text-slate-600 hover:bg-slate-50"
                      }
                    `}
                  >
                    <span>{day.label}</span>

                    {active && <Check size={14} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chart */}
          <div className="p-5">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Daily analysis
                </p>

                <h3 className="mt-1 text-sm font-semibold text-slate-800">
                  {selectedDayInfo?.label}
                </h3>
              </div>

              <div className="rounded-lg bg-brand-burn/10 px-2.5 py-1 text-[10px] font-semibold text-brand-burn">
                ₦{(data.reduce((a, b) => a + b, 0) * 1000).toLocaleString()}
              </div>
            </div>

            <div className="relative h-48 w-full">
              {/* Guides */}
              <div className="absolute inset-x-0 top-0 border-t border-slate-100" />
              <div className="absolute inset-x-0 top-1/3 border-t border-slate-100" />
              <div className="absolute inset-x-0 top-2/3 border-t border-slate-100" />
              <div className="absolute inset-x-0 bottom-0 border-t border-slate-100" />

              <svg
                viewBox="0 0 300 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full overflow-visible"
              >
                <motion.polyline
                  points={points}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-brand-burn"
                  initial={{
                    pathLength: 0,
                    opacity: 0,
                  }}
                  animate={{
                    pathLength: 1,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: "easeInOut",
                  }}
                />

                {data.map((value, index) => {
                  const x = index * 50;
                  const y = 90 - value;

                  return (
                    <motion.circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="3"
                      className="fill-brand-burn"
                      initial={{
                        scale: 0,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      transition={{
                        delay: index * 0.05,
                      }}
                    />
                  );
                })}
              </svg>

              <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[9px] text-slate-400">
                {["9AM", "11AM", "1PM", "3PM", "5PM", "7PM", "9PM"].map(
                  (time) => (
                    <span key={time}>{time}</span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}