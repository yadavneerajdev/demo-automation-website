/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com"],
  },
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
