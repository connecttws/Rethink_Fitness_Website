import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/trainers',
        destination: '/coaching',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/memberships',
        permanent: true,
      },
      {
        source: '/nutrition',
        destination: '/memberships',
        permanent: true,
      },
      {
        source: '/schedule',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
