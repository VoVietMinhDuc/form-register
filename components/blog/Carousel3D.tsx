"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Carousel3DProps {
  images: string[];
}

const Carousel3D = ({ images }: Carousel3DProps) => {
  return (
    <div className="relative w-full my-12">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Navigation, Pagination]}
        className="swiper-3d"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="w-[90vw] max-w-[600px] sm:w-[500px] md:w-[600px]"
          >
            <div className="relative w-full h-[220px] sm:h-[320px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl bg-white">
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 500px, 600px"
                quality={100}
                unoptimized
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel3D;
