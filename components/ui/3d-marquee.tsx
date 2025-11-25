"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ThreeDMarqueeProps {
  images: string[];
  className?: string;
}

export function ThreeDMarquee({ images, className }: ThreeDMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Chia images thành 4 cột
  const columns = 4;
  const columnImages: string[][] = [];

  for (let i = 0; i < columns; i++) {
    columnImages.push([]);
  }

  images.forEach((img, index) => {
    columnImages[index % columns].push(img);
  });

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-full w-full gap-4",
        className
      )}
      style={{
        perspective: "1000px",
        overflow: "hidden",
      }}
    >
      {columnImages.map((column, colIndex) => (
        <MarqueeColumn
          key={colIndex}
          images={column}
          direction={colIndex % 2 === 0 ? "up" : "down"}
          speed={30 + colIndex * 5} // ⚡ TỐC ĐỘ: Số càng lớn = chạy càng chậm (đơn vị: giây)
          columnIndex={colIndex}
        />
      ))}
    </div>
  );
}

interface MarqueeColumnProps {
  images: string[];
  direction: "up" | "down";
  speed: number;
  columnIndex: number;
}

function MarqueeColumn({ images, direction, speed, columnIndex }: MarqueeColumnProps) {
  const columnRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Chỉ render rotation ở client-side để tránh hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!columnRef.current || images.length === 0) return;

    const column = columnRef.current;

    // Đợi một chút để đảm bảo DOM và ảnh đã load
    const timeoutId = setTimeout(() => {
      const firstItem = column.firstElementChild as HTMLElement;
      if (!firstItem) return;

      // Đợi ảnh load xong - kiểm tra tất cả ảnh trong cột đầu tiên
      const images = firstItem.querySelectorAll('img');
      let loadedCount = 0;
      const totalImages = images.length;

      if (totalImages === 0) {
        startAnimation();
        return;
      }

      const checkAllLoaded = () => {
        loadedCount++;
        if (loadedCount >= totalImages || Array.from(images).every(img => img.complete)) {
          startAnimation();
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          checkAllLoaded();
        } else {
          img.onload = checkAllLoaded;
          img.onerror = checkAllLoaded; // Vẫn chạy animation nếu có lỗi
        }
      });

      // Fallback: chạy animation sau 1 giây nếu ảnh chưa load
      setTimeout(() => {
        if (!animationRef.current) {
          startAnimation();
        }
      }, 1000);
    }, 300);

    const startAnimation = () => {
      if (!columnRef.current || animationRef.current) return;

      const column = columnRef.current;
      const firstItem = column.firstElementChild as HTMLElement;
      if (!firstItem) return;

      // Tính toán chiều cao cần thiết để tạo seamless loop
      const itemHeight = firstItem.offsetHeight || 300; // fallback 300px
      const gap = 16; // gap-4 = 16px
      const totalHeight = (itemHeight + gap) * images.length;

      // Set chiều cao cho column để có đủ không gian
      column.style.height = `${totalHeight * 2}px`;

      const startTransform = direction === "up" ? "translateY(0)" : `translateY(-${totalHeight}px)`;
      const endTransform = direction === "up" ? `translateY(-${totalHeight}px)` : "translateY(0)";

      const animation = column.animate(
        [
          { transform: startTransform },
          { transform: endTransform },
        ],
        {
          duration: speed * 1000,
          iterations: Infinity,
          easing: "linear",
        }
      );

      animationRef.current = animation;
    };

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        animationRef.current.cancel();
        animationRef.current = null;
      }
    };
  }, [direction, speed, images.length, columnIndex]);

  // Duplicate images để tạo hiệu ứng seamless
  const duplicatedImages = [...images, ...images];

  // Tạo rotation cố định dựa trên columnIndex - làm tròn để tránh hydration mismatch
  const getRotation = (index: number) => {
    const seed = (columnIndex * 100 + index) * 0.1;
    // Làm tròn đến 2 chữ số thập phân để đảm bảo consistency
    return {
      x: Math.round((Math.sin(seed) * 8 - 4) * 100) / 100, // -4 đến +4 độ
      y: Math.round((Math.cos(seed) * 8 - 4) * 100) / 100,
    };
  };

  // Không render rotation cho đến khi client-side ready
  if (!isClient) {
    return (
      <div
        ref={columnRef}
        className="flex flex-col gap-4 w-full relative"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {duplicatedImages.map((img, index) => (
          <div
            key={`${columnIndex}-${index}`}
            className="relative flex-shrink-0 aspect-[3/4] w-full overflow-hidden rounded-lg border border-white/10 bg-black/20 shadow-lg transition-transform duration-300 hover:scale-105 hover:border-[#ff6b00]/50"
            style={{
              minHeight: "200px",
              height: "auto",
            }}
          >
            <Image
              src={img}
              alt={`Phoenix Member ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 25vw, (max-width: 1024px) 20vw, 15vw"
              quality={85}
              unoptimized
              priority={index < 8}
              onError={(e) => {
                console.error("Image load error:", img);
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={columnRef}
      className="flex flex-col gap-4 w-full relative"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {duplicatedImages.map((img, index) => {
        const rotation = getRotation(index);
        return (
          <div
            key={`${columnIndex}-${index}`}
            className="relative flex-shrink-0 aspect-[3/4] w-full overflow-hidden rounded-lg border border-white/10 bg-black/20 shadow-lg transition-transform duration-300 hover:scale-105 hover:border-[#ff6b00]/50"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: "preserve-3d",
              minHeight: "200px",
              height: "auto",
            }}
          >
            <Image
              src={img}
              alt={`Phoenix Member ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 25vw, (max-width: 1024px) 20vw, 15vw"
              quality={85}
              unoptimized
              priority={index < 8}
              onError={(e) => {
                console.error("Image load error:", img);
              }}
              onLoad={() => {
                // Đảm bảo ảnh đã load
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10" />
          </div>
        );
      })}
    </div>
  );
}


