"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PhoenixNavbar } from "@/components/navigation/PhoenixNavbar";
import { GradientText, BackgroundGrid } from "@/components/magicui";
import { fadeUp, stagger } from "@/lib/motion";
import CardStack from "@/components/blog/CardStack";
import Carousel3D from "@/components/blog/Carousel3D";
import NormalCarousel from "@/components/blog/NormalCarousel";
import type { Blog } from "@/lib/blogs";

type Props = {
  blog: Blog;
};

export default function BlogClient({ blog }: Props) {
  if (!blog) {
    return (
      <main className="flex items-center justify-center min-h-screen text-white">
        Không tìm thấy bài viết.
      </main>
    );
  }

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
          {blog.tag || "Culture"}
        </motion.span>

        <motion.h1
          variants={fadeUp(0.15)}
          className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl"
        >
          <GradientText>{blog.title}</GradientText>
        </motion.h1>

        {blog.excerpt && (
          <motion.p
            variants={fadeUp(0.2)}
            className="mt-6 text-lg text-white/70 md:text-xl"
          >
            {blog.excerpt}
          </motion.p>
        )}

        <motion.div
          variants={fadeUp(0.25)}
          className="prose prose-invert mt-12 max-w-none text-white/80"
        >
          <div className="space-y-6 text-base leading-relaxed">
            {blog.content1 && <p>{blog.content1}</p>}

            {/* CardStack Carousel */}
            {blog.carousel1 && blog.carousel1.length > 0 && (
              <div className="my-8">
                <CardStack images={blog.carousel1} />
              </div>
            )}

            {blog.content2 && (
              <>
                <h2 className="mt-8 text-2xl font-bold text-white">
                  Chuyên đề
                </h2>
                <p>{blog.content2}</p>
              </>
            )}

            {/* 3D Carousel */}
            {blog.carousel2 && blog.carousel2.length > 0 && (
              <div className="my-8">
                <Carousel3D images={blog.carousel2} />
              </div>
            )}

            {blog.content3 && (
              <>
                <h2 className="mt-8 text-2xl font-bold text-white">Tầm nhìn</h2>
                <p>{blog.content3}</p>
              </>
            )}

            {/* Normal Carousel */}
            {blog.carousel3 && blog.carousel3.length > 0 && (
              <div className="my-8">
                <NormalCarousel images={blog.carousel3} />
              </div>
            )}

            {/* Nếu có thêm nội dung khác */}
            {blog.content && <p>{blog.content}</p>}
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
