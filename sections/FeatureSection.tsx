"use client";

import { motion } from "framer-motion";
import { MotionCard } from "@/components/motion-primitives";
import { GradientText } from "@/components/magicui";
import { fadeUp, stagger } from "@/lib/motion";

const features = [
  {
    title: "Ý chí kiên định",
    desc: "Kiên cường trước sức nóng, càng cháy càng rực.",
    metric: "100%",
  },
  {
    title: "Tinh thần tái sinh",
    desc: "Vươn dậy mạnh mẽ sau mọi tàn tro.",
    metric: "∞",
  },
  {
    title: "Khát vọng chinh phục",
    desc: "Luôn đặt mục tiêu ở đỉnh cao mới.",
    metric: "MAX",
  },
  {
    title: "Bản lĩnh dẫn đầu",
    desc: "Tạo xu hướng, đốt cháy sân chơi.",
    metric: "#1",
  },
];

export function FeatureSection() {
  return (
    <section id="phoenix-flame" className="phoenix-section relative mt-24 rounded-[32px] border border-white/10 bg-[#060606] px-6 py-20 md:px-16">
      <motion.div
        variants={stagger(0.12, 0.05)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
      >
        <motion.p variants={fadeUp(0)} className="text-sm uppercase tracking-[0.5em] text-white/60">
          Ngọn lửa Phoenix
        </motion.p>
        <motion.h2
          variants={fadeUp(0.1)}
          className="mt-4 text-3xl font-bold text-white md:text-5xl lg:text-6xl"
        >
          <GradientText className="text-4xl font-black md:text-6xl">
            Đặc tính lửa – Power Traits
          </GradientText>
        </motion.h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <MotionCard
              key={feature.title}
              variants={fadeUp(0.15 + index * 0.05)}
              className="relative overflow-hidden rounded-3xl border border-[#ff6b00]/40 bg-gradient-to-br from-[#140101] via-[#080808] to-[#150600] p-6 text-white"
            >
              <div className="absolute inset-0 opacity-60 blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(255,0,0,0.4), transparent 50%)" }} />
              <div className="relative flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-white/60">Phoenix Core</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm text-white/70">{feature.desc}</p>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 120 }}
                  className="rounded-full border border-white/10 bg-black/40 px-5 py-3 text-2xl font-black text-[#ffd86b]"
                >
                  {feature.metric}
                </motion.div>
              </div>
            </MotionCard>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

