"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { brand } from "@/brand";
import { resNavItems } from "@/app/data/data";

interface Props {
  organizationName?: string;
  className?: string;
  tagline?: string;
}

export default function RestaurantSideBar({
  className = "",
  organizationName = "My Workspace",
  tagline = "Restaurant Management",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside
      className={`
        fixed left-0 top-0 z-40
        flex h-screen w-64 shrink-0 flex-col
        bg-brand-burn text-white
        border-r border-white/10 shadow-lg
        transition-all duration-300
        ${className}
      `}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 border border-white/20 font-bold text-sm text-white shadow-inner">
            {brand.name ? brand.name.charAt(0).toUpperCase() : "F"}
          </div>
          <span className="text-base font-bold tracking-tight text-white/95">
            {brand.name}
          </span>
        </div>
      </div>

      {/* Workspace Selector */}
      <button
        type="button"
        className="
          flex items-center justify-between
          border-b border-white/10
          px-6 py-3.5 text-left
          transition-colors duration-150
          hover:bg-white/5 active:bg-white/10
          shrink-0 group
        "
      >
        <div className="min-w-0 flex-1 pr-2">
          <p className="text-xs font-semibold text-white/90 truncate">
            {organizationName}
          </p>
          <p className="mt-0.5 text-[11px] text-white/50 truncate">
            {tagline}
          </p>
        </div>
        <ChevronDown
          size={14}
          className="text-white/50 group-hover:text-white transition-colors shrink-0"
        />
      </button>

      {/* Scrollable Navigation List */}
      <nav className="flex-1 overflow-y-auto space-y-1 px-3 py-4 scrollbar-none">
        {resNavItems.map((item) => {
          const Icon = item.icon;
          // Syncs active state dynamically with the actual current pathname
          const isActive = pathname === item.route;

          return (
            <button
              key={item.id ?? item.name}
              type="button"
              onClick={() => router.push(item.route)}
              className={`
                group flex w-full items-center gap-3
                rounded-xl px-3.5 py-2.5 text-left text-xs font-medium
                transition-all duration-200 outline-none
                ${
                  isActive
                    ? "bg-white/15 text-white font-semibold shadow-sm backdrop-blur-md"
                    : "text-white/65 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              <Icon
                size={16}
                strokeWidth={isActive ? 2.2 : 1.8}
                className={`shrink-0 transition-transform duration-200 ${
                  isActive ? "text-orange-400 scale-105" : "text-white/60 group-hover:text-white"
                }`}
              />

              <span className="flex-1 truncate">{item.name}</span>

              {item.dropdown && (
                <ChevronDown
                  size={13}
                  className="text-white/40 group-hover:text-white/80 transition-transform duration-200"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Collapse Trigger */}
      <div className="border-t border-white/10 px-4 py-3 shrink-0 flex items-center justify-between">
        <button
          type="button"
          aria-label="Collapse sidebar"
          className="
            flex h-8 w-8 items-center justify-center
            rounded-lg text-white/60
            transition-colors duration-150
            hover:bg-white/10 hover:text-white
            active:scale-95
          "
        >
          <ChevronLeft size={18} />
        </button>
      </div>
    </aside>
  );
}