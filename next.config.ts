import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/images/:path*",
        destination: "http://143.198.84.82:3001/images/:path*",
      },
    ];
  },
  images: {
    unoptimized: true,
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
      {
        protocol: "http",
        hostname: "143.198.84.82",
        port: "3001",
        pathname: "/images/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "swiper", "react-icons"],
  },
};

export default nextConfig;
