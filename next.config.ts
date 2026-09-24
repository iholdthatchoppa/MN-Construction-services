import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    // 90 is used for the full-screen hero background so it stays crisp.
    qualities: [75, 90],
  },
};

export default nextConfig;
