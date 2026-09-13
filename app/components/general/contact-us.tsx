"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import Form from "../ui/contact-form";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, { type: "words" });

        gsap.from(split.words, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 20,
          opacity: 0,
          duration: 0.7,
          stagger: 0.04,
          ease: "power3.out",
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-primary-bone py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 flex items-center justify-center sm:justify-start gap-2">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-burn bg-brand-burn/10 px-3 py-1 rounded-full">
            Contact Us
          </span>
        </div>

        {/* 3-Column SaaS Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Heading & Intro Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col justify-between space-y-6 text-center sm:text-left"
          >
            <div>
              <h2
                ref={headlineRef => {
                  headingRef.current = headlineRef;
                }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight"
              >
                Your message means a lot to us!
              </h2>

              <p className="mt-4 text-xs sm:text-sm text-gray-600 font-normal leading-relaxed tracking-tight">
                We&apos;d love to hear from you! Whether you have questions about
                FudStack, need assistance navigating the app, or want to share
                testimonials—we&apos;re here to help. ✨
              </p>
            </div>

            {/* Quick Highlight Box */}
            <div className="p-5 rounded-2xl bg-white/60 border border-gray-200/80 backdrop-blur-sm shadow-sm hidden sm:block">
              <p className="text-xs font-semibold text-gray-800">
                Looking for technical documentation?
              </p>
              <Link
                href="/docs"
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-burn hover:underline mt-1"
              >
                <span>Explore FudStack Docs</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Center Column: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xl shadow-gray-900/5"
          >
            <Form />
          </motion.div>

          {/* Right Column: Direct Channels & Support Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 flex flex-col space-y-6 sm:space-y-8 text-left"
          >
            {/* Sales Email */}
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-burn/10 text-brand-burn ring-1 ring-brand-burn/20">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  Chat to sales
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Speak to our team directly</p>
                <a
                  href="mailto:marcux@gmail.com"
                  className="text-xs sm:text-sm font-semibold text-brand-burn hover:underline block mt-1"
                >
                  marcux@gmail.com
                </a>
              </div>
            </div>

            {/* Location & Phone */}
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-burn/10 text-brand-burn ring-1 ring-brand-burn/20">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  Location & Phone
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Enugu State, Nigeria</p>
                <div className="flex flex-col space-y-0.5 mt-1">
                  <Link
                    href="tel://+2347071766184"
                    className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-brand-burn transition-colors"
                  >
                    +234 707 176 6184
                  </Link>
                  <Link
                    href="tel://+2349122040914"
                    className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-brand-burn transition-colors"
                  >
                    +234 912 204 0914
                  </Link>
                </div>
              </div>
            </div>

            {/* Support Hours */}
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-burn/10 text-brand-burn ring-1 ring-brand-burn/20">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  Call Operating Hours
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-1">
                  Tue – Fri: 8:00 AM – 5:00 PM
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}