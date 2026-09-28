import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 200, 256, 320, 384],
    minimumCacheTTL: 2678400,
  },
  experimental: {
    optimizePackageImports: ["@/components"],
  },
};

export default nextConfig;
