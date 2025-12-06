"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

type ParallaxFlameProps = {
  children: ReactNode;
  intensity?: number;
  className?: string;
};

export function ParallaxFlame({ children, intensity = 100, className }: ParallaxFlameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [-intensity, intensity]);

  return (
    <motion.div ref={ref} className={cn("relative will-change-transform", className)} style={{ y: translateY }}>
      {children}
      <span className="shine-overlay rounded-2xl" />
    </motion.div>
  );
}

