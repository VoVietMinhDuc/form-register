"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface CardStackProps {
  images: string[];
}

const CardStack = ({ images }: CardStackProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPos = 0;
    const scroll = () => {
      scrollPos += 1;
      if (scrollPos >= scrollContainer.scrollWidth / 2) {
        scrollPos = 0;
      }
      scrollContainer.scrollLeft = scrollPos;
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Duplicate images for infinite scroll effect
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div className="relative w-full my-12 overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-hidden scrollbar-hide"
        style={{ scrollBehavior: "auto" }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            className="relative shrink-0 w-[90vw] max-w-[650px] sm:w-[400px] md:w-[500px] lg:w-[650px] h-[180px] sm:h-[280px] md:h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-xl bg-white"
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 90vw, (max-width: 768px) 400px, (max-width: 1024px) 500px, 650px"
              quality={100}
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default CardStack;
