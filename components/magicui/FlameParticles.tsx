"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Particle = {
  id: number;
  left: string;
  delay: number;
  hue: number;
};

const presetParticles: Particle[] = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: (index * 0.37) % 4,
  hue: 18 + ((index * 7) % 30),
}));

export function FlameParticles({
  count = 12,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const particles = presetParticles.slice(0, count);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-24 w-1 rounded-full"
          style={{
            left: particle.left,
            bottom: "-20%",
            background: `linear-gradient(180deg, hsla(${particle.hue}, 100%, 60%, 0) 0%, hsla(${particle.hue}, 100%, 60%, 0.4) 35%, rgba(255,255,255,0) 100%)`,
          }}
          animate={{
            y: ["0%", "-40%"],
            opacity: [0, 0.8, 0],
            scale: [0.6, 1, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
