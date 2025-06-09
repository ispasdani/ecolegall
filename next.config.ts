import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
    ],
  },
  serverExternalPackages: ["pdf-parse"],
  // experimental: {
  //   serverActions: {
  //     bodySizeLimit: "10mb",
  //   },
  // },
};

export default nextConfig;
