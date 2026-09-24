import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Built as static files and served from Firebase Hosting (Spark plan, no server).
  output: 'export',
  images: {
    // No image server in a static export; photos are served as-is.
    unoptimized: true,
  },
};

export default nextConfig;
