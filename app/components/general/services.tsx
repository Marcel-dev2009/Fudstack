"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import ServiceGrid from "../ui/service-grid";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Services() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const gridWrapperRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // 1. Heading Word-by-Word Reveal
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, {
          type: "words",
        });

        gsap.from(split.words, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
        });
      }

      // 2. Smooth Grid Fade-In
      if (gridWrapperRef.current) {
        gsap.fromTo(
          gridWrapperRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            scrollTrigger: {
              trigger: gridWrapperRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[80vh] bg-secondary-licorice text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl text-center">
        {/* Section Tagline */}
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-brand-apricot mb-3">
          Our Services
        </span>

        {/* Animated Heading Container */}
        <div className="overflow-hidden mb-12">
          <h1
            ref={headingRef}
            className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight"
          >
            The services we offer include ...
          </h1>
        </div>

        {/* Service Grid Section */}
        <div ref={gridWrapperRef} className="w-full">
          <ServiceGrid />
        </div>
      </div>
    </section>
  );
}