import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "standalone",
  images: {
    qualities: [100, 70, 75, 85],
    domains: ["res.cloudinary.com"], // Thêm dòng này
  },
};

export default nextConfig;
