"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PhoenixNavbar } from "@/components/navigation/PhoenixNavbar";
import { GradientText, BackgroundGrid } from "@/components/magicui";
import { fadeUp, stagger } from "@/lib/motion";

export default function LenisMagicuiGradient() {
  return (
    <main className="relative mx-auto max-w-[1200px] px-4 pb-16 pt-4 md:px-6">
      <PhoenixNavbar />
      <BackgroundGrid className="opacity-30" />
      <motion.article
        variants={stagger(0.15, 0.08)}
        initial="hidden"
        animate="show"
        className="relative mt-24 rounded-[32px] border border-white/10 bg-[#0a0503] px-6 py-12 md:px-16 md:py-20"
      >
        <motion.div variants={fadeUp(0)} className="mb-8">
          <Link
            href="/blog"
            className="text-sm font-semibold uppercase tracking-[0.4em] text-[#ff6b00] transition hover:text-[#ffd86b]"
          >
            ← Quay lại Blog
          </Link>
        </motion.div>

        <motion.span
          variants={fadeUp(0.1)}
          className="text-xs uppercase tracking-[0.4em] text-[#ffd86b]"
        >
          Experience
        </motion.span>

        <motion.h1
          variants={fadeUp(0.15)}
          className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl"
        >
          <GradientText>Lenis x Magicui: Công thức trải nghiệm đa tầng</GradientText>
        </motion.h1>

        <motion.p
          variants={fadeUp(0.2)}
          className="mt-6 text-lg text-white/70 md:text-xl"
        >
          Cách chúng tôi kết hợp smooth scroll và spotlight grid tạo chiều sâu.
        </motion.p>

        <motion.div
          variants={fadeUp(0.25)}
          className="prose prose-invert mt-12 max-w-none text-white/80"
        >
          <div className="space-y-6 text-base leading-relaxed">
            <p>
              Trong thế giới web hiện đại, trải nghiệm người dùng không chỉ dừng lại ở giao diện đẹp mắt.
              Chúng tôi đã kết hợp Lenis smooth scroll với Magicui components để tạo ra một trải nghiệm
              đa tầng, sâu sắc và mượt mà.
            </p>

            <h2 className="mt-8 text-2xl font-bold text-white">Lenis Smooth Scroll</h2>
            <p>
              Lenis mang đến trải nghiệm cuộn mượt mà, tự nhiên như ứng dụng native. Nó không chỉ làm cho
              việc điều hướng trở nên dễ chịu hơn, mà còn tạo ra một cảm giác liền mạch giữa các phần của
              trang web.
            </p>

            <h2 className="mt-8 text-2xl font-bold text-white">Magicui Components</h2>
            <p>
              Magicui cung cấp các component được tối ưu hóa với hiệu ứng và animation tinh tế. Spotlight
              grid, gradient text, và các hiệu ứng khác tạo ra chiều sâu thị giác, làm cho nội dung trở nên
              sống động và hấp dẫn hơn.
            </p>

            <h2 className="mt-8 text-2xl font-bold text-white">Sự Kết hợp Hoàn hảo</h2>
            <p>
              Khi Lenis và Magicui kết hợp với nhau, chúng tạo ra một trải nghiệm không chỉ đẹp mắt mà còn
              có chiều sâu. Mỗi cuộn trang là một hành trình, mỗi animation là một câu chuyện. Đây là cách
              chúng tôi xây dựng trải nghiệm cho Phoenix House.
            </p>

            <h2 className="mt-8 text-2xl font-bold text-white">Kết luận</h2>
            <p>
              Công thức này không chỉ là về công nghệ, mà còn về cách chúng ta tạo ra những trải nghiệm
              đáng nhớ. Lenis và Magicui cùng nhau tạo nên một nền tảng vững chắc cho Phoenix House.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp(0.3)}
          className="mt-12 flex items-center gap-4 border-t border-white/10 pt-8"
        >
          <Link
            href="/blog"
            className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/20"
          >
            Xem thêm bài viết
          </Link>
        </motion.div>
      </motion.article>
    </main>
  );
}

