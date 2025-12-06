"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GradientText, Spotlight, BackgroundGrid } from "@/components/magicui";
import { fadeUp, stagger } from "@/lib/motion";

export function PhoenixIdentitySection() {
  return (
    <section
      id="phoenix-identity"
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
        variants={stagger(0.18, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-20%" }}
        className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <motion.div variants={fadeUp(0)}>
          <p className="text-sm uppercase tracking-[0.5em] text-white/60">
            Phoenix Identity
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
            <GradientText className="text-4xl font-black md:text-5xl">
              Sức mạnh tái sinh · Khí chất dẫn đầu
            </GradientText>
          </h2>
          <p className="mt-6 text-lg text-white/80">
            Phượng hoàng lửa luôn đứng vững trước mọi thử thách, không ngừng tái
            sinh và bứt phá. Nhà Phoenix sẽ bùng nổ tại Brothers &amp; Sisters
            2025!
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Đứng vững trước thử thách",
                desc: "Bản lĩnh lạnh lùng trước sóng gió, rực cháy trong khoảnh khắc quyết định.",
              },
              {
                title: "Không ngừng tái sinh",
                desc: "Vươn lên từ đổ nát, biến giới hạn thành bàn đạp bứt phá.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp(0.1)}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
              >
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-white/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp(0.2)} className="relative">
          <div className="fire-border relative rounded-[32px] bg-black/50 p-4">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#ff0000]/40 via-transparent to-[#ff6b00]/30 blur-[80px]" />
            <Image
              src="/phoenix2.jpg"
              alt="Phoenix Identity"
              width={600}
              height={720}
              className="h-full w-full rounded-[24px] object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs uppercase tracking-[0.4em] text-white/70 backdrop-blur">
              Flames DNA
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
