import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "standalone",
  images: {
    qualities: [100, 70, 75],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*", // mọi request /api/*
        destination: "/app/api/:path*", // map tới app/api/
      },
    ];
  },
};

export default nextConfig;
