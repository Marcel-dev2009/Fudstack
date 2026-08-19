"use client";

import { motion } from "framer-motion";

export default function SkeletonLoader({
  className,
}: {
  className?: string;
}) {
  return (
    <motion.span
      className={`inline-block rounded-sm bg-black/10 ${className}`}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}