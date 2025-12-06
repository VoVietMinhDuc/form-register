"use client";

import BackgroundSlider from "./client/BackgroundSlider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const images = ["/phoenix.jpg", "/phoenix1.jpg", "/phoenix2.jpg"];

const HomeSection = () => {
  return (
    <section className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <BackgroundSlider images={images} interval={5000} />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 text-center text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Warmly Welcome to Phoenix House
          </span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-12 leading-tight max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Khám phá hành trình của chúng tôi qua những sự kiện ý nghĩa và kết nối
          cộng đồng
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/registration">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-6 text-lg shadow-2xl transition-all"
            >
              Đăng Ký Ngay
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
