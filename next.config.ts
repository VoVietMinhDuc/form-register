import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  images: {
<<<<<<< HEAD
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "swiper", "react-icons"],
=======
    qualities: [100, 70, 75],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*", // mọi request /api/*
        destination: "/app/api/:path*", // map tới app/api/
      },
    ];
>>>>>>> 42bcc281e0bd2347cd4a968b025020fbb50fc214
  },
};

export default nextConfig;
