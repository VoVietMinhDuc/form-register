"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PhoenixNavbar } from "@/components/navigation/PhoenixNavbar";
import { GradientText, BackgroundGrid } from "@/components/magicui";
import { MotionCard } from "@/components/motion-primitives";
import { fadeUp, stagger } from "@/lib/motion";
import { id } from "zod/v4/locales";

const blogPosts = [
  {
    id: 6,
    title: "Giải cờ TFT Phoenix Cup Mùa 01 - 02 - 03",
    excerpt:
      "Sân chơi trí tuệ, nơi ngọn lửa đam mê bùng cháy, kết nối cộng đồng qua từng trận đấu hấp dẫn.",

    tag: "Events",
    href: "/blog/phoenix-cup",
  },
  {
    id: 5,
    title: "Rise Space Season 01: Không gian để vươn mình",
    excerpt:
      "Không gian định hướng phát triển cá nhân và trải nghiệm học thuật top đầu dành cho tân sinh viên.",
    tag: "Academic",
    href: "/blog/rise-space-season-01",
  },
  {
    id: 4,
    title: "Digisurvive: Trải nghiệm sinh tồn trong thời đại mới",
    excerpt:
      "Hành trình thực tế, gay cấn và bổ ích, nơi Tân sinh viên K21 rèn luyện kỹ năng sinh tồn trong kỷ nguyên mới tại kỳ Rèn Luyện Tập Trung",
    tag: "Events",
    href: "/blog/digisurvive",
  },
  // {
  //   id: 3,
  //   title: "Vô địch giải đá banh Brothers and Sisters 2025",
  //   excerpt:
  //     "Cuộc chiến khắc nghiệt, nơi tinh thần đồng đội và ngọn lửa chiến thắng của Phoenix House bùng cháy trên sân cỏ Brothers and Sisters 2025.",
  //   tag: "Culture",
  //   href: "/blog/we-are-champions",
  // },
  {
    id: 2,
    title: "Brothers & Sisters 2025 Kick-off",
    excerpt:
      "Bắt đầu hành trình chinh phục đỉnh cao cùng Phoenix House tại Brothers & Sisters 2025.",
    tag: "Culture",
    href: "/blog/brothers-and-sisters-kick-off-2025",
  },
  {
    id: 1,
    title: "Phoenix House Kick-off 2025",
    excerpt:
      "Nơi ngọn lửa Yanar Dag bất diệt truyền cảm hứng tái sinh và khát vọng chinh phục.",
    tag: "Culture",
    href: "/blog/phoenix-house-kick-off-2025",
  },
];

export default function BlogPage() {
  return (
    <main className="relative mx-auto max-w-[1200px] px-4 pb-16 pt-4 md:px-6">
      <PhoenixNavbar />
      <BackgroundGrid className="opacity-30" />
      <motion.section
        variants={stagger(0.15, 0.08)}
        initial="hidden"
        animate="show"
        className="relative mt-24 rounded-[32px] border border-white/10 bg-[#0a0503] px-6 py-12 md:px-16 md:py-20"
      >
        <motion.div variants={fadeUp(0)} className="mb-8">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.4em] text-[#ff6b00] transition hover:text-[#ffd86b]"
          >
            ← Về trang chủ
          </Link>
        </motion.div>

        <motion.p
          variants={fadeUp(0.1)}
          className="text-sm uppercase tracking-[0.5em] text-white/60"
        >
          Blog Phoenix
        </motion.p>
        <motion.h1
          variants={fadeUp(0.15)}
          className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl"
        >
          <GradientText>Tất cả bài viết</GradientText>
        </motion.h1>
        <motion.p
          variants={fadeUp(0.2)}
          className="mt-6 max-w-3xl text-lg text-white/70 md:text-xl"
        >
          Liên tục cập nhật câu chuyện, chiến thuật và cảm hứng mới nhất của
          Phoenix House. Theo dõi blog để không bỏ lỡ nguồn năng lượng kiêu hãnh
          này.
        </motion.p>

        <motion.div
          variants={fadeUp(0.25)}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {blogPosts.map((post, index) => (
            <MotionCard
              key={post.title}
              variants={fadeUp(0.3 + index * 0.05)}
              className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-b from-[#1a0a05] via-[#080808] to-[#0a0a0a] p-6 text-white transition hover:border-white/20"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.4em] text-[#ffd86b]">
                  {post.tag}
                </span>
                <h3 className="mt-4 text-2xl font-semibold">{post.title}</h3>
                <p className="mt-3 text-sm text-white/70">{post.excerpt}</p>
              </div>
              <Link
                href={post.href}
                className="mt-6 inline-block text-sm font-semibold text-[#ff6b00] transition hover:text-[#ffd86b]"
              >
                Đọc tiếp →
              </Link>
            </MotionCard>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp(0.4)}
          className="mt-12 border-t border-white/10 pt-8"
        >
          <Link
            href="/"
            className="inline-block rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/20"
          >
            ← Về trang chủ
          </Link>
        </motion.div>
      </motion.section>
    </main>
  );
}
