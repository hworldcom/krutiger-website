import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
        pathname: "/images/nsznfiun/**",
        port: "",
        protocol: "https",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "krutiger-website.vercel.app",
          },
        ],
        destination: "https://www.krutigermuaythai.de/:path*",
        permanent: true,
      },
      {
        source: "/",
        destination: "/de",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
