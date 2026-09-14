"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { Button } from "@/components/ui/button";
import aboutPhoto from "../../../public/about.png";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import AboutGrid from "../../../../ui/about-grid";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, SplitText);

function About() {
  const router = useRouter();
  const section = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // 1. Smooth SplitText Heading Animation
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, {
          type: "words",
        });

        gsap.from(split.words, {
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: "power3.out",
        });
      }

      // 2. Smooth Grid Fade/Slide Reveal
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            scrollTrigger: {
              trigger: gridRef.current,
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
    { scope: section }
  );

  return (
    <section
      ref={section}
      className="relative min-h-screen w-full bg-black py-12 text-white sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-xl font-bold tracking-tight text-white/90 sm:text-2xl">
          About Us
        </h2>

        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:items-start lg:gap-16">
          {/* Photo Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg shrink-0 rounded-2xl bg-white/5 p-2 backdrop-blur-sm ring-1 ring-white/10"
          >
            <Image
              src={aboutPhoto}
              alt="Fudstack - About Photo"
              className="h-auto max-h-137.5 w-full rounded-xl object-contain"
              priority
            />
          </motion.div>

          {/* Text & Content Container */}
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            {/* SplitText Animated Headline */}
            <h2
              ref={headlineRef}
              className="max-w-xl text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl leading-tight"
            >
              We automate your tasks without the friction of complexity.
            </h2>

            {/* Paragraph & CTA */}
            <div className="mt-6 flex flex-col items-center gap-6 lg:items-start">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                className="max-w-md text-sm font-normal leading-relaxed text-gray-400 sm:text-base"
              >
                Your all-in-one solution for management of day-to-day tasks in your
                workplace such as inventory management, client interaction,
                deliveries, and scheduling.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
                className="w-full sm:w-auto"
              >
                <Button
                  onClick={() => router.push("/docs")}
                  className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-burn px-6 text-xs font-semibold text-white transition-all hover:bg-brand-burn/90 active:scale-95 sm:w-auto"
                >
                  <span>Read More</span>
                  <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>

            {/* Grid Container */}
            <div ref={gridRef} className="mt-10 w-full">
              <AboutGrid />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;