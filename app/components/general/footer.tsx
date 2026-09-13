"use client";

import Image from "next/image";
import Link from "next/link";
import { footerItems, serviceGrid } from "@/app/data/data";
import { brand } from "@/brand";
import logo from "../../../public/icon.png";
import qr from "../../../public/frame.png";
import { ArrowUpRight, MessageCircle } from "lucide-react";

export default function Footer() {
  const currentDate = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary-eggshell text-gray-800 border-t border-gray-200/60 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Main Grid: Brand Info | Navigation Columns | Mobile App/QR */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12">
          
          {/* Column 1: Brand Info (Span 4) */}
          <div className="md:col-span-4 flex flex-col justify-between items-start">
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-burn/10 p-1.5 ring-1 ring-brand-burn/20 transition-all group-hover:scale-105">
                  <Image
                    src={logo}
                    alt={brand.ariaLogo || "Brand Logo"}
                    width={28}
                    height={28}
                    className="h-auto w-auto object-contain"
                  />
                </div>
                <span className="text-lg font-bold tracking-tight text-gray-900">
                  {brand.name}
                </span>
              </Link>

              <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed max-w-sm tracking-tight">
                Automating everyday operations for growing businesses—from inventory management to client delivery tracking.
              </p>
            </div>

            <div className="mt-6 text-xs text-gray-400 font-medium">
              Empowering workplace efficiency worldwide.
            </div>
          </div>

          {/* Column 2: Quick Links (Span 2) */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {footerItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href || "#"}
                    className="text-xs sm:text-sm text-gray-600 hover:text-brand-burn transition-colors tracking-tight font-medium inline-block"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (Span 3) */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {serviceGrid.map((service) => (
                <li key={service.title}>
                  <Link
                    href="#"
                    className="text-xs sm:text-sm text-gray-600 hover:text-brand-burn transition-colors tracking-tight font-medium line-clamp-1"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: WhatsApp Connection / QR (Span 3) */}
          <div className="md:col-span-3 flex flex-col items-start sm:items-start">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3 flex items-center gap-1.5">
              <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
              <span>Connect on WhatsApp</span>
            </h3>
            
            <p className="text-xs text-gray-500 mb-4 tracking-tight">
              Scan the code below or tap to initiate a direct chat with our support team.
            </p>

            {/* Interactive QR Card */}
            <a
              href="https://wa.me/2349122040914?text=Good%20day%20Marcel."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-sm transition-all duration-300 hover:shadow-md hover:border-emerald-500/40 hover:-translate-y-0.5"
            >
              <div className="relative h-28 w-28 overflow-hidden rounded-xl bg-gray-50 p-1">
                <Image
                  src={qr}
                  alt="Scan QR code to contact us on WhatsApp"
                  fill
                  sizes="112px"
                  className="object-contain p-1"
                />
              </div>

              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-2.5 group-hover:underline">
                <span>Open WhatsApp</span>
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </a>
          </div>

        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div className="pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="tracking-tight font-normal">
            Copyright &copy; {currentDate} <span className="font-semibold text-gray-700">{brand.name}</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-6 font-medium">
            <Link href="/privacy" className="hover:text-brand-burn transition-colors">
              Privacy Policy
            </Link>
            <span className="h-3 w-px bg-gray-300" />
            <Link href="/terms" className="hover:text-brand-burn transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}