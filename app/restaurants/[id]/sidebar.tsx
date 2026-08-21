"use client";
import { brand } from "@/brand";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronLeft,
  Home,
  BarChart3,
  Lightbulb,
  User,
  Cog,
  Bell,
  UtensilsCrossed,
  Clock,
  Package,
} from "lucide-react";
import { useState } from "react";
interface Props{
 organizationName?:string,
 className?:string,     
 tagline?:string, 
};
function RestaurantSideBar({ className , organizationName , tagline}:Props) {
  const router = useRouter();
  const resNavItems = [
    {
      id:"0",
      name: "Dashboard",
      icon: Home,
      route: "/agent/dashboard",
    },
    {
      id:"1",
      name: "Orders",
      icon: UtensilsCrossed,
      route: "/agent/dashboard/restaurants",
      dropdown: false,
    },
    {
       id:"2",
      name: "Recents",
      icon: Clock,
      route: "/agent/dashboard/orders",
      dropdown: false,
    },
    {
       id:"3",
      name: "Products",
      icon: Package,
        route: "/agent/dashboard/profile",
      dropdown: false,
    },
    {
       id:"4",
      name: "Sales",
        route: "/agent/dashboard/sales",
      icon: BarChart3,
    },
    {
       id:"5",
      name: "Insights",
      icon: Lightbulb,
        route: "/agent/dashboard/insights",
      dropdown: false,
          
    },
    {
       id:"6",
      name: "Notifications",
      icon: Bell,
      route: "/agent/dashboard/notifications",
      dropdown: false,
          
    },
    {
       id:"7",
      name: "Settings",
      icon: Cog,
      route: "/agent/dashboard/settings",
      dropdown: false,
    },
  ];
 const [activeTab , setActiveTab] = useState<string>(resNavItems[0]?.id ?? "0")
  return (
    <aside
      className={`
        ${className ?? ""}
        flex
        w-56
        min-h-screen
        shrink-0
        flex-col
        overflow-hidden
        bg-brand-burn
        text-white
        rounded-tr-[28px]
      `}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-white/10 px-7">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/80">
            <span className="text-[11px] font-bold">F</span>
          </div>

          <span className="text-lg font-semibold tracking-tight">
            {brand.name}
          </span>
        </div>
      </div>

      {/* Location / workspace */}
      <button
        type="button"
        className="
          flex
          items-center
          justify-between
          border-b
          border-white/10
          px-7
          py-4
          text-left
          transition-colors
          hover:bg-white/5
        "
      >
        <div>
          <p className="text-xs font-medium">{organizationName}</p>
          <p className="mt-0.5 text-[10px] text-white/55">
            {tagline}
          </p>
        </div>

        <ChevronDown size={14} className="text-white/70" />
      </button>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 px-4 py-5">
        {resNavItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
      
          return (
            <button
            onClick={() => {
              router.push(item.route)
              setActiveTab(item.id);
            }}
              key={item.name}
              type="button"
              className={`
                group
                flex
                w-full
                items-center
                gap-3
                rounded-md
                px-3
                py-2.5
                text-left
                text-xs
                transition-all
                duration-200
                ${
                  active
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-white/70 hover:bg-white/8 hover:text-white"
                }
              `}
            >
              <Icon
                size={15}
                strokeWidth={active ? 2.2 : 1.8}
                className="shrink-0"
              />

              <span className="flex-1">{item.name}</span>

              {item.dropdown && (
                <ChevronDown
                  size={13}
                  className="
                    text-white/45
                    transition-transform
                    duration-200
                    group-hover:text-white/80
                  "
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse button */}
      <div className="border-t border-white/10 px-4 py-4">
        <button
          type="button"
          aria-label="Collapse sidebar"
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-md
            text-white/60
            transition-all
            duration-200
            hover:bg-white/10
            hover:text-white
          "
        >
          <ChevronLeft size={17} />
        </button>
      </div>
    </aside>
  );
}

export default RestaurantSideBar;