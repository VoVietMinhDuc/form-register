"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/magicui";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#member", label: "Member" },
  { href: "#blog", label: "Blog" },
  { href: "#rise-space", label: "Rise Space" },
];

export function PhoenixNavbar() {
  const [atTop, setAtTop] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial="hidden"
      animate="show"
      variants={fadeUp(0)}
      className={cn(
        "fixed left-1/2 top-3 z-40 w-[min(92vw,1200px)] -translate-x-1/2 px-6 py-3 transition-all duration-300",
        "rounded-full backdrop-blur-xl",
        atTop
          ? "border border-transparent bg-transparent"
          : "border border-[#ff5b1f]/40 bg-gradient-to-r from-[#120302]/90 via-[#050505]/95 to-[#120302]/90 shadow-[0_20px_60px_rgba(255,68,0,0.35)] ring-1 ring-[#ff6b00]/30"
      )}
    >
      <nav className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.4em] text-white">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm tracking-[0.6em]"
        >
          <GradientText className="text-base font-black">Phoenix</GradientText>
        </Link>
        {/* Chỉ hiện navLinks nếu ở trang "/" */}
        {pathname === "/" && (
          <div className="hidden flex-1 items-center justify-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[11px] font-semibold uppercase tracking-[0.5em] text-white/70 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
        <Button
          size="sm"
          asChild
          className="fire-border rounded-full bg-linear-to-r from-[#ff2222] via-[#ff6b00] to-[#ffd050] text-black shadow-[0_0_20px_rgba(255,91,15,0.6)] text-[9px] px-2 py-1 md:text-xs md:px-4 md:py-2 whitespace-nowrap tracking-[0.05em] md:tracking-tight"
        >
          <Link href="/registration">Đăng kí Rise Space</Link>
        </Button>
      </nav>
    </motion.header>
  );
}
