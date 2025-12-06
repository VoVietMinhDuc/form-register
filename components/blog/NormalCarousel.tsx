"use client";

import Image from "next/image";

interface NormalCarouselProps {
  images: string[];
}

const NormalCarousel = ({ images }: NormalCarouselProps) => {
  return (
    <div className="w-full my-12 px-4 md:px-6">
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6">
        {images.map((image, index) => (
          <div key={index} className="break-inside-avoid mb-4 md:mb-6">
            <div className="relative w-full rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl bg-white">
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                quality={100}
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NormalCarousel;
