import type { NextConfig } from "next";

const nextConfig: NextConfig & Record<string, any> = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;