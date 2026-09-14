"use client";

import Image from "next/image";
import logo from "../../../public/icon.png";
import Link from "next/link";
import DropDown from "../foodey/app/components/header-dropdown";
import { DropItems } from "@/app/data/data";
import { useRef, useState, useEffect } from "react";
import { ChevronDown, Menu, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function RootHeader() {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [itemOpen, setItemOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setItemOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-10 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-85 focus:outline-none"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-burn/10 p-1.5 ring-1 ring-brand-burn/20">
              <Image
                src={logo}
                alt="FudStack Logo"
                width={28}
                height={28}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-base font-bold tracking-tight text-gray-900">
              Fud<span className="text-brand-burn">Stack</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {/* Services Dropdown Item */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setItemOpen((prev) => !prev)}
              aria-haspopup="menu"
              aria-expanded={itemOpen}
              className={`group flex items-center gap-1.5 text-xs font-semibold tracking-tight transition-colors hover:text-brand-burn focus:outline-none ${
                itemOpen ? "text-brand-burn" : "text-gray-700"
              }`}
            >
              <span>Services</span>
              <motion.div
                animate={{ rotate: itemOpen ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex items-center justify-center"
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.div>
            </button>

            {/* Dropdown Card */}
            <AnimatePresence>
              {itemOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{
                    duration: 0.18,
                    ease: [0.16, 1, 0.3, 1], // Custom smooth ease-out curve
                  }}
                  className="absolute left-0 mt-3.5 w-64 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl shadow-gray-900/5 ring-1 ring-black/5"
                >
                  <div className="flex flex-col space-y-1">
                    {DropItems.map((item) => (
                      <DropDown
                        key={item.title}
                        href={item.link}
                        onClick={() => setItemOpen(false)}
                      >
                        {item.title}
                      </DropDown>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/docs"
            className="text-xs font-semibold tracking-tight text-gray-700 transition-colors hover:text-brand-burn"
          >
            About
          </Link>

          <Link
            href="/docs"
            className="text-xs font-semibold tracking-tight text-gray-700 transition-colors hover:text-brand-burn"
          >
            FAQ
          </Link>

          <Link
            href="/docs"
            className="text-xs font-semibold tracking-tight text-gray-700 transition-colors hover:text-brand-burn"
          >
            Contact Us
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/docs")}
            className="group inline-flex items-center gap-1.5 rounded-full bg-brand-burn/10 px-3.5 py-1.5 text-xs font-semibold tracking-tight text-brand-burn transition-all hover:bg-brand-burn hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-burn focus:ring-offset-1 active:scale-95"
            title="View the documentation"
          >
            <FileText className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
            <span>Docs</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-gray-100 bg-white md:hidden"
          >
            <div className="space-y-3 px-4 py-4">
              <div className="space-y-1">
                <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Services
                </p>
                <div className="pl-2">
                  {DropItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.link}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-lg px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-burn"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              <div className="flex flex-col space-y-2">
                <Link
                  href="/docs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-2 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-brand-burn"
                >
                  About
                </Link>
                <Link
                  href="/docs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-2 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-brand-burn"
                >
                  FAQ
                </Link>
                <Link
                  href="/docs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-2 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-brand-burn"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}