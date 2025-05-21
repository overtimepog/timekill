import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // For better deployment performance with Prisma
  serverExternalPackages: ['@prisma/client', 'prisma']
};

export default nextConfig;
