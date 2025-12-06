"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

type LenisProviderProps = {
  children: ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    document.documentElement.classList.add("lenis");

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)),
    });

    let animationFrame: number;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    // Xử lý anchor links để căn giữa section
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (anchor && anchor.hash) {
        e.preventDefault();
        const targetId = anchor.hash.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Sử dụng requestAnimationFrame để đảm bảo DOM đã cập nhật
          requestAnimationFrame(() => {
            const viewportHeight = window.innerHeight;
            // Sử dụng getBoundingClientRect để lấy vị trí chính xác của element
            const rect = targetElement.getBoundingClientRect();
            // Lấy scroll position hiện tại từ Lenis
            const currentScroll = lenis.scroll;
            // Tính vị trí tuyệt đối của element trong document
            const elementTop = rect.top + currentScroll;

            // Lấy offset tùy chỉnh từ data attribute nếu có, mặc định là 0
            const customOffset = targetElement.dataset.scrollOffset
              ? parseInt(targetElement.dataset.scrollOffset, 10)
              : 0;

            // Tính toán để căn giữa section trong viewport
            // Mục tiêu: phần giữa của section nằm ở giữa viewport
            const sectionHeight = targetElement.offsetHeight;
            // Tính offset để phần giữa của section nằm ở giữa viewport
            // Nếu section cao hơn viewport, ta scroll đến đầu section
            // Nếu section thấp hơn viewport, ta căn giữa nó
            const centerOffset =
              sectionHeight > viewportHeight
                ? 0 // Section lớn hơn viewport, scroll đến đầu
                : viewportHeight / 2 - sectionHeight / 2; // Căn giữa section

            // Áp dụng offset tùy chỉnh nếu có (có thể dùng để điều chỉnh cho từng section)
            const finalOffset = centerOffset - customOffset;

            lenis.scrollTo(elementTop - finalOffset, {
              duration: 1.2,
              easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)),
            });
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
}
