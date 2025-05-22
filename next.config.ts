import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // For better deployment performance with Prisma
  serverExternalPackages: ['@prisma/client', 'prisma'],
  images: {
    domains: ['img.clerk.com', 'images.clerk.dev'],
  }
};

export default nextConfig;
