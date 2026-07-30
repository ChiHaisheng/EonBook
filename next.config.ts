import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/EonBook",
  assetPrefix: "/EonBook/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
