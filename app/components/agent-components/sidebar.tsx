"use client";
import { brand } from "@/brand";
import { useRouter , usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { navItems } from "@/app/data/data";
interface Props{
 organizationName?:string,
 className?:string,     
 tagline?:string, 
};

export function AgentSideBar({ className, organizationName, tagline }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* Mobile Top Navbar Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-brand-burn text-white border-b border-white/10 flex items-center justify-between px-4 z-30 shadow-md">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/80">
            <span className="text-[11px] font-bold">F</span>
          </div>
          <span className="text-base font-semibold tracking-tight">
            {brand.name}
          </span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-label="Toggle navigation menu"
          className="p-2 rounded-md hover:bg-white/10 text-white transition-colors"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-50
          w-64 h-screen max-h-screen
          flex flex-col flex-nowrap
          overflow-y-auto
          bg-brand-burn text-white
          lg:rounded-tr-[28px]
          shadow-2xl lg:shadow-none
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${className ?? ""}
        `}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/80">
              <span className="text-[11px] font-bold">F</span>
            </div>

            <span className="text-lg font-semibold tracking-tight">
              {brand.name}
            </span>
          </div>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
            className="lg:hidden text-white/70 hover:text-white p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Location / Workspace switcher */}
        {(organizationName || tagline) && (
          <button
            type="button"
            className="
              shrink-0
              flex
              items-center
              justify-between
              border-b
              border-white/10
              px-6
              py-4
              text-left
              transition-colors
              hover:bg-white/5
            "
          >
            <div className="truncate pr-2">
              {organizationName && (
                <p className="text-xs font-medium truncate">
                  {organizationName}
                </p>
              )}
              {tagline && (
                <p className="mt-0.5 text-[10px] text-white/55 truncate">
                  {tagline}
                </p>
              )}
            </div>

            <ChevronDown size={14} className="text-white/70 shrink-0" />
          </button>
        )}

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Checks if route starts with item route for nested active state
            const active =
              pathname === item.route;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  router.push(item.route);
                  setIsOpen(false);
                }}
                className={`
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3.5
                  py-2.5
                  text-left
                  text-xs
                  font-medium
                  transition-all
                  duration-200
                  ${
                    active
                      ? "bg-white/20 text-white shadow-sm font-semibold"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                <Icon
                  size={16}
                  strokeWidth={active ? 2.3 : 1.8}
                  className="shrink-0"
                />

                <span className="flex-1 truncate">{item.name}</span>

                {item.dropdown && (
                  <ChevronDown
                    size={13}
                    className="
                      text-white/45
                      transition-transform
                      duration-200
                      group-hover:text-white/80
                      shrink-0
                    "
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Footer / Collapse */}
        <div className="shrink-0 border-t border-white/10 px-4 py-3">
          <button
            type="button"
            aria-label="Collapse sidebar"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-white/70
              transition-all
              duration-200
              hover:bg-white/10
              hover:text-white
            "
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      </aside>
    </>
  );
}

export default AgentSideBar;
