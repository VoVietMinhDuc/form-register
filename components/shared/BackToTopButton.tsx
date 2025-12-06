"use client";

import { useEffect, useState } from "react";
import { MotionButton } from "@/components/motion-primitives";
import { IoArrowUp } from "react-icons/io5";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MotionButton
      onClick={scrollToTop}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-gradient-to-r from-[#ff0000] via-[#ff6b00] to-[#ffd86b] text-black shadow-[0_15px_45px_rgba(0,0,0,0.45)]"
      aria-label="Back to top"
    >
      <IoArrowUp className="text-lg" />
    </MotionButton>
  );
}

