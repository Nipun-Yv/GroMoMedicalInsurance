import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    typescript: {
    ignoreBuildErrors: true,  // 👈 disables type errors during `next build`
  },
};

export default nextConfig;
