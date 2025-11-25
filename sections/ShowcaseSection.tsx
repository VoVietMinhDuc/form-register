"use client";

import { motion } from "framer-motion";
import { GradientText, BackgroundGrid, Spotlight } from "@/components/magicui";
import { fadeUp, stagger } from "@/lib/motion";
import memberImages from "@/data/phoenixMembers";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export function ShowcaseSection() {
  return (
    <section
      id="member"
      className="phoenix-section relative mt-24 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#120101] via-[#050505] to-[#1a0a00] px-6 py-20 md:px-16"
    >
      <BackgroundGrid className="opacity-60" />
      <Spotlight
        className="top-0 right-1/2"
        color="rgba(255,255,255,0.2)"
        size={360}
      />
      <Spotlight
        className="bottom-[-120px] left-12 opacity-60"
        color="rgba(255,107,0,0.5)"
        size={420}
      />

      <motion.div
        variants={stagger(0.12, 0.05)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
      >
        {/* Header */}
        <motion.div variants={fadeUp(0)} className="relative z-10 mb-16 text-center">
          <p className="text-sm uppercase tracking-[0.5em] text-white/60">
            Phoenix's House Members
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
            <GradientText className="text-4xl p-2 font-black md:text-5xl">
              ĐỘI HÌNH PHOENIX 2025
            </GradientText>
          </h2>
          <p className="mt-4 text-lg text-white/80 md:text-xl">
            47 thành viên – Khí chất dẫn đầu, đoàn kết và bùng nổ!
          </p>
        </motion.div>

        {/* 3D Marquee Gallery */}
        <motion.div
          variants={fadeUp(0.2)}
          className="relative mx-auto max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800/50 overflow-visible"
        >
          <div className="h-[600px] md:h-[800px] w-full relative overflow-hidden">
            <ThreeDMarquee images={memberImages} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
