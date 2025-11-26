import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  images: {
    /** 
     * Tắt Next Image Optimizer để tránh lỗi 500 ở route /_next/image
     * (dùng trực tiếp link Cloudinary, phù hợp cho landing hiện tại)
     */
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
