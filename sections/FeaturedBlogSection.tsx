"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GradientText, BackgroundGrid } from "@/components/magicui";
import { MotionCard, MotionButton } from "@/components/motion-primitives";
import { fadeUp, stagger } from "@/lib/motion";

const featuredPosts = [
  {
    title: "Digisurvive: Trải nghiệm sinh tồn trong thời đại mới",
    excerpt:
      "Hành trình thực tế, gay cấn và bổ ích, nơi Tân sinh viên K21 rèn luyện kỹ năng sinh tồn trong kỷ nguyên mới tại kỳ Rèn Luyện Tập Trung",
    tag: "Events",
    href: "/blog/digisurvive",
  },
  {
    title: "Phoenix Cup",
    excerpt:
      "Sân chơi trí tuệ, nơi ngọn lửa đam mê bùng cháy, kết nối cộng đồng qua từng trận đấu hấp dẫn",
    tag: "Events",
    href: "/blog/phoenix-cup",
  },
  {
    title: "Phoenix House Kick-off 2025",
    excerpt:
      "Nơi ngọn lửa Yanar Dag bất diệt truyền cảm hứng tái sinh và khát vọng chinh phục.",
    tag: "Culture",
    href: "/blog/phoenix-house-2025-kick-off",
  },
];

export function FeaturedBlogSection() {
  return (
    <section
      id="blog"
      data-scroll-offset="80"
      className="phoenix-section relative mt-12 overflow-hidden rounded-[32px] border border-white/10 bg-[#0a0503] px-6 py-20 md:px-16"
    >
      <BackgroundGrid className="opacity-50" />
      <motion.div
        variants={stagger(0.15, 0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
      >
        <motion.p
          variants={fadeUp(0)}
          className="text-sm uppercase tracking-[0.5em] text-white/60"
        >
          Phoenix Blog
        </motion.p>
        <motion.h2
          variants={fadeUp(0.1)}
          className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl"
        >
          <GradientText>Bài viết nổi bật</GradientText>
        </motion.h2>
        <motion.p
          variants={fadeUp(0.15)}
          className="mt-4 max-w-3xl text-base text-white/70"
        >
          Liên tục cập nhật câu chuyện, chiến thuật và cảm hứng mới nhất của
          Phoenix House. Theo dõi blog để không bỏ lỡ nguồn năng lượng kiêu hãnh
          này.
        </motion.p>
        <motion.div
          variants={fadeUp(0.2)}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {featuredPosts.map((post) => (
            <MotionCard
              key={post.title}
              variants={fadeUp(0.25)}
              className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-b from-[#1a0a05] via-[#080808] to-[#0a0a0a] p-6 text-white"
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
                className="mt-6 text-sm font-semibold text-[#ff6b00] transition hover:text-[#ffd86b]"
              >
                Đọc tiếp →
              </Link>
            </MotionCard>
          ))}
        </motion.div>
        <motion.div
          variants={fadeUp(0.3)}
          className="mt-10 flex flex-wrap items-center justify-between gap-4"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-white/60">
            Xem hành trình Phoenix đầy đủ tại blog
          </p>
          <MotionButton
            asChild
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white"
          >
            <Link href="/blog">Tới blog Phoenix</Link>
          </MotionButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
