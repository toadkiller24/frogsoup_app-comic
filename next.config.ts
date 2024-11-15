import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // ... any existing remote patterns
    ],
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
