import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/de",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
