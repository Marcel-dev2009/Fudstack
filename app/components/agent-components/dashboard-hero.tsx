/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import{
    CalendarDays,
    ChevronDown,
    ChevronRight,
    Eye,
    EyeOff,
    TrendingUp,
    ShoppingCart,
    Package,
    List,
    BarChart3,
    RefreshCw,
    Receipt,
    Truck,
    Bell,
    Check,
    Plus,
} from "lucide-react"
import { summaryCards} from "@/app/data/data";
import dynamic from "next/dynamic";
type Organization = {
  id: string;
  name: string;
};

const AnalyticsPopover = dynamic(() => import("@/app/components/agent-components/analytics-provider"));

const OrganizationSwitcher = dynamic(() => import("@/app/components/agent-components/organization-switcher"))
const SummaryCard = dynamic(() => import("@/app/components/agent-components/summary-card"))
const ChartPlaceholder = dynamic(() => import("@/app/components/agent-components/chart-placeholder"))

function AgentDashboardHero({
  organizationName,
  organizationPhoto,
  organizations = [],
}: {
  organizationName: string;
  organizationPhoto: string;
  organizations?: Organization[];
}) {
  const router = useRouter();

  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [organizationOpen, setOrganizationOpen] = useState(false);
  const [numbersHidden, setNumbersHidden] = useState(false);
  const [selectedDay, setSelectedDay] = useState("mon");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);

    startTransition(() => {
      router.refresh();
    });

    // Animation reset
    setTimeout(() => {
      setRefreshing(false);
    }, 650);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Top bar */}
      <header className="flex min-h-16 items-center justify-between border-b border-black/5 px-4 sm:px-7">
        <div className="flex items-center gap-2">
          <h1 className="text-xs font-medium tracking-tighter">
            Dashboard
          </h1>

          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-[10px] text-slate-500">
            i
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <span className="hidden text-[10px] font-semibold text-slate-700 sm:block">
            PLAN: PRO
          </span>

          <button
            onClick={() => router.push("/agent/dashboard/orders")}
            className="text-slate-500 transition-colors hover:text-brand-burn"
          >
            <ShoppingCart size={17} />
          </button>

          <button
            onClick={() => router.push("/agent/dashboard/sales")}
            className="relative text-slate-500 transition-colors hover:text-brand-burn"
          >
            <BarChart3 size={17} />

            <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-red-500" />
          </button>

          <button
            onClick={() => router.push("/agent/dashboard/notifications")}
            className="hidden text-slate-500 transition-colors hover:text-brand-burn sm:block">
            <Bell size={18} />
          </button>

          {/* Avatar */}
          <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-200">
            <img
              alt={organizationName}
              src={organizationPhoto}
              className=" w-full h-full mx-auto  object-cover"
            />
          </div>

          {/* Organization switcher */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setOrganizationOpen((value) => !value);
                setAnalyticsOpen(false);
              }}
              className="
                flex h-8 w-8 items-center justify-center
                rounded-full bg-brand-burn
                text-white shadow-sm
              "
            >
              <motion.span
                animate={{
                  rotate: organizationOpen ? 45 : 0,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <Plus size={17} />
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {organizationOpen && (
                <OrganizationSwitcher
                  organizationName={organizationName}
                  organizations={organizations}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Filters */}
      <section className="relative flex items-center gap-3 border-b border-black/5 px-4 py-3 sm:px-7">
        {/* Analytics dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setAnalyticsOpen((value) => !value);
              setOrganizationOpen(false);
            }}
            className="
              flex items-center gap-2 rounded-lg
              border border-black/5 bg-white
              px-3 py-2 text-xs text-slate-600
              shadow-sm transition-all
              hover:border-brand-burn/20
              hover:shadow-md
            "
          >
            <CalendarDays size={14} />

            <span className="hidden sm:inline">
              Last week
            </span>

            <ChevronDown
              size={13}
              className={`transition-transform duration-200 ${
                analyticsOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {analyticsOpen && (
              <AnalyticsPopover
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
              />
            )}
          </AnimatePresence>
        </div>

        <button
          className="
            hidden items-center gap-3 rounded-lg
            border border-black/5 bg-white
            px-3 py-2 text-xs text-slate-600
            shadow-sm sm:flex
          "
        >
          All locations
          <div className="w-2 h-2 rounded-full bg-green-600"/>
        </button>

        {/* Refresh */}
        <button
          onClick={handleRefresh}
          title="Refresh page"
          className="
            flex h-9 w-9 items-center justify-center
            rounded-lg bg-brand-burn
            text-white shadow-sm
            transition-all
            hover:scale-105
          "
        >
          <motion.div
            animate={{
              rotate: refreshing ? [0, 180, 150, 180] : 0,
            }}
            transition={{
              duration: 0.65,
              ease: "easeInOut",
            }}
          >
            <RefreshCw size={14} />
          </motion.div>
        </button>

        {/* Hide/show numbers */}
        <button
          onClick={() => setNumbersHidden((value) => !value)}
          title={
            numbersHidden
              ? "Show dashboard values"
              : "Hide dashboard values"
          }
          className="
            ml-auto flex h-9 w-9 items-center
            justify-center rounded-lg
            bg-brand-burn text-white
            shadow-sm
            transition-all
            hover:scale-105
          "
        >
          <motion.div
            animate={{
              scale: numbersHidden ? [1, 0.75, 1] : 1,
            }}
            transition={{
              duration: 0.35,
            }}
          >
            {numbersHidden ? (
              <EyeOff size={16} />
            ) : (
              <Eye size={16} />
            )}
          </motion.div>
        </button>
      </section>

      {/* Dashboard content */}
      <section className="space-y-6 px-4 py-6 sm:px-7">
        {/* Summary */}
        <div>
          <h2 className="mb-3 text-sm font-semibold">
            Summary
          </h2>

          <div className="grid grid-cols-1 gap-3 rounded-xl bg-cyan-50/70 p-3 md:grid-cols-2">
            <SummaryCard
              title="Total value deliveries"
              value="2,022"
              icon={Truck}
              change="↑ 2.15%"
              highlighted
              hidden={numbersHidden}
            />

            <SummaryCard
              title="Total value invoices"
              value="2,022"
              icon={Receipt}
              change="↑ 2.15%"
              hidden={numbersHidden}
            />
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {summaryCards.map((card) => (
              <SummaryCard
                key={card.title}
                title={card.title}
                value={card.value}
                icon={card.icon}
                change={card.change}
                hidden={numbersHidden}
              />
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <ChartPlaceholder
            title="Deliveries"
            icon={Truck}
          />

          <ChartPlaceholder
            title="Orders"
            icon={ShoppingCart}
          />
        </div>

        {/* Bottom */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <ChartPlaceholder
            title="Sales"
            icon={TrendingUp}
          />

          <ChartPlaceholder
            title="Stock"
            icon={Package}
          />

          <ChartPlaceholder
            title="Insights"
            icon={BarChart3}
          />
        </div>
      </section>
    </main>
  );
}

export default AgentDashboardHero;