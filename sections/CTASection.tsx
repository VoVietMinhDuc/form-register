"use client";

import { MotionButton } from "@/components/motion-primitives";
import { Spotlight } from "@/components/magicui";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

export function CTASection() {
  return (
    <section
      id="rise-stronger"
      className="phoenix-section relative mt-24 mb-24 overflow-hidden rounded-[32px] border border-[#ff0000]/40 bg-[#050505] px-6 py-20 text-center shadow-[0_0_80px_rgba(255,0,0,0.35)] md:px-16"
    >
      <Spotlight
        className="top-[-40%] left-1/2 -translate-x-1/2 opacity-80"
        size={800}
        color="rgba(255,0,0,0.6)"
      />
      <motion.div
        variants={stagger(0.2, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
      >
        <motion.p
          variants={fadeUp(0)}
          className="text-sm uppercase tracking-[0.5em] text-[#ffd86b]"
        >
          Final Call
        </motion.p>
        <motion.h2
          variants={fadeUp(0.1)}
          className="mt-4 text-4xl font-black text-white md:text-5xl"
        >
          Rise Stronger. Burn Brighter.
        </motion.h2>
        <motion.p
          variants={fadeUp(0.15)}
          className="mx-auto mt-4 max-w-2xl text-lg text-white/80"
        >
          Gia nhập đội hình Phoenix – nơi mọi thành viên là một ngọn lửa rực
          cháy, sẵn sàng viết nên chiến thắng Brothers &amp; Sisters 2025.
        </motion.p>
        <motion.div
          variants={fadeUp(0.2)}
          className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row"
        >
          <MotionButton
            whileHover={{
              scale: 1.08,
              boxShadow: "0 0 50px rgba(255,0,0,0.45)",
            }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-white/30 bg-gradient-to-r from-[#ff0000] via-[#ff6b00] to-[#ffd86b] px-10 py-5 text-lg font-semibold uppercase tracking-[0.3em] text-black"
          >
            Join the Flame
          </MotionButton>
          <span className="text-xs uppercase tracking-[0.5em] text-white/60">
            #PhoenixHouse
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
