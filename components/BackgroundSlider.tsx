"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface BackgroundSliderProps {
  images: string[];
  interval?: number;
}

const BackgroundSlider = ({
  images,
  interval = 5000,
}: BackgroundSliderProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0 z-0">
      {images.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt="Events showcase"
          fill
          className={`object-cover object-center transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-orange-500/50" />
    </div>
  );
};

export default BackgroundSlider;
