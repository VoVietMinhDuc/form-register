"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { GradientText, Spotlight, BackgroundGrid } from "@/components/magicui";

const libraries = [
  {
    name: "Framer Motion",
    detail: "Hero reveal · staggered choreography · kinetic CTA",
    accent: "rgba(255,0,0,0.45)",
    image: "/rise-space-01/full.png",
  },
  {
    name: "Lenis Smooth",
    detail: "Chuyển cảnh lụa như lửa, điều khiển tốc độ cuộn",
    accent: "rgba(255,216,107,0.35)",
    image: "/rise-space-01/ta4.jpg",
  },
  {
    name: "magicui",
    detail: "Spotlight, glow grid, parallax flame layers",
    accent: "rgba(255,107,0,0.4)",
    image: "/rise-space-01/ta2.jpg",
  },
  {
    name: "motion-primitives",
    detail: "MotionButton · MotionCard với hiệu ứng spring",
    accent: "rgba(255,45,0,0.35)",
    image: "/rise-space-01/se6.jpg",
  },
  {
    name: "shadcn/ui",
    detail: "Button · Card · Typography tái thiết kế Phoenix",
    accent: "rgba(255,255,255,0.15)",
    image: "/rise-space-01/gd3.jpg",
  },
  {
    name: "shadcn/ui",
    detail: "Button · Card · Typography tái thiết kế Phoenix",
    accent: "rgba(255,255,255,0.15)",
    image: "/rise-space-01/se5.jpg",
  },
];

export function MotionCarouselSection() {
  // Duplicate 2 lần để tạo hiệu ứng cuộn liên tục như vòng tròn
  // Khi scroll đến -50%, reset về 0% một cách seamless vì bộ thứ 2 giống hệt bộ đầu
  const duplicated = [...libraries, ...libraries];
  const controls = useAnimation();

  useEffect(() => {
    let isRunning = true;
    let mounted = true;

    const animate = async () => {
      // Đợi component mount xong trước khi gọi controls.set()
      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (mounted) {
              // Bắt đầu từ 0% sau khi component đã mount
              controls.set({ x: "0%" });
            }
            resolve(undefined);
          });
        });
      });

      while (isRunning && mounted) {
        // Cuộn từ vị trí hiện tại đến -50% (qua 1 bộ đầu tiên)
        await controls.start({
          x: "-50%",
          transition: {
            duration: 40,
            ease: "linear",
          },
        });

        // Reset về 0% ngay lập tức (không có transition) để seamless
        // Vì bộ thứ 2 giống hệt bộ đầu, nên không bị giật
        // Sử dụng requestAnimationFrame để đảm bảo reset mượt mà
        if (isRunning && mounted) {
          await new Promise((resolve) => {
            requestAnimationFrame(() => {
              if (mounted) {
                controls.set({ x: "0%" });
              }
              resolve(undefined);
            });
          });
        }
      }
    };

    animate();

    return () => {
      isRunning = false;
      mounted = false;
    };
  }, [controls]);

  return (
    <section
      id="rise-space"
      className="phoenix-section relative mt-20 overflow-hidden rounded-[32px] border border-white/10 bg-[#080607] px-6 py-16 md:px-12"
    >
      <BackgroundGrid className="opacity-40" />
      <Spotlight
        className="top-[-10%] right-[15%] opacity-50"
        size={520}
        color="rgba(255,0,0,0.45)"
      />
      <div className="relative space-y-6 text-center">
        <p className="text-sm uppercase tracking-[0.5em] text-white/60">
          RISE SPACE
        </p>
        <h2 className="text-3xl font-extrabold text-white md:text-5xl">
          <GradientText className="pt-2">KHÔNG GIAN ĐỂ VƯƠN MÌNH</GradientText>
        </h2>
        <p className="mx-auto max-w-3xl text-base text-white/75">
          SÂN CHƠI HỌC THUẬT TOP ĐẦU DÀNH CHO TÂN SINH VIÊN FPTU HCM
        </p>
      </div>

      <div className="mt-12 overflow-hidden">
        <motion.div className="flex gap-6" animate={controls}>
          {duplicated.map((lib, index) => (
            <motion.div
              key={`${lib.name}-${index}`}
              className="min-w-[280px] shrink-0 overflow-hidden rounded-3xl border border-white/25 bg-black/20 shadow-[0_15px_35px_rgba(0,0,0,0.45)] backdrop-blur"
              style={{ boxShadow: `0 0 30px ${lib.accent}` }}
            >
              <Image
                src={lib.image}
                alt={lib.name}
                width={420}
                height={280}
                className="h-44 w-full rounded-3xl object-cover object-center"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
